# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

### ERC20MockToken

```deploy
hh run scripts/deploy-ERC20MockToken.js --network ropsten
```

```deploy log
AST deployed to: 0xB4765BfE124EAca86b79439Fe16F545492D0536B
ART deployed to: 0x1dB918c33f1DdD6Ab031687f7c1202C96d82d985
```

See on etherscan:

[AST](https://ropsten.etherscan.io/token/0xB4765BfE124EAca86b79439Fe16F545492D0536B)
[ART](https://ropsten.etherscan.io/token/0x1dB918c33f1DdD6Ab031687f7c1202C96d82d985)

#### verify

```shell
hh verify --network ropsten --constructor-args scripts/arguments-AST.js 0xB4765BfE124EAca86b79439Fe16F545492D0536B
hh verify --network ropsten --constructor-args scripts/arguments-ART.js 0x1dB918c33f1DdD6Ab031687f7c1202C96d82d985
```

```verfiy log
Nothing to compile
Compiling 1 file with 0.8.4
Successfully submitted source code for contract
contracts/ERC20MockToken.sol:ERC20MockToken at 0x5f2F884efB1F23B17E3a5DE68BEdF095C4018cc9
for verification on Etherscan. Waiting for verification result...

Successfully verified contract ERC20MockToken on Etherscan.
https://ropsten.etherscan.io/address/0x5f2F884efB1F23B17E3a5DE68BEdF095C4018cc9#code
```

### StakingRewards

```deploy
hh run scripts/deploy-StakingRewards.js --network ropsten
```

```log
StakingRewards deployed to: 0xb40a55CD0080C538554Cb3E39a4B0cB644C80759
```
#### verify

```shell
hh verify --network ropsten --constructor-args scripts/arguments-StakingRewards.js 0xb40a55CD0080C538554Cb3E39a4B0cB644C80759
```

```log
Compiling 1 file with 0.8.4
Successfully submitted source code for contract
contracts/StakingRewards.sol:StakingRewards at 0xb40a55CD0080C538554Cb3E39a4B0cB644C80759
for verification on Etherscan. Waiting for verification result...

Successfully verified contract StakingRewards on Etherscan.
https://ropsten.etherscan.io/address/0xb40a55CD0080C538554Cb3E39a4B0cB644C80759#code
```
