import { expect } from "chai";
import { ethers } from "hardhat";
import { Voting } from "../typechain-types";

describe("Voting Contract", function () {
    let voting: Voting;
    let owner: any;
    let addr1: any;
    let addr2: any;

    const candidates = ["Alice", "Bob"];
    const duration = 60; // 60 minutes

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const VotingFactory = await ethers.getContractFactory("Voting");
        voting = await VotingFactory.deploy(candidates, duration);
    });

    it("Should initialize with correct candidates and duration", async function () {
        const candidate0 = await voting.candidates(0);
        const candidate1 = await voting.candidates(1);
        expect(candidate0.name).to.equal("Alice");
        expect(candidate1.name).to.equal("Bob");

        // Check duration (approximately)
        const remainingTime = await voting.getRemainingTime();
        expect(remainingTime).to.be.closeTo(duration * 60, 5);
    });

    it("Should allow a user to vote", async function () {
        await voting.connect(addr1).vote(0, "QmHash1");

        const candidate0 = await voting.candidates(0);
        expect(candidate0.voteCount).to.equal(1);

        const hasVoted = await voting.hasVoted(addr1.address);
        expect(hasVoted).to.be.true;
    });

    it("Should prevent double voting", async function () {
        await voting.connect(addr1).vote(0, "QmHash1");
        await expect(voting.connect(addr1).vote(1, "QmHash2")).to.be.revertedWith("You have already voted.");
    });

    it("Should prevent voting for invalid candidate", async function () {
        await expect(voting.connect(addr1).vote(99, "QmHash1")).to.be.revertedWith("Invalid candidate index.");
    });

    it("Should retrieve all votes", async function () {
        await voting.connect(addr1).vote(0, "QmHash1");
        await voting.connect(addr2).vote(1, "QmHash2");

        const allVotes = await voting.getAllVotes();
        expect(allVotes.length).to.equal(2);
        expect(allVotes[0].voter).to.equal(addr1.address);
        expect(allVotes[1].voter).to.equal(addr2.address);
        expect(allVotes[0].ipfsHash).to.equal("QmHash1");
        expect(allVotes[1].ipfsHash).to.equal("QmHash2");
    });
});
