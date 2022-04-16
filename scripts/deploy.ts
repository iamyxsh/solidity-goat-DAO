import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("Owner:", owner.address);

  const VotingToken = await ethers.getContractFactory("VotingToken", owner);
  const token = await VotingToken.deploy();
  await token.deployed();
  await token.delegate(owner.address);
  console.log("VotingToken deployed to:", token.address);

  const TimeLock = await ethers.getContractFactory("Timelock", owner);
  const timeLock = await TimeLock.deploy(3600000, [], []);
  await timeLock.deployed();
  console.log("Timelock deployed to:", timeLock.address);

  const Governor = await ethers.getContractFactory("GoatGovernor", owner);
  const governor = await Governor.deploy(token.address, timeLock.address);
  await governor.deployed();
  console.log("Governor deployed to:", governor.address);

  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();
  await timeLock.grantRole(proposerRole, governor.address);
  await timeLock.grantRole(executorRole, ethers.constants.AddressZero);
  await timeLock.revokeRole(adminRole, owner.address);

  const Goat = await ethers.getContractFactory("GOAT", owner);
  const goat = await Goat.deploy(1);
  await goat.deployed();
  await goat.transferOwnership(timeLock.address);
  console.log("Goat deployed to:", goat.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
