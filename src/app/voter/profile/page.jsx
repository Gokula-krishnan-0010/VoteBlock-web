'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const VoterProfile = () => {
  const [voterInfo, setVoterInfo] = useState({
    name: 'John Doe',
    location: 'New York',
    gender: 'Male',
    voterId: 'V12345678',
    voted: false,
  });

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
    },
    card: {
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      width: '380px',
      borderTop: '5px solid #005A9C',
    },
    profileImage: {
      borderRadius: '50%',
      width: '120px',
      height: '120px',
      objectFit: 'cover',
      marginBottom: '20px',
      border: '4px solid #f0f0f0'
    },
    heading: {
      marginBottom: '25px',
      color: '#005A9C',
      fontSize: '24px'
    },
    infoGrid: {
      textAlign: 'left',
      marginBottom: '30px',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '15px'
    },
    infoLabel: {
      fontWeight: 'bold',
      color: '#555'
    },
    infoValue: {
      color: '#333'
    },
    status: {
      color: voterInfo.voted ? '#28a745' : '#dc3545',
      fontWeight: 'bold'
    },
    button: {
      display: 'inline-block',
      padding: '12px 24px',
      color: 'white',
      backgroundColor: '#005A9C',
      borderRadius: '5px',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
      border: 'none',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" style={styles.profileImage} />
        <h1 style={styles.heading}>Voter Profile</h1>
        <div style={styles.infoGrid}>
          <strong style={styles.infoLabel}>Name:</strong>
          <span style={styles.infoValue}>{voterInfo.name}</span>
          <strong style={styles.infoLabel}>Location:</strong>
          <span style={styles.infoValue}>{voterInfo.location}</span>
          <strong style={styles.infoLabel}>Gender:</strong>
          <span style={styles.infoValue}>{voterInfo.gender}</span>
          <strong style={styles.infoLabel}>Voter ID:</strong>
          <span style={styles.infoValue}>{voterInfo.voterId}</span>
          <strong style={styles.infoLabel}>Status:</strong>
          <span style={styles.status}>{voterInfo.voted ? 'Voted' : 'Not Voted'}</span>
        </div>
        <Link href="../voter/dashboard" style={styles.button}>
          Proceed to Voting
        </Link>
      </div>
    </div>
  );
};

export default VoterProfile;