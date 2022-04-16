//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

enum Goats {
    MESSI,
    RONALDO
}

contract GOAT is Ownable {
    Goats private goat;

    constructor(Goats _goat) {
        goat = _goat;
    }

    function whoIsGoat() public view returns(Goats) {
        return goat;
    }

    function setGoat(Goats _goat) external onlyOwner {
        goat = _goat;
    }
}
