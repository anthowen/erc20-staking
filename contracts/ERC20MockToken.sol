// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20MockToken is ERC20Capped, Ownable {

    constructor(string memory name, string memory symbol, uint totalCap) ERC20(name, symbol) ERC20Capped(totalCap) {
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
