const chai = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);

const { ethers, config } = require("hardhat");
const { time } = require("@openzeppelin/test-helpers");
const { parseEther, formatEther } = ethers.utils;

const artArguments = require("../scripts/arguments-ART");
const astArguments = require("../scripts/arguments-AST");
const { expect } = require("chai");

describe("StakingRewards", function () {
  let deployer, alice, bob;
  const totalARTAmount = artArguments[2];
  const totalASTAmount = astArguments[2];
  let stakeToken;
  let rewardsToken;
  let stakingRewards;

  before(async function () {
    [deployer, alice, bob] = await hre.ethers.getSigners();
    
    const ERC20MockToken = await hre.ethers.getContractFactory("ERC20MockToken");
    stakeToken = await ERC20MockToken.deploy(...astArguments);
    await stakeToken.deployed();

    rewardsToken = await ERC20MockToken.deploy(...artArguments);
    await rewardsToken.deployed();

    const StakingRewards = await hre.ethers.getContractFactory("StakingRewards");
    stakingRewards = await StakingRewards.deploy(stakeToken.address, rewardsToken.address);
    await stakingRewards.deployed();

    await stakeToken.mint(alice.address, totalASTAmount.div(5));
    await rewardsToken.mint(stakingRewards.address, totalARTAmount.div(5));

    await expect(await stakeToken.balanceOf(alice.address)).to.eq(totalASTAmount.div(5));
    await expect(await rewardsToken.balanceOf(stakingRewards.address)).to.eq(totalARTAmount.div(5));

    console.log('before check done');
  });

  it("Should stake the amount correctly", async function() {
    const stakeAmount = totalASTAmount.div(8);

    await stakeToken.connect(alice).approve(stakingRewards.address, stakeAmount);
    expect(
      await stakingRewards.connect(alice).stake(stakeAmount)
    )
      .to.emit(stakingRewards, "Stake")
      .withArgs(alice.address, stakeAmount, stakeAmount);

    const remainingBalance = await stakeToken.balanceOf(alice.address);

    console.log({ remainingBalance });
    expect(remainingBalance).to.eq(totalASTAmount.div(5).sub(stakeAmount));

    // await time.increase(time.duration.minutes('1'));
    // await time.advanceBlock();
    await time.increase(86400);

    console.log('Rewards amount', await stakingRewards.connect(alice).earned(alice.address));
  });
});
