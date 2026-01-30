'use client';
import React, { useState } from 'react';

const AdminDetails = () => {
  const [adminInfo] = useState({
    name: 'Admin User',
    role: 'Lead System Administrator',
    constituency: 'Central District',
    totalVoters: 150000,
    nodeStatus: 'Active',
    dbProvider: 'Aiven PostgreSQL',
    registeredCandidates: [
      { id: 1, name: 'Candidate A', party: 'Party X', status: 'Verified', votes: '45,200' },
      { id: 2, name: 'Candidate B', party: 'Party Y', status: 'Verified', votes: '38,150' },
      { id: 3, name: 'Candidate C', party: 'Party Z', status: 'Flagged', votes: '0' },
    ],
  });

  const theme = {
    bg: '#020617', // Deep Navy/Black
    card: '#0f172a', // Slate-900
    cardHover: '#1e293b',
    accent: '#38bdf8', // Sky Blue
    border: '#1e293b',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    success: '#4ade80',
    warning: '#fbbf24'
  };

  const cardStyle = {
    backgroundColor: theme.card,
    borderRadius: '20px',
    padding: '24px',
    border: `1px solid ${theme.border}`,
    transition: 'transform 0.2s ease'
  };

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', padding: '40px 24px', color: theme.textMain, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Admin Panel</h1>
            <p style={{ color: theme.textMuted, marginTop: '5px' }}>Managing blockchain integrity and regional data.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '12px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Network Node</span>
            <p style={{ color: theme.success, fontWeight: 'bold', margin: 0 }}>● {adminInfo.nodeStatus}</p>
          </div>
        </header>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={cardStyle}>
            <p style={{ color: theme.textMuted, fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Administrator</p>
            <p style={{ fontSize: '22px', fontWeight: '700', marginTop: '10px' }}>{adminInfo.name}</p>
            <p style={{ fontSize: '14px', color: theme.accent }}>{adminInfo.role}</p>
          </div>

          <div style={cardStyle}>
            <p style={{ color: theme.textMuted, fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Jurisdiction</p>
            <p style={{ fontSize: '22px', fontWeight: '700', marginTop: '10px' }}>{adminInfo.constituency}</p>
            <p style={{ fontSize: '14px', color: theme.textMuted }}>Central Hub CEN-01</p>
          </div>

          <div style={cardStyle}>
            <p style={{ color: theme.textMuted, fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Database Engine</p>
            <p style={{ fontSize: '22px', fontWeight: '700', marginTop: '10px' }}>{adminInfo.dbProvider}</p>
            <p style={{ fontSize: '14px', color: theme.success }}>Synced: {adminInfo.totalVoters.toLocaleString()} records</p>
          </div>
        </div>

        {/* Candidate Management Table */}
        <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Registered Candidates</h2>
            <button style={{ background: theme.accent, color: theme.bg, border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
              Add Candidate
            </button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <tr>
                  <th style={{ padding: '16px 24px', fontSize: '12px', color: theme.textMuted }}>NAME</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', color: theme.textMuted }}>PARTY</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', color: theme.textMuted }}>STATUS</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', color: theme.textMuted }}>VOTES (SYNCED)</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', color: theme.textMuted, textAlign: 'right' }}>OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {adminInfo.registeredCandidates.map((candidate) => (
                  <tr key={candidate.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                    <td style={{ padding: '16px 24px', fontWeight: '600' }}>{candidate.name}</td>
                    <td style={{ padding: '16px 24px', color: theme.textMuted }}>{candidate.party}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ 
                        backgroundColor: candidate.status === 'Verified' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(251, 191, 36, 0.1)', 
                        color: candidate.status === 'Verified' ? theme.success : theme.warning, 
                        padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' 
                      }}>
                        {candidate.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: theme.accent }}>{candidate.votes}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: '18px' }}>⋮</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Logs Placeholder */}
        <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '12px', border: `1px dashed ${theme.accent}33`, textAlign: 'center' }}>
           <p style={{ margin: 0, fontSize: '13px', color: theme.accent }}>Running Tejas Project Audit Framework v1.0.4 - All systems nominal.</p>
        </div>

      </div>
    </div>
  );
};

export default AdminDetails;