'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const PartyList = () => {
  const parties = [
    { name: 'Blue Wave Party', symbol: 'https://i.pravatar.cc/40?u=partyA' },
    { name: 'Red Dragon Alliance', symbol: 'https://i.pravatar.cc/40?u=partyB' },
    { name: 'Green Growth Coalition', symbol: 'https://i.pravatar.cc/40?u=partyC' },
  ];

  const [voted, setVoted] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleVote = (partyName) => {
    setVoted(partyName);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

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
      width: '500px',
      borderTop: '5px solid #005A9C',
    },
    heading: {
      marginBottom: '30px',
      color: '#005A9C',
      fontSize: '24px'
    },
    partyList: {
      listStyle: 'none',
      padding: 0
    },
    partyItem: {
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease',
      border: '1px solid #ddd'
    },
    partySymbol: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      marginRight: '20px'
    },
    partyName: {
      flexGrow: 1,
      textAlign: 'left',
      fontWeight: 'bold'
    },
    voteButton: {
      padding: '10px 20px',
      color: 'white',
      backgroundColor: '#005A9C',
      borderRadius: '5px',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      fontSize: '14px'
    },
    disabledButton: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    },
    link: {
      display: 'inline-block',
      marginTop: '30px',
      color: '#005A9C',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    popup: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 25px',
      borderRadius: '8px',
      backgroundColor: '#28a745',
      color: 'white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      zIndex: 1000,
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Cast Your Vote</h1>
        <ul style={styles.partyList}>
          {parties.map((party) => (
            <li key={party.name} style={{...styles.partyItem, backgroundColor: voted === party.name ? '#e9ecef' : 'transparent'}}>
              <img src={party.symbol} alt={`${party.name} symbol`} style={styles.partySymbol} />
              <span style={styles.partyName}>{party.name}</span>
              <button
                onClick={() => handleVote(party.name)}
                disabled={voted !== null}
                style={voted ? {...styles.voteButton, ...styles.disabledButton} : styles.voteButton}
              >
                {voted === party.name ? 'Voted' : 'Vote'}
              </button>
            </li>
          ))}
        </ul>
        <Link href="/voter/profile" style={styles.link}>
          Back to Profile
        </Link>
      </div>
      {showPopup && (
        <div style={styles.popup}>
          Successfully voted for {voted}!
        </div>
      )}
    </div>
  );
};

export default PartyList;