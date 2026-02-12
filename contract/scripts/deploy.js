import hre from "hardhat";

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  const walletClient = await hre.viem.getWalletClient();

  console.log("Chain:", publicClient.chain.name);

  const Voting = await hre.viem.deployContract("Voting", []);
  console.log("Voting deployed at:", Voting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
