"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { VOTING_ADDRESS, VOTING_ABI } from "../../../blockchain/config";

export default function VoteBlockTestPage() {
    const [account, setAccount] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [newCandidateName, setNewCandidateName] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    // 1. Connect Wallet
    // 1. Connect Wallet
    const connectWallet = async () => {
        if (!window.ethereum) return alert("Please install MetaMask");
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            // Request accounts
            const accounts = await provider.send("eth_requestAccounts", []);

            // Switch to Localhost Hardhat Network if not connected
            const network = await provider.getNetwork();
            if (network.chainId !== 31337n) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x7A69' }], // 31337 in hex
                    });
                } catch (switchError) {
                    // This error code indicates that the chain has not been added to MetaMask.
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x7A69',
                                    chainName: 'Hardhat Localhost',
                                    rpcUrls: ['http://127.0.0.1:8545'],
                                },
                            ],
                        });
                    } else {
                        throw switchError;
                    }
                }
            }

            setAccount(accounts[0]);
            checkOwner(accounts[0]);
            loadData();
        } catch (error) {
            console.error("Connection error", error);
            if (error.code === 4001) {
                alert("Connection rejected. Please approve the MetaMask prompt to continue.");
            } else {
                alert("Failed to connect wallet: " + (error.reason || error.message));
            }
        }
    };

    // 2. Check if current user is Owner
    const checkOwner = async (address) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(VOTING_ADDRESS, VOTING_ABI, provider);
        const owner = await contract.owner();
        setIsOwner(owner.toLowerCase() === address.toLowerCase());
    };

    // 3. Load All Candidates
    const loadData = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(VOTING_ADDRESS, VOTING_ABI, provider);
            const data = await contract.getAllCandidates();

            // Convert BigInts from Solidity to strings/numbers for React
            const formattedCandidates = data.map((c) => ({
                id: Number(c.id),
                name: c.name,
                voteCount: Number(c.voteCount),
            }));
            setCandidates(formattedCandidates);
        } catch (error) {
            console.error("Fetch error", error);
        }
    };

    // 4. Add Candidate (Owner Only)
    const addCandidate = async () => {
        if (!newCandidateName) return;
        setLoading(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(VOTING_ADDRESS, VOTING_ABI, signer);

            const tx = await contract.addCandidate(newCandidateName);
            await tx.wait();
            setNewCandidateName("");
            loadData();
        } catch (error) {
            alert(error.reason || "Only owner can add candidates");
        }
        setLoading(false);
    };

    // 5. Vote for a Candidate
    const vote = async (id) => {
        setLoading(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(VOTING_ADDRESS, VOTING_ABI, signer);

            const tx = await contract.vote(id);
            await tx.wait();
            loadData();
            alert("Vote cast successfully!");
        } catch (error) {
            alert(error.reason || "You have already voted or error occurred");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (window.ethereum) {
            connectWallet();
            // Auto-refresh when user switches accounts in MetaMask
            window.ethereum.on("accountsChanged", (accs) => setAccount(accs[0]));
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center border-b border-gray-700 pb-6 mb-10">
                    <h1 className="text-3xl font-bold text-blue-400">VoteBlock V1 Test</h1>
                    {account ? (
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Connected As</p>
                            <p className="font-mono text-sm bg-gray-800 px-3 py-1 rounded border border-gray-600">
                                {account.substring(0, 6)}...{account.substring(38)}
                            </p>
                            {isOwner && <span className="text-[10px] bg-yellow-600 px-2 rounded uppercase font-bold">Owner</span>}
                        </div>
                    ) : (
                        <button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition">
                            Connect Wallet
                        </button>
                    )}
                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Election Status Section (Optional Placeholder) */}
                    <div className="md:col-span-2 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg text-center mb-6">
                        <p className="text-blue-200">Cast your vote securely on the blockchain. One vote per account.</p>
                    </div>

                    {/* Voting Panel */}
                    <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">Live Results</h2>
                        <div className="space-y-4">
                            {candidates.length === 0 && <p className="text-gray-500">No candidates added yet.</p>}
                            {candidates.map((c) => (
                                <div key={c.id} className="flex justify-between items-center bg-gray-900 p-4 rounded-lg border border-gray-700">
                                    <div>
                                        <h3 className="font-bold text-lg">{c.name}</h3>
                                        <p className="text-sm text-gray-400">{c.voteCount} Votes</p>
                                    </div>
                                    <button
                                        onClick={() => vote(c.id)}
                                        disabled={loading}
                                        className="bg-blue-500 hover:bg-blue-600 px-5 py-1 rounded-full text-sm font-bold transition disabled:opacity-50"
                                    >
                                        Vote
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <footer className="mt-20 text-center text-gray-600 text-sm">
                    Contract Address: <span className="font-mono">{VOTING_ADDRESS}</span>
                </footer>
            </div>
        </div>
    );
}