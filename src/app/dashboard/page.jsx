'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Placeholder ABI
const CONTRACT_ABI = [];

const VoteDashboard = () => {
    const [contractAddress, setContractAddress] = useState('');
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const storedAddress = localStorage.getItem('votingContractAddress');
        if (storedAddress) {
            setContractAddress(storedAddress);
            fetchAllData(storedAddress);
        }
    }, []);

    const fetchAllData = async (address) => {
        if (!window.ethereum || !address) return;
        setLoading(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(address, CONTRACT_ABI, provider);

            // Fetch Candidates to map index to name
            const candidatesData = await contract.getCandidates();
            const candidateNames = candidatesData.map(c => c.name);
            setCandidates(candidateNames);

            // Fetch Votes
            const votesData = await contract.getAllVotes();

            // Format Votes
            const formattedVotes = votesData.map((vote) => ({
                voter: vote.voter,
                candidateName: candidateNames[Number(vote.candidateIndex)],
                timestamp: new Date(Number(vote.timestamp) * 1000).toLocaleString(),
                ipfsHash: vote.ipfsHash
            }));

            // Reverse to show newest first
            setVotes(formattedVotes.reverse());

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Live Vote Dashboard</h1>

            {!contractAddress ? (
                <div className="text-center text-gray-400">
                    <p>No contract address found. Please deploy a contract from the Admin Dashboard first.</p>
                </div>
            ) : (
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-400 text-sm">Contract: <span className="font-mono text-blue-400">{contractAddress}</span></p>
                        <button
                            onClick={() => fetchAllData(contractAddress)}
                            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm"
                        >
                            Refresh Data
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">Loading blockchain data...</div>
                    ) : (
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700">
                            <table className="w-full text-left">
                                <thead className="bg-gray-700 text-gray-300">
                                    <tr>
                                        <th className="p-4">Time</th>
                                        <th className="p-4">Candidate</th>
                                        <th className="p-4">Voter Address</th>
                                        <th className="p-4">IPFS Document</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {votes.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-gray-500">
                                                No votes cast yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        votes.map((vote, index) => (
                                            <tr key={index} className="hover:bg-gray-750 transition">
                                                <td className="p-4 text-sm text-gray-300 font-mono">{vote.timestamp}</td>
                                                <td className="p-4 font-bold text-blue-400">{vote.candidateName}</td>
                                                <td className="p-4 text-sm font-mono text-gray-400">
                                                    {vote.voter.substring(0, 6)}...{vote.voter.substring(38)}
                                                </td>
                                                <td className="p-4">
                                                    {vote.ipfsHash ? (
                                                        <a
                                                            href={`https://ipfs.io/ipfs/${vote.ipfsHash}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-green-400 hover:underline text-sm flex items-center gap-1"
                                                        >
                                                            View Doc ↗
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-600">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VoteDashboard;
