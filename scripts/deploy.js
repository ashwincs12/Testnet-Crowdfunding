const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("Coffee");

  await contract.waitForDeployment();

  console.log(
    `Contract deployed to ${contract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//Contract deployed to 0x91c8323a517C12bB01F141D784252b7e1d166f9a