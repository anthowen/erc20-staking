// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StakingRewards {
    IERC20 public rewardsToken;
    IERC20 public stakingToken;

    uint public rewardRate = 100;
    uint public lastUpdateTime;
    uint public rewardPerTokenStored;

    mapping(address => uint) public userRewardPerTokenPaid;
    mapping(address => uint) public rewards;

    uint private _totalSupply;
    mapping(address => uint) private _balances;

    event RewardUpdated(address account, uint rewards, uint rewardPerTokenStored, uint lastUpdateTime);
    event Stake(address account, uint amount, uint amountSoFar);
    event Withdraw(address account, uint amount, uint amountRemaining);
    event ClaimReward(address account, uint amount);

    constructor(address _stakingToken, address _rewardsToken) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    function rewardPerToken() public view returns (uint) {
        if (_totalSupply == 0) {
            return 0;
        }
        return
            rewardPerTokenStored +
            (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / _totalSupply);
    }

    function earned(address account) public view returns (uint) {
        return
            ((_balances[account] *
                (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) +
            rewards[account];
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;

        emit RewardUpdated(account, rewards[account], rewardPerTokenStored, lastUpdateTime);
        _;
    }

    function stake(uint _amount) external updateReward(msg.sender) {
        _totalSupply += _amount;
        _balances[msg.sender] += _amount;
        stakingToken.transferFrom(msg.sender, address(this), _amount);

        emit Stake(msg.sender, _amount, _balances[msg.sender]);
    }

    function withdraw(uint _amount) external updateReward(msg.sender) {
        bool sent = stakingToken.transfer(msg.sender, _amount);

        require(sent, "Stakingtoken transfer failed");
        _totalSupply -= _amount;
        _balances[msg.sender] -= _amount;

        emit Withdraw(msg.sender, _amount, _balances[msg.sender]);
    }

    function claimReward() external updateReward(msg.sender) {
        uint reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        rewardsToken.transfer(msg.sender, reward);

        emit ClaimReward(msg.sender, reward);
    }
}
