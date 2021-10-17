// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const astArguments = require("./arguments-AST");
const artArguments = require("./arguments-ART");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [deployer] = await hre.ethers.getSigners();

  const ERC20MockToken = await hre.ethers.getContractFactory("ERC20MockToken");
  const stakeToken = await ERC20MockToken.deploy(...astArguments);
  await stakeToken.deployed();

  console.log("AST deployed to:", stakeToken.address);

  const rewardsToken = await ERC20MockToken.deploy(...artArguments);
  await rewardsToken.deployed();

  console.log("ART deployed to:", rewardsToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
