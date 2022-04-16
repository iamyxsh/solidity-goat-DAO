/* eslint-disable no-unused-vars */
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GOAT", function () {
  enum Goats {
    MESSI,
    RONALDO,
  }

  let GOAT, goat: Contract;

  beforeEach(async () => {
    GOAT = await ethers.getContractFactory("GOAT");
    goat = await GOAT.deploy(Goats.RONALDO);
    await goat.deployed();
  });

  it("should deploy with correct data", async function () {
    expect(await goat.whoIsGoat()).to.equal(Goats.RONALDO);
  });

  it("should set goat", async function () {
    await goat.setGoat(Goats.MESSI);

    expect(await goat.whoIsGoat()).to.equal(Goats.MESSI);
  });
});
