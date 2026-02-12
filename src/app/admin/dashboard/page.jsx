'use client';

import React, { useState, useEffect } from 'react';
import {
    Users,
    FileText,
    Settings,
    Vote,
    ShieldCheck,
    Activity,
    Plus,
    Trash2,
    Clock,
    CheckCircle2,
    Lock,
    Key,
    Eye,
    EyeOff,
    LayoutDashboard,
    Search,
    ArrowRight
} from 'lucide-react';

// --- Dashboard Component ---
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('create-election');

    const renderContent = () => {
        switch (activeTab) {
            case 'create-election':
                return <CreateElection />;
            case 'transactions':
                return <TransactionList />;
            case 'encryption':
                return <HomomorphicEncryptionStats />;
            default:
                return <CreateElection />;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-md hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                        <ShieldCheck className="w-6 h-6 text-indigo-400" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        Admin Panel
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <SidebarItem
                        icon={<Vote size={20} />}
                        label="Create Election"
                        active={activeTab === 'create-election'}
                        onClick={() => setActiveTab('create-election')}
                    />
                    <SidebarItem
                        icon={<FileText size={20} />}
                        label="Transactions"
                        active={activeTab === 'transactions'}
                        onClick={() => setActiveTab('transactions')}
                    />
                    <SidebarItem
                        icon={<Lock size={20} />}
                        label="Encryption Stats"
                        active={activeTab === 'encryption'}
                        onClick={() => setActiveTab('encryption')}
                    />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-200 truncate">Admin User</p>
                            <p className="text-xs text-slate-500 truncate">admin@voteblock.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-indigo-400" />
                        <span className="font-bold text-slate-100">VoteBlock Admin</span>
                    </div>
                    {/* Mobile menu toggle would go here */}
                </header>

                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

// --- Subcomponents ---

const SidebarItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
    >
        {icon}
        <span className="font-medium">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />}
    </button>
);

const CreateElection = () => {
    const [candidates, setCandidates] = useState(['', '']);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const addCandidate = () => setCandidates([...candidates, '']);
    const removeCandidate = (index) => setCandidates(candidates.filter((_, i) => i !== index));
    const updateCandidate = (index, value) => {
        const output = [...candidates];
        output[index] = value;
        setCandidates(output);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setNotification({ type: 'success', message: 'Election contract deployed successfully!' });
            setTimeout(() => setNotification(null), 3000);
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-slate-100">Create Election</h2>
                    <p className="text-slate-400 mt-1">Deploy a new secure voting contract to the blockchain.</p>
                </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Election Title</label>
                            <input
                                type="text"
                                placeholder="e.g. National General Election 2024"
                                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Description</label>
                            <input
                                type="text"
                                placeholder="Brief description of the election..."
                                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                                required
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Start Date & Time</label>
                            <input
                                type="datetime-local"
                                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all [color-scheme:dark]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">End Date & Time</label>
                            <input
                                type="datetime-local"
                                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all [color-scheme:dark]"
                                required
                            />
                        </div>
                    </div>

                    {/* Candidates */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            Candidates <span className="text-slate-500 text-xs font-normal">(Add at least 2)</span>
                        </label>
                        <div className="space-y-3">
                            {candidates.map((candidate, index) => (
                                <div key={index} className="flex gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
                                    <div className="relative flex-1">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Users className="h-4 w-4 text-slate-500" />
                                        </div>
                                        <input
                                            type="text"
                                            value={candidate}
                                            onChange={(e) => updateCandidate(index, e.target.value)}
                                            placeholder={`Candidate Name ${index + 1}`}
                                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                                            required
                                        />
                                    </div>
                                    {candidates.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeCandidate(index)}
                                            className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl border border-transparent hover:border-red-500/20 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addCandidate}
                            className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 px-2 py-1 transition-colors"
                        >
                            <Plus size={16} /> Add Another Candidate
                        </button>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 border-t border-slate-800 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-medium shadow-lg transition-all active:scale-[0.98] ${loading
                                    ? 'bg-slate-700 cursor-not-allowed opacity-70'
                                    : 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-indigo-500/20 hover:shadow-indigo-500/30'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Deploying Contract...</span>
                                </>
                            ) : (
                                <>
                                    <Vote size={18} />
                                    <span>Create Election</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {notification && (
                <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-10 duration-300 z-50 ${notification.type === 'success'
                        ? 'bg-slate-900 border border-green-500/30 text-green-400'
                        : 'bg-slate-900 border border-red-500/30 text-red-400'
                    }`}>
                    {notification.type === 'success' ? <CheckCircle2 size={20} /> : <Activity size={20} />}
                    <span className="font-medium text-white">{notification.message}</span>
                </div>
            )}
        </div>
    );
};

const TransactionList = () => {
    // Mock Data
    const transactions = [
        { hash: '0x71...28b9', type: 'Deploy Contract', sender: 'Admin (0x82...19a)', timestamp: '2 mins ago', status: 'Confirmed' },
        { hash: '0x3a...91c0', type: 'Cast Vote', sender: '0x55...3b1', timestamp: '5 mins ago', status: 'Pending' },
        { hash: '0x92...8f31', type: 'Cast Vote', sender: '0x12...9e2', timestamp: '12 mins ago', status: 'Confirmed' },
        { hash: '0x1b...00a4', type: 'Cast Vote', sender: '0xab...c77', timestamp: '24 mins ago', status: 'Confirmed' },
        { hash: '0x88...12d3', type: 'Register Voter', sender: 'Admin (0x82...19a)', timestamp: '1 hour ago', status: 'Failed' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-slate-100">Blockchain Transactions</h2>
                    <p className="text-slate-400 mt-1">Real-time monitoring of all voting activities.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search hash..."
                        className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-600"
                    />
                </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-950/30 text-slate-400 text-xs uppercase tracking-wider font-medium border-b border-slate-800">
                                <th className="px-6 py-4">Tx Hash</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Sender</th>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {transactions.map((tx, i) => (
                                <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 font-mono text-indigo-400 text-sm">
                                            <Activity size={14} className="text-slate-600 group-hover:text-indigo-500 transition-colors" />
                                            {tx.hash}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-slate-300 font-medium text-sm">{tx.type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400 font-mono">{tx.sender}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{tx.timestamp}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${tx.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                tx.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                            {tx.status === 'Confirmed' && <CheckCircle2 size={12} />}
                                            {tx.status === 'Pending' && <Clock size={12} />}
                                            {tx.status === 'Failed' && <Activity size={12} />}
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const HomomorphicEncryptionStats = () => {
    const [revealed, setRevealed] = useState(false);

    // Mock encrypted string
    const encryptedHash = "0x89a1...b2c4...d3e5...f6a7...9b0c...1a2b...3c4d...5e6f...7a8b...9c0d...1e2f";
    const decryptedTotal = 148203;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-slate-100">Homomorphic Encryption Stats</h2>
                <p className="text-slate-400 mt-1">Visualize privacy-preserving vote tallying on the blockchain.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visualizer Card */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Lock size={120} />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                        <Key className="text-indigo-400" size={18} />
                        Encrypted Vote Tally
                    </h3>

                    <div className="space-y-6">
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-500 break-all leading-loose relative">
                            <span className="absolute top-2 right-2 text-[10px] uppercase font-bold text-slate-600 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Paillier Encrypted</span>
                            {encryptedHash}
                            {encryptedHash}
                            {encryptedHash}
                        </div>

                        <div className="flex items-center justify-center py-4">
                            <ArrowRight className="text-slate-600 animate-pulse" />
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900/20 to-cyan-900/20 border border-indigo-500/20 rounded-xl p-6 text-center">
                            <div className="text-sm text-slate-400 mb-2 uppercase tracking-wide font-semibold">Decrypted Total Votes</div>
                            <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent flex justify-center items-center gap-3">
                                {revealed ? (
                                    <span className="animate-in zoom-in duration-300">{decryptedTotal.toLocaleString()}</span>
                                ) : (
                                    <span className="text-slate-700 blur-sm select-none">100,000</span>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => setRevealed(!revealed)}
                            className="w-full py-3 rounded-xl border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                            {revealed ? <><EyeOff size={16} /> Hide Tally</> : <><Eye size={16} /> Decrypt & Reveal Tally</>}
                        </button>
                    </div>
                </div>

                {/* Info Card */}
                <div className="space-y-6">
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">How it works</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-sm text-slate-400">
                                <div className="mt-0.5 p-1 bg-indigo-500/10 rounded border border-indigo-500/20 h-fit">
                                    <Lock size={12} className="text-indigo-400" />
                                </div>
                                <span>Votes are encrypted on the voter's device using homomorphic encryption before being sent to the blockchain.</span>
                            </li>
                            <li className="flex gap-3 text-sm text-slate-400">
                                <div className="mt-0.5 p-1 bg-cyan-500/10 rounded border border-cyan-500/20 h-fit">
                                    <Plus size={12} className="text-cyan-400" />
                                </div>
                                <span>The smart contract aggregates the encrypted values directly without ever decrypting individual votes.</span>
                            </li>
                            <li className="flex gap-3 text-sm text-slate-400">
                                <div className="mt-0.5 p-1 bg-purple-500/10 rounded border border-purple-500/20 h-fit">
                                    <Key size={12} className="text-purple-400" />
                                </div>
                                <span>Only the election authority (Admin) holds the private key to decrypt the final tally sum.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">System Status</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Encryption Layer</span>
                                <span className="text-green-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Active</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Key Management</span>
                                <span className="text-green-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Secure</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Smart Contract</span>
                                <span className="text-green-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Connected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
