'use client';

import React, { useState } from 'react';

const VotingSystem = () => {
  const [voterProfile, setVoterProfile] = useState({
    name: 'John Doe',
    voterId: 'VTR-2026-4521',
    hasVoted: false,
    encryptionKey: null,
    votedAt: null
  });

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const candidates = [
    {
      id: 1,
      name: 'Sarah Anderson',
      party: 'Progressive Democratic Party',
      slogan: 'Building a Sustainable Future Together',
      color: '#3b82f6'
    },
    {
      id: 2,
      name: 'Michael Chen',
      party: 'Conservative Unity Coalition',
      slogan: 'Tradition, Values, Prosperity',
      color: '#ef4444'
    },
    {
      id: 3,
      name: 'Priya Ramesh',
      party: 'Green Earth Alliance',
      slogan: 'Planet First, People Always',
      color: '#10b981'
    },
    {
      id: 4,
      name: 'David Thompson',
      party: 'Independent Citizens Movement',
      slogan: 'No Party Lines, Just Solutions',
      color: '#a855f7'
    }
  ];

  const generateEncryptionKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    for (let i = 0; i < 16; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
      if ((i + 1) % 4 === 0 && i !== 15) key += '-';
    }
    return key;
  };

  const handleCastVote = () => {
    if (!selectedCandidate) {
      alert('Please select a candidate before casting your vote.');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmVote = () => {
    const encryptionKey = generateEncryptionKey();
    const votedAt = new Date().toLocaleString();
    
    setVoterProfile({
      ...voterProfile,
      hasVoted: true,
      encryptionKey: encryptionKey,
      votedAt: votedAt
    });
    
    setShowConfirmation(false);
  };

  const cancelVote = () => {
    setShowConfirmation(false);
  };

  const selectedCandidateData = candidates.find(c => c.id === selectedCandidate);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .title {
          font-size: 42px;
          font-weight: 300;
          color: #f1f5f9;
          letter-spacing: -1px;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 16px;
          color: #64748b;
          font-weight: 300;
        }

        .voter-card {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.1);
          margin-bottom: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        .voter-header {
          font-size: 20px;
          font-weight: 400;
          color: #e2e8f0;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }

        .voter-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 25px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .label {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .value {
          font-size: 18px;
          color: #f1f5f9;
          font-weight: 300;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          width: fit-content;
        }

        .not-voted {
          background: rgba(251, 191, 36, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        .voted {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .encryption-box {
          background: rgba(16, 185, 129, 0.1);
          padding: 20px;
          border-radius: 12px;
          margin-top: 25px;
          border: 1px solid rgba(16, 185, 129, 0.3);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
        }

        .encryption-key {
          font-size: 20px;
          font-weight: 500;
          color: #10b981;
          letter-spacing: 3px;
          text-align: center;
          margin-top: 15px;
          font-family: 'Courier New', monospace;
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }

        .section-title {
          font-size: 24px;
          font-weight: 400;
          color: #e2e8f0;
          margin-bottom: 30px;
        }

        .candidate-card {
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(10px);
          padding: 25px;
          border-radius: 16px;
          margin-bottom: 20px;
          cursor: pointer;
          border: 1px solid rgba(148, 163, 184, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .candidate-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.15), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .candidate-card:hover:not(.disabled) {
          transform: translateY(-4px);
          border-color: rgba(148, 163, 184, 0.3);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        .candidate-card:hover:not(.disabled)::before {
          opacity: 1;
        }

        .candidate-card.selected {
          transform: translateY(-6px);
          border-color: var(--candidate-color);
          box-shadow: 0 0 40px var(--glow-color), 0 12px 40px rgba(0, 0, 0, 0.5);
          background: rgba(30, 41, 59, 0.8);
        }

        .candidate-card.selected::before {
          opacity: 1;
        }

        .candidate-card.disabled {
          cursor: not-allowed;
          opacity: 0.4;
        }

        .candidate-content {
          position: relative;
          z-index: 1;
        }

        .candidate-name {
          font-size: 22px;
          font-weight: 400;
          margin-bottom: 8px;
          color: #f1f5f9;
        }

        .candidate-party {
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 12px;
          font-weight: 300;
        }

        .candidate-slogan {
          font-size: 16px;
          font-style: italic;
          color: #cbd5e1;
          font-weight: 300;
        }

        .radio-circle {
          position: absolute;
          top: 25px;
          right: 25px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid rgba(148, 163, 184, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 2;
        }

        .candidate-card.selected .radio-circle {
          border-color: var(--candidate-color);
          box-shadow: 0 0 15px var(--glow-color);
        }

        .radio-inner {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--candidate-color);
          box-shadow: 0 0 10px var(--glow-color);
        }

        .vote-button {
          width: 100%;
          padding: 18px;
          font-size: 18px;
          font-weight: 400;
          color: #f1f5f9;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          letter-spacing: 0.5px;
        }

        .vote-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5), 0 6px 25px rgba(59, 130, 246, 0.4);
        }

        .vote-button:disabled {
          background: rgba(71, 85, 105, 0.5);
          cursor: not-allowed;
          box-shadow: none;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(20px);
          padding: 40px;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-title {
          font-size: 28px;
          font-weight: 400;
          color: #f1f5f9;
          margin-bottom: 25px;
        }

        .modal-text {
          font-size: 16px;
          color: #cbd5e1;
          margin-bottom: 12px;
          line-height: 1.6;
          font-weight: 300;
        }

        .modal-candidate {
          font-weight: 500;
          font-size: 20px;
          margin-top: 20px;
          margin-bottom: 8px;
        }

        .modal-warning {
          margin-top: 25px;
          padding: 15px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          font-weight: 400;
        }

        .modal-buttons {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }

        .confirm-button,
        .cancel-button {
          flex: 1;
          padding: 14px;
          font-size: 16px;
          font-weight: 500;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .confirm-button {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #f1f5f9;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .confirm-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.5), 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .cancel-button {
          background: rgba(71, 85, 105, 0.5);
          color: #e2e8f0;
          border: 1px solid rgba(148, 163, 184, 0.3);
        }

        .cancel-button:hover {
          background: rgba(71, 85, 105, 0.7);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .title {
            font-size: 32px;
          }
          
          .voter-info {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <h1 className="title">Electronic Voting System</h1>
          <p className="subtitle">Secure • Transparent • Democratic</p>
        </div>

        <div className="voter-card">
          <h2 className="voter-header">Voter Profile</h2>
          <div className="voter-info">
            <div className="info-item">
              <div className="label">Voter Name</div>
              <div className="value">{voterProfile.name}</div>
            </div>
            <div className="info-item">
              <div className="label">Voter ID</div>
              <div className="value">{voterProfile.voterId}</div>
            </div>
            <div className="info-item">
              <div className="label">Voting Status</div>
              <div>
                <span className={`status-badge ${voterProfile.hasVoted ? 'voted' : 'not-voted'}`}>
                  {voterProfile.hasVoted ? '✓ Voted' : '○ Not Voted'}
                </span>
              </div>
            </div>
            {voterProfile.votedAt && (
              <div className="info-item">
                <div className="label">Voted At</div>
                <div className="value">{voterProfile.votedAt}</div>
              </div>
            )}
          </div>
          
          {voterProfile.hasVoted && voterProfile.encryptionKey && (
            <div className="encryption-box">
              <div className="label">🔐 Vote Verification Key</div>
              <div className="encryption-key">{voterProfile.encryptionKey}</div>
              <div className="label" style={{marginTop: '15px', textAlign: 'center', fontSize: '12px'}}>
                Save this key for vote verification
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="section-title">Select Your Candidate</h2>
          
          {candidates.map(candidate => (
            <div
              key={candidate.id}
              className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''} ${voterProfile.hasVoted ? 'disabled' : ''}`}
              style={{
                '--candidate-color': candidate.color,
                '--glow-color': candidate.color + '40'
              }}
              onClick={() => !voterProfile.hasVoted && setSelectedCandidate(candidate.id)}
            >
              <div className="candidate-content">
                <div className="candidate-name" style={{color: selectedCandidate === candidate.id ? candidate.color : '#f1f5f9'}}>
                  {candidate.name}
                </div>
                <div className="candidate-party">{candidate.party}</div>
                <div className="candidate-slogan">"{candidate.slogan}"</div>
              </div>
              
              <div className="radio-circle">
                {selectedCandidate === candidate.id && (
                  <div className="radio-inner"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className="vote-button"
          onClick={handleCastVote}
          disabled={voterProfile.hasVoted}
        >
          {voterProfile.hasVoted ? 'Vote Already Cast' : 'Cast Vote'}
        </button>

        {showConfirmation && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Confirm Your Vote</h3>
              <p className="modal-text">
                You are about to cast your vote for:
              </p>
              <p className="modal-candidate" style={{color: selectedCandidateData?.color}}>
                {selectedCandidateData?.name}
              </p>
              <p className="modal-text" style={{fontStyle: 'italic'}}>
                {selectedCandidateData?.party}
              </p>
              <div className="modal-warning modal-text">
                ⚠️ This action cannot be undone. Your vote will be final and encrypted.
              </div>
              <div className="modal-buttons">
                <button className="cancel-button" onClick={cancelVote}>
                  Cancel
                </button>
                <button className="confirm-button" onClick={confirmVote}>
                  Confirm Vote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VotingSystem;