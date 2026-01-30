'use client';
import React, { useState } from 'react';

const BlockchainVisualization = () => {
  const [blockchainData] = useState({
    totalVoters: 200000,
    votedCount: 120000,
    blocksCount: 500,
    avgBlockTime: '12.5s',
    hashRate: '45.2 TH/s',
    smartContracts: [
      { id: 1, name: 'VotingContract.sol', address: '0xabc123...', status: 'Active', version: 'v2.1' },
      { id: 2, name: 'IdentityRegistry.sol', address: '0xdef456...', status: 'Active', version: 'v1.0' },
    ],
    authorityActions: [
      { id: 1, action: 'Merkle Root Verified', timestamp: '2026-01-20 10:45 AM' },
      { id: 2, action: 'Election Genesis Block Created', timestamp: '2026-01-20 10:00 AM' },
    ],
  });

  const votingPercentage = ((blockchainData.votedCount / blockchainData.totalVoters) * 100).toFixed(1);

  // Custom Inline Styles for Guaranteed Rendering
  const theme = {
    bg: '#020617',
    card: '#0f172a',
    border: '#1e293b',
    accent: '#22d3ee', // Cyan/Teal
    textMain: '#f8fafc',
    textMuted: '#94a3b8'
  };

  const cardStyle = {
    backgroundColor: theme.card,
    borderRadius: '16px',
    padding: '24px',
    border: `1px solid ${theme.border}`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', padding: '40px 24px', color: theme.textMain, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', background: 'linear-gradient(to right, #22d3ee, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Live Node Monitor
          </h1>
          <p style={{ color: theme.textMuted, fontSize: '16px' }}>Network Status: <span style={{ color: '#4ade80' }}>● Synchronized</span></p>
        </header>

        {/* Top Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={cardStyle}>
            <p style={{ color: theme.textMuted, fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>Total Voter Base</p>
            <p style={{ fontSize: '28px', fontWeight: '700' }}>{blockchainData.totalVoters.toLocaleString()}</p>
          </div>
          <div style={cardStyle}>
            <p style={{ color: theme.textMuted, fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>Cast Ballots</p>
            <p style={{ fontSize: '28px', fontWeight: '700', color: theme.accent }}>{blockchainData.votedCount.toLocaleString()}</p>
          </div>
          <div style={cardStyle}>
            <p style={{ color: theme.textMuted, fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>Chain Height</p>
            <p style={{ fontSize: '28px', fontWeight: '700' }}>#{blockchainData.blocksCount}</p>
          </div>
          <div style={cardStyle}>
            <p style={{ color: theme.textMuted, fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>Participation</p>
            <div style={{ fontSize: '28px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {votingPercentage}%
              <div style={{ width: '60px', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${votingPercentage}%`, height: '100%', background: theme.accent }} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          
          {/* Smart Contract Table */}
          <div style={cardStyle}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Active Smart Contracts</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                    <th style={{ padding: '12px', color: theme.textMuted, fontSize: '12px' }}>NAME</th>
                    <th style={{ padding: '12px', color: theme.textMuted, fontSize: '12px' }}>ADDRESS</th>
                    <th style={{ padding: '12px', color: theme.textMuted, fontSize: '12px' }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {blockchainData.smartContracts.map((contract) => (
                    <tr key={contract.id} style={{ borderBottom: `1px solid ${theme.border}33` }}>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{contract.name} <span style={{fontSize: '10px', color: theme.textMuted}}>{contract.version}</span></td>
                      <td style={{ padding: '12px', fontSize: '14px', fontFamily: 'monospace', color: theme.accent }}>{contract.address}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#34d399', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                          {contract.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Logs / Activity */}
          <div style={cardStyle}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Network Audit Log</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {blockchainData.authorityActions.map((action) => (
                <div key={action.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '2px', height: '40px', background: theme.border, marginLeft: '10px' }} />
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>{action.action}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: theme.textMuted }}>{action.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', padding: '12px', background: '#020617', borderRadius: '8px', fontSize: '12px', color: '#6366f1', textAlign: 'center', border: '1px dashed #6366f144' }}>
              View Transaction Explorer →
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlockchainVisualization;