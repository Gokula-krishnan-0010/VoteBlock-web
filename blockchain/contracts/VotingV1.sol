// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract VotingV1 {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    address public owner;
    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;

    event CandidateAdded(uint256 indexed id, string name);
    event Voted(address indexed voter, uint256 indexed candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string memory _name) public onlyOwner {
        uint256 newId = candidates.length;
        candidates.push(Candidate(newId, _name, 0));
        emit CandidateAdded(newId, _name);
    }

    function vote(uint256 _candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(_candidateId < candidates.length, "Invalid candidate ID.");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId);
    }

    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}