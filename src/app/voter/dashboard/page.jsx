'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Placeholder ABI
const CONTRACT_ABI = [];

const VotingSystem = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(null);
  const [voterProfile, setVoterProfile] = useState({
    hasVoted: false,
    transactionHash: null,
    ipfsHash: null,
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedAddress = localStorage.getItem('votingContractAddress');
    if (storedAddress) {
      setContractAddress(storedAddress);
      fetchCandidates(storedAddress);
    }
  }, []);

  const fetchCandidates = async (address) => {
    if (!window.ethereum || !address) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(address, CONTRACT_ABI, provider);
      const candidatesData = await contract.getCandidates();

      // Format candidates
      const formatted = candidatesData.map((c, i) => ({
        id: i,
        name: c.name,
        voteCount: c.voteCount.toString()
      }));
      setCandidates(formatted);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setStatus("Failed to load candidates. Check contract address.");
    }
  };

  const simulateIpfsUpload = async () => {
    // Mock IPFS upload
    return "Qm" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleVote = async () => {
    if (selectedCandidateIndex === null) return;

    setLoading(true);
    setStatus('Uploading document to IPFS...');

    try {
      const ipfsHash = await simulateIpfsUpload();

      setStatus('Please sign the transaction...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);

      const tx = await contract.vote(selectedCandidateIndex, ipfsHash);
      setStatus('Waiting for confirmation...');

      await tx.wait();

      setVoterProfile({
        hasVoted: true,
        transactionHash: tx.hash,
        ipfsHash: ipfsHash
      });
      setStatus('Vote Cast Successfully!');

    } catch (error) {
      console.error(error);
      setStatus(`Voting Failed: ${error.message || error.reason}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Voter Dashboard</h1>

      {!contractAddress && (
        <div className="max-w-md mx-auto mb-8 bg-gray-800 p-6 rounded">
          <label className="block mb-2">Contract Address</label>
          <input
            className="w-full bg-gray-700 p-2 rounded mb-2"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
          />
          <button
            className="w-full bg-blue-600 p-2 rounded"
            onClick={() => fetchCandidates(contractAddress)}
          >
            Load Election
          </button>
        </div>
      )}

      {contractAddress && (
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Candidates</h2>
            {candidates.length === 0 ? (
              <p>Loading candidates or none found...</p>
            ) : (
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`p-4 rounded border cursor-pointer transition ${selectedCandidateIndex === candidate.id
                        ? 'border-blue-500 bg-blue-900/20'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-500'
                      }`}
                    onClick={() => !voterProfile.hasVoted && setSelectedCandidateIndex(candidate.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">{candidate.name}</span>
                      {selectedCandidateIndex === candidate.id && <span className="text-blue-400">Selected</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!voterProfile.hasVoted && candidates.length > 0 && (
              <button
                onClick={handleVote}
                disabled={loading || selectedCandidateIndex === null}
                className={`mt-6 w-full py-3 rounded font-bold ${loading || selectedCandidateIndex === null
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-500'
                  }`}
              >
                {loading ? status : 'Cast Vote'}
              </button>
            )}

            {status && <div className="mt-4 text-center text-yellow-400">{status}</div>}
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Your Vote Status</h2>
            <div className="bg-gray-800 p-6 rounded h-full">
              {voterProfile.hasVoted ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-900/30 border border-green-500/50 rounded">
                    <h3 className="text-green-400 font-bold text-lg mb-2">Vote Confirmed!</h3>
                    <p className="text-sm text-gray-300">Your vote has been recorded on the blockchain.</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Mock IPFS Document</p>
                    <p className="font-mono text-xs break-all bg-gray-900 p-2 rounded">{voterProfile.ipfsHash}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Transaction Hash (Vote Block)</p>
                    <a
                      href={`https://amoy.polygonscan.com/tx/${voterProfile.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs break-all text-blue-400 hover:underline block bg-gray-900 p-2 rounded"
                    >
                      {voterProfile.transactionHash}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-20">
                  <p>You have not voted yet.</p>
                  <p className="text-sm mt-2">Select a candidate and cast your vote to see your block details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingSystem;