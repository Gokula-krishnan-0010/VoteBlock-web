'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const VotingPage = () => {
  const searchParams = useSearchParams();
  const electionId = searchParams.get('electionId') || '1';
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Check if already voted for this election
  useEffect(() => {
    const votedElections = JSON.parse(localStorage.getItem('votedElections') || '[]');
    if (votedElections.includes(electionId)) {
      setHasVoted(true);
    }
  }, [electionId]);

  const candidates = [
    { id: 1, name: 'Candidate A', party: 'Alliance Party', logo: 'AP' },
    { id: 2, name: 'Candidate B', party: 'Progressive Party', logo: 'PP' },
    { id: 3, name: 'Candidate C', party: 'Unity Group', logo: 'UG' },
    { id: 4, name: 'Candidate D', party: 'Independent', logo: 'IND' },
  ];




  const handleVote = () => {
    if (selectedCandidate) {
      // Persist the voted election to localStorage
      const votedElections = JSON.parse(localStorage.getItem('votedElections') || '[]');
      if (!votedElections.includes(electionId)) {
        votedElections.push(electionId);
        localStorage.setItem('votedElections', JSON.stringify(votedElections));
      }
      setHasVoted(true);
    }
  };

  if (hasVoted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] p-4 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10 border border-green-500/20 bg-[#12122a]/80 backdrop-blur-xl rounded-2xl text-center" style={{ padding: "40px" }}>
          <div className="text-5xl" style={{ marginBottom: "10px" }}>✅</div>
          <h1 className="text-2xl font-bold text-white" style={{ marginTop: "10px" }}>Vote Cast Successfully</h1>
          <p className="text-slate-400 leading-relaxed" style={{ marginTop: "10px" }}>
            Your vote has been encrypted and broadcast to the blockchain.
            Transaction Hash: <span className="text-violet-400 font-mono">0x9f8e...3a2b</span>
          </p>
          <button
            onClick={() => window.location.href = '/voter/profile'}
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25"
            style={{ marginTop: "20px", padding: "12px 24px" }}
          >
            Return to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] p-6 md:p-10 text-white font-sans relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="max-w-[800px] mx-auto relative z-10">

        {/* Header */}
        <header className="text-center" style={{ marginBottom: "10px" }}>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">Official Ballot</h1>
          <p className="text-slate-400" style={{ marginTop: "10px" }}>Please select one candidate for the 2026 Central District Election.</p>
        </header>

        {/* Candidate List */}
        <div className="grid gap-4" style={{ marginTop: "10px" }}>
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate.id)}
              className={`flex items-center bg-[#12122a]/80 backdrop-blur-xl rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedCandidate === candidate.id
                ? 'border-violet-500 scale-[1.02]'
                : 'border-white/10 hover:border-white/20'
                }`}
              style={{ padding: "20px", margin: "10px 0" }}
            >
              <div
                className={`w-[60px] h-[60px] rounded-xl flex items-center justify-center text-xl font-bold ${selectedCandidate === candidate.id
                  ? 'bg-violet-500/20 text-violet-400'
                  : 'bg-white/5 text-slate-400'
                  }`}
                style={{ marginRight: "20px" }}
              >
                {candidate.logo}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
                <p className="text-slate-400 text-sm" style={{ marginTop: "4px" }}>{candidate.party}</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedCandidate === candidate.id
                  ? 'border-violet-500 bg-violet-500'
                  : 'border-slate-500 bg-transparent'
                  }`}
              >
                {selectedCandidate === candidate.id && <div className="w-2 h-2 bg-[#0a0a1a] rounded-full" />}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Section */}
        <div
          className="bg-violet-500/5 border border-dashed border-violet-500/20 rounded-2xl text-center"
          style={{ marginTop: "20px", padding: "30px" }}
        >
          <p className="text-sm text-slate-400" style={{ marginBottom: "10px" }}>
            By clicking "Cast Vote", you are signing this transaction with your blockchain wallet address. This action is final and irreversible.
          </p>
          <button
            disabled={!selectedCandidate}
            onClick={handleVote}
            className={`font-bold text-base rounded-xl border-none transition-all ${selectedCandidate
              ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white cursor-pointer shadow-lg shadow-violet-500/25'
              : 'bg-white/5 text-slate-500 cursor-not-allowed'
              }`}
            style={{ marginTop: "10px", padding: "16px 60px" }}
          >
            Cast Secure Vote
          </button>
        </div>

      </div>
    </div>
  );
};


export default VotingPage;