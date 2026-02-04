'use client';
import React, { useState } from 'react';

const VotingPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const candidates = [
    { id: 1, name: 'Candidate A', party: 'Alliance Party', logo: 'AP' },
    { id: 2, name: 'Candidate B', party: 'Progressive Party', logo: 'PP' },
    { id: 3, name: 'Candidate C', party: 'Unity Group', logo: 'UG' },
    { id: 4, name: 'Candidate D', party: 'Independent', logo: 'IND' },
  ];

  const theme = {
    bg: '#020617',
    card: '#0f172a',
    accent: '#38bdf8', // Sky Blue
    border: '#1e293b',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    success: '#4ade80',
  };

  const handleVote = () => {
    if (selectedCandidate) {
      // In your project, this is where you'd call your Smart Contract function
      setHasVoted(true);
    }
  };

  if (hasVoted) {
    return (
      <div style={{ backgroundColor: theme.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMain, fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: theme.card, padding: '40px', borderRadius: '24px', textAlign: 'center', border: `1px solid ${theme.success}`, maxWidth: '500px' }}>
          <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
          <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Vote Cast Successfully</h1>
          <p style={{ color: theme.textMuted, lineHeight: '1.6' }}>
            Your vote has been encrypted and broadcast to the blockchain. 
            Transaction Hash: <span style={{ color: theme.accent, fontFamily: 'monospace' }}>0x9f8e...3a2b</span>
          </p>
          <button 
            onClick={() => window.location.href = '/voter/profile'}
            style={{ marginTop: '30px', padding: '12px 24px', background: theme.accent, border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Return to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', padding: '40px 24px', color: theme.textMain, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0, color: theme.accent }}>Official Ballot</h1>
          <p style={{ color: theme.textMuted, marginTop: '10px' }}>Please select one candidate for the 2026 Central District Election.</p>
        </header>

        {/* Candidate List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {candidates.map((candidate) => (
            <div 
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate.id)}
              style={{
                backgroundColor: theme.card,
                padding: '20px',
                borderRadius: '16px',
                border: `2px solid ${selectedCandidate === candidate.id ? theme.accent : theme.border}`,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: selectedCandidate === candidate.id ? 'scale(1.02)' : 'scale(1)'
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                backgroundColor: '#1e293b', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: theme.accent,
                marginRight: '20px'
              }}>
                {candidate.logo}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{candidate.name}</h3>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>{candidate.party}</p>
              </div>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: `2px solid ${selectedCandidate === candidate.id ? theme.accent : theme.textMuted}`,
                backgroundColor: selectedCandidate === candidate.id ? theme.accent : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedCandidate === candidate.id && <div style={{ width: '8px', height: '8px', backgroundColor: theme.bg, borderRadius: '50%' }} />}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Section */}
        <div style={{ marginTop: '40px', padding: '30px', backgroundColor: 'rgba(56, 189, 248, 0.05)', borderRadius: '20px', border: `1px dashed ${theme.accent}44`, textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: theme.textMuted, marginBottom: '20px' }}>
            By clicking "Cast Vote", you are signing this transaction with your blockchain wallet address. This action is final and irreversible.
          </p>
          <button 
            disabled={!selectedCandidate}
            onClick={handleVote}
            style={{ 
              backgroundColor: selectedCandidate ? theme.accent : '#334155', 
              color: selectedCandidate ? theme.bg : theme.textMuted,
              padding: '16px 60px', 
              borderRadius: '14px', 
              fontWeight: 'bold', 
              fontSize: '16px',
              border: 'none',
              cursor: selectedCandidate ? 'pointer' : 'not-allowed',
              boxShadow: selectedCandidate ? `0 10px 15px -3px ${theme.accent}33` : 'none'
            }}
          >
            Cast Secure Vote
          </button>
        </div>

      </div>
    </div>
  );
};


export default VotingPage;