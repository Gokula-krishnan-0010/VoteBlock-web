"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { VOTING_ADDRESS, VOTING_ABI } from "../../../blockchain/config";

export default function AdminPage() {
    const [account, setAccount] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [newCandidateName, setNewCandidateName] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    // 1. Connect Wallet
    const connectWallet = async () => {
        if (!window.ethereum) return alert("Please install MetaMask");
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
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
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x7A69',
                                chainName: 'Hardhat Localhost',
                                rpcUrls: ['http://127.0.0.1:8545'],
                            }],
                        });
                    }
                }
            }

            setAccount(accounts[0]);
            checkOwner(accounts[0]);
            loadData();
        } catch (error) {
            console.error("Connection error", error);
            if (error.code === 4001) alert("Connection rejected.");
        }
    };

    // 2. Check Owner
    const checkOwner = async (address) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(VOTING_ADDRESS, VOTING_ABI, provider);
        const owner = await contract.owner();
        setIsOwner(owner.toLowerCase() === address.toLowerCase());
    };

    // 3. Load Candidates
    const loadData = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(VOTING_ADDRESS, VOTING_ABI, provider);
            const data = await contract.getAllCandidates();
            setCandidates(data.map((c) => ({
                id: Number(c.id),
                name: c.name,
                voteCount: Number(c.voteCount),
            })));
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
            alert("Candidate added!");
        } catch (error) {
            alert(error.reason || "Only owner can add candidates");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (window.ethereum) {
            connectWallet();
            window.ethereum.on("accountsChanged", (accs) => setAccount(accs[0]));
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <div className="max-w-xl mx-auto">
                <header className="border-b border-yellow-600 pb-6 mb-10 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-yellow-500">VoteBlock Admin</h1>
                    {account && <span className="text-xs bg-gray-800 px-2 py-1 rounded border border-gray-600 font-mono">{account.substring(0, 6)}...</span>}
                </header>

                {!isOwner && account && (
                    <div className="bg-red-900/50 border border-red-500 p-4 rounded text-center mb-8">
                        <p className="font-bold text-red-200">Access Denied</p>
                        <p className="text-sm text-red-300">You must be the contract owner to use this page.</p>
                    </div>
                )}

                <section className={`bg-gray-800 p-6 rounded-xl border border-yellow-700/50 shadow-xl mb-8 ${!isOwner && 'opacity-50 pointer-events-none'}`}>
                    <h2 className="text-xl font-semibold mb-4 text-white">Add Candidate</h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Candidate Name"
                            className="flex-1 bg-gray-900 border border-gray-600 p-2 rounded text-white focus:outline-none focus:border-yellow-500"
                            value={newCandidateName}
                            onChange={(e) => setNewCandidateName(e.target.value)}
                        />
                        <button
                            onClick={addCandidate}
                            disabled={loading || !isOwner}
                            className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-2 rounded font-bold transition disabled:opacity-50"
                        >
                            {loading ? "Adding..." : "Add"}
                        </button>
                    </div>
                </section>

                <section className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-gray-400">Current Candidates</h2>
                    <div className="space-y-2">
                        {candidates.length === 0 && <p className="text-gray-500 italic">No candidates yet.</p>}
                        {candidates.map(c => (
                            <div key={c.id} className="flex justify-between p-3 bg-gray-900 rounded border border-gray-700">
                                <span>{c.name}</span>
                                <span className="text-gray-500 text-sm">ID: {c.id}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
