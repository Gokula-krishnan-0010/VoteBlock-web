// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Vote {
        address voter;
        uint256 candidateIndex;
        uint256 timestamp;
        string ipfsHash;
    }

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;
    Vote[] public votes;
    uint256 public votingEnd;

    event VoteCasted(address indexed voter, uint256 candidateIndex, uint256 timestamp, string ipfsHash);

    constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    function vote(uint256 _candidateIndex, string memory _ipfsHash) public {
        require(block.timestamp < votingEnd, "Voting has ended.");
        require(!hasVoted[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        hasVoted[msg.sender] = true;
        candidates[_candidateIndex].voteCount++;

        votes.push(Vote({
            voter: msg.sender,
            candidateIndex: _candidateIndex,
            timestamp: block.timestamp,
            ipfsHash: _ipfsHash
        }));

        emit VoteCasted(msg.sender, _candidateIndex, block.timestamp, _ipfsHash);
    }

    function getAllVotes() public view returns (Vote[] memory) {
        return votes;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;
    }
}
