'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';

// Placeholder for ABI and Bytecode - to be replaced after compilation
const CONTRACT_ABI = [];
const CONTRACT_BYTECODE = "";

const AdminDashboard = () => {
    const [candidates, setCandidates] = useState(['Alice', 'Bob']);
    const [duration, setDuration] = useState(60); // minutes
    const [contractAddress, setContractAddress] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const addCandidate = () => setCandidates([...candidates, '']);
    const updateCandidate = (index, value) => {
        const newCandidates = [...candidates];
        newCandidates[index] = value;
        setCandidates(newCandidates);
    };
    const removeCandidate = (index) => {
        const newCandidates = candidates.filter((_, i) => i !== index);
        setCandidates(newCandidates);
    };

    const deployContract = async () => {
        if (!window.ethereum) {
            setStatus('Please install MetaMask!');
            return;
        }

        setStatus('Deploying...');
        setLoading(true);

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const factory = new ethers.ContractFactory(CONTRACT_ABI, CONTRACT_BYTECODE, signer);
            const contract = await factory.deploy(candidates, duration);

            setStatus('Waiting for confirmation...');
            await contract.waitForDeployment();

            const address = await contract.getAddress();
            setContractAddress(address);
            setStatus(`Contract Deployed at: ${address}`);

            // In a real app, we would save this address to a database or context
            localStorage.setItem('votingContractAddress', address);

        } catch (error) {
            console.error(error);
            setStatus(`Deployment Failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Deploy Voting Contract</h1>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl">
                <div className="mb-6">
                    <label className="block text-gray-400 mb-2">Candidates</label>
                    {candidates.map((candidate, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={candidate}
                                onChange={(e) => updateCandidate(index, e.target.value)}
                                className="bg-gray-700 text-white p-2 rounded flex-grow"
                                placeholder={`Candidate ${index + 1}`}
                            />
                            <button onClick={() => removeCandidate(index)} className="text-red-400 hover:text-red-300">
                                ✕
                            </button>
                        </div>
                    ))}
                    <button onClick={addCandidate} className="text-blue-400 hover:text-blue-300 text-sm">
                        + Add Candidate
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 mb-2">Voting Duration (Minutes)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="bg-gray-700 text-white p-2 rounded w-full"
                    />
                </div>

                <button
                    onClick={deployContract}
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'
                        }`}
                >
                    {loading ? 'Deploying...' : 'Deploy Contract'}
                </button>

                {status && (
                    <div className={`mt-4 p-3 rounded ${status.includes('Failed') ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                        {status}
                    </div>
                )}

                {contractAddress && (
                    <div className="mt-4 p-4 bg-gray-700 rounded break-all">
                        <p className="text-sm text-gray-400">Deployed Contract Address:</p>
                        <p className="font-mono text-lg text-green-400">{contractAddress}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
