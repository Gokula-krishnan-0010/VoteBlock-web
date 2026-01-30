'use client';
import React from 'react';
import Link from 'next/link';

const VoterProfile = () => {
  const voterInfo = {
    name: 'John Doe',
    voterId: 'V12345678',
    aadhaarCard: 'XXXX-XXXX-9012',
    walletAddress: '0x71C7...E921',
    constituency: 'Central District',
    status: 'Verified',
    location: 'Chennai, Tamil Nadu',
    profilePic: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  };

  // Inline styles to bypass broken Tailwind setup
  const styles = {
    container: { padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' },
    card: { background: '#1e293b', borderRadius: '24px', padding: '30px', border: '1px solid #334155', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '24px' },
    avatar: { width: '100px', height: '100px', borderRadius: '16px', border: '3px solid #38bdf8', objectFit: 'cover' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
    infoBox: { background: '#0f172a', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b' },
    label: { color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' },
    value: { color: '#f8fafc', fontSize: '16px', fontWeight: 'bold' },
    button: { display: 'block', width: 'fit-content', margin: '40px auto', background: '#38bdf8', color: '#020617', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={voterInfo.profilePic} style={styles.avatar} alt="Voter" />
        <div>
          <h1 style={{ fontSize: '28px', margin: '0 0 5px 0', color: 'white' }}>{voterInfo.name}</h1>
          <p style={{ color: '#38bdf8', margin: 0, fontSize: '14px' }}>{voterInfo.walletAddress} • <span style={{color: '#4ade80'}}>● {voterInfo.status}</span></p>
        </div>
      </div>

      <div style={styles.grid}>
        <div style={styles.infoBox}>
          <h3 style={{color: '#64748b', fontSize: '14px', marginBottom: '20px'}}>ID CREDENTIALS</h3>
          <div style={{marginBottom: '15px'}}>
             <span style={styles.label}>Voter ID</span>
             <span style={styles.value}>{voterInfo.voterId}</span>
          </div>
          <div>
             <span style={styles.label}>Aadhaar Number</span>
             <span style={styles.value}>{voterInfo.aadhaarCard}</span>
          </div>
        </div>

        <div style={styles.infoBox}>
          <h3 style={{color: '#64748b', fontSize: '14px', marginBottom: '20px'}}>VOTING JURISDICTION</h3>
          <div style={{marginBottom: '15px'}}>
             <span style={styles.label}>Constituency</span>
             <span style={styles.value}>{voterInfo.constituency}</span>
          </div>
          <div>
             <span style={styles.label}>Current Location</span>
             <span style={styles.value}>{voterInfo.location}</span>
          </div>
        </div>
      </div>

      <Link href="/voter/dashboard2" style={styles.button}>
        PROCEED TO SECURE BALLOT
      </Link>
    </div>
  );
};

export default VoterProfile;