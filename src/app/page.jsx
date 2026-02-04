'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const VoteBlockLayout = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [walletStatus, setWalletStatus] = useState('');
  const [connectedWallet, setConnectedWallet] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setWalletStatus('error');
      return;
    }

    try {
      setWalletStatus('connecting');
      
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      const account = accounts[0];

      const polygonAmoy = {
        chainId: '0x13882',
        chainName: 'Polygon Amoy Testnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ['https://rpc-amoy.polygon.technology'],
        blockExplorerUrls: ['https://amoy.polygonscan.com/']
      };

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: polygonAmoy.chainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [polygonAmoy],
          });
        }
      }

      setWalletStatus('success');
      setConnectedWallet(account);
      
      setTimeout(() => {
        setShowModal(false);
        setWalletStatus('');
      }, 2000);

    } catch (error) {
      setWalletStatus('error');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1629 100%)',
      color: '#e2e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      background: 'rgba(10, 14, 39, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    headerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '28px',
      fontWeight: 600,
      background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: 0,
    },
    nav: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
    },
    navLink: {
      color: '#cbd5e1',
      fontSize: '15px',
      cursor: 'pointer',
      padding: '8px 16px',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
    },
    navLinkActive: {
      color: '#a78bfa',
      background: 'rgba(139, 92, 246, 0.1)',
    },
    mainContent: {
      minHeight: 'calc(100vh - 80px)',
    },
    pageContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '60px 40px',
    },
    heroSection: {
      textAlign: 'center',
      marginBottom: '80px',
      paddingTop: '40px',
    },
    heroTitle: {
      fontSize: '64px',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 50%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '20px',
      lineHeight: 1.2,
    },
    heroSubtitle: {
      fontSize: '24px',
      color: '#f1f5f9',
      marginBottom: '15px',
      fontWeight: 400,
    },
    heroDescription: {
      fontSize: '18px',
      color: '#94a3b8',
      marginBottom: '40px',
      maxWidth: '700px',
      margin: '0 auto 40px',
      lineHeight: 1.6,
    },
    walletConnected: {
      marginTop: '20px',
      padding: '12px 24px',
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '8px',
      color: '#10b981',
      fontSize: '14px',
      fontFamily: 'monospace',
      display: 'inline-block',
    },
    primaryButton: {
      padding: '16px 40px',
      fontSize: '18px',
      fontWeight: 600,
      color: '#ffffff',
      background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
    },
    section: {
      marginBottom: '80px',
    },
    sectionTitle: {
      fontSize: '38px',
      fontWeight: 600,
      color: '#f1f5f9',
      marginBottom: '40px',
      textAlign: 'center',
    },
    processSteps: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    },
    stepCard: {
      display: 'flex',
      gap: '25px',
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      padding: '30px',
      borderRadius: '16px',
      border: '1px solid rgba(139, 92, 246, 0.2)',
    },
    stepNumber: {
      minWidth: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 700,
      boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      fontSize: '22px',
      fontWeight: 600,
      color: '#a78bfa',
      marginBottom: '15px',
    },
    stepDescription: {
      fontSize: '16px',
      color: '#cbd5e1',
      marginBottom: '15px',
      lineHeight: 1.6,
    },
    technicalBox: {
      background: 'rgba(139, 92, 246, 0.1)',
      padding: '15px',
      borderRadius: '8px',
      borderLeft: '3px solid #8b5cf6',
      fontSize: '14px',
      color: '#94a3b8',
      marginTop: '15px',
      fontFamily: 'monospace',
      lineHeight: 1.8,
    },
    verificationCard: {
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      padding: '40px',
      borderRadius: '16px',
      border: '1px solid rgba(139, 92, 246, 0.3)',
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: 600,
      color: '#f1f5f9',
      marginBottom: '20px',
    },
    cardDescription: {
      fontSize: '16px',
      color: '#cbd5e1',
      lineHeight: 1.7,
      marginBottom: '30px',
    },
    ledgerExample: {
      background: 'rgba(10, 14, 39, 0.6)',
      padding: '25px',
      borderRadius: '12px',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      marginBottom: '25px',
    },
    ledgerTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#a78bfa',
      marginBottom: '20px',
    },
    ledgerContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    ledgerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    },
    ledgerLabel: {
      color: '#64748b',
      fontSize: '14px',
      fontWeight: 500,
    },
    ledgerValue: {
      color: '#10b981',
      fontSize: '14px',
      fontFamily: 'monospace',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '60px',
    },
    featureCard: {
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      padding: '35px',
      borderRadius: '16px',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      transition: 'transform 0.3s ease',
    },
    featureIcon: {
      fontSize: '48px',
      marginBottom: '20px',
    },
    featureTitle: {
      fontSize: '22px',
      fontWeight: 600,
      marginBottom: '12px',
      color: '#f1f5f9',
    },
    featureText: {
      fontSize: '15px',
      color: '#94a3b8',
      lineHeight: 1.6,
    },
    dashboardHeader: {
      marginBottom: '50px',
    },
    pageTitle: {
      fontSize: '42px',
      fontWeight: 600,
      color: '#f1f5f9',
      marginBottom: '10px',
    },
    pageSubtitle: {
      fontSize: '18px',
      color: '#94a3b8',
      fontWeight: 300,
    },
    dashboardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '30px',
      marginBottom: '30px',
    },
    infoCard: {
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      padding: '30px',
      borderRadius: '16px',
      border: '1px solid rgba(139, 92, 246, 0.2)',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    },
    infoLabel: {
      color: '#94a3b8',
      fontSize: '14px',
      fontWeight: 500,
    },
    infoValue: {
      color: '#e2e8f0',
      fontSize: '14px',
      fontFamily: 'monospace',
    },
    electionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      background: 'rgba(10, 14, 39, 0.4)',
      borderRadius: '8px',
      marginBottom: '10px',
    },
    electionTitle: {
      color: '#f1f5f9',
      fontSize: '16px',
      fontWeight: 500,
      marginBottom: '5px',
    },
    electionDate: {
      color: '#64748b',
      fontSize: '13px',
    },
    voteButton: {
      padding: '8px 20px',
      fontSize: '14px',
      fontWeight: 600,
      color: '#ffffff',
      background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    voteHistoryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      background: 'rgba(10, 14, 39, 0.4)',
      borderRadius: '8px',
    },
    txHash: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px',
      fontSize: '13px',
      color: '#64748b',
      fontFamily: 'monospace',
    },
    verifyBtn: {
      padding: '4px 12px',
      fontSize: '12px',
      fontWeight: 500,
      color: '#10b981',
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '25px',
      marginBottom: '50px',
    },
    statCard: {
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      padding: '30px',
      borderRadius: '16px',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      textAlign: 'center',
    },
    statValue: {
      fontSize: '36px',
      fontWeight: 700,
      color: '#a78bfa',
      marginBottom: '10px',
    },
    statLabel: {
      fontSize: '14px',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    adminActions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
    },
    actionButton: {
      padding: '18px 24px',
      fontSize: '16px',
      fontWeight: 600,
      color: '#ffffff',
      background: 'rgba(30, 41, 59, 0.5)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },
    buttonIcon: {
      fontSize: '20px',
    },
    logoutContainer: {
      textAlign: 'center',
      maxWidth: '500px',
      margin: '100px auto',
      padding: '60px 40px',
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      border: '1px solid rgba(139, 92, 246, 0.2)',
    },
    logoutIcon: {
      fontSize: '64px',
      marginBottom: '20px',
    },
    logoutTitle: {
      fontSize: '32px',
      fontWeight: 600,
      color: '#f1f5f9',
      marginBottom: '15px',
    },
    logoutText: {
      fontSize: '16px',
      color: '#94a3b8',
      marginBottom: '30px',
      lineHeight: 1.6,
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      background: 'rgba(30, 41, 59, 0.95)',
      backdropFilter: 'blur(20px)',
      padding: '50px',
      borderRadius: '24px',
      maxWidth: '500px',
      width: '90%',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      textAlign: 'center',
    },
    modalTitle: {
      fontSize: '28px',
      fontWeight: 600,
      color: '#f1f5f9',
      marginBottom: '15px',
    },
    modalText: {
      fontSize: '16px',
      color: '#94a3b8',
      marginBottom: '30px',
      lineHeight: 1.6,
    },
    modalButton: {
      padding: '14px 32px',
      fontSize: '16px',
      fontWeight: 600,
      color: '#ffffff',
      background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginRight: '10px',
    },
    modalButtonSecondary: {
      padding: '14px 32px',
      fontSize: '16px',
      fontWeight: 600,
      color: '#cbd5e1',
      background: 'rgba(30, 41, 59, 0.5)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    statusMessage: {
      padding: '15px',
      borderRadius: '8px',
      marginTop: '20px',
      fontSize: '14px',
      fontWeight: 500,
    },
    statusSuccess: {
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      color: '#10b981',
    },
    statusError: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#ef4444',
    },
    statusConnecting: {
      background: 'rgba(139, 92, 246, 0.1)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      color: '#a78bfa',
    },
  };

  const HomePage = () => (
    <div style={styles.pageContent}>
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>VoteBlock</h1>
        <p style={styles.heroSubtitle}>
          Decentralized Voting Platform Powered by Blockchain Technology
        </p>
        <p style={styles.heroDescription}>
          Experience the future of democracy with secure, transparent, and tamper-proof elections on the Polygon blockchain
        </p>
        <button 
          style={styles.primaryButton} 
          onClick={() => {
            setShowModal(true)
            router.push('/login');
          }}
        >
          Get Started
        </button>
        {connectedWallet && (
          <div style={styles.walletConnected}>
            Connected: {connectedWallet.substring(0, 6)}...{connectedWallet.substring(38)}
          </div>
        )}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>How VoteBlock Works</h2>
        <div style={styles.processSteps}>
          
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>1</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>Asymmetric Encryption Setup</h3>
              <p style={styles.stepDescription}>
                When you register, VoteBlock generates a unique key pair for you with a public key stored on the blockchain and a private key that remains secure in your wallet.
              </p>
              <div style={styles.technicalBox}>
                Encryption: RSA-2048 bit asymmetric cryptography
              </div>
            </div>
          </div>

          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>2</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>Homomorphic Encryption of Vote</h3>
              <p style={styles.stepDescription}>
                Your vote is encrypted using homomorphic encryption combining candidate ID, wallet address, and public key. This allows tallying without decryption.
              </p>
              <div style={styles.technicalBox}>
                Format: E(candidateID + walletAddress + publicKey)
              </div>
            </div>
          </div>

          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>3</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>Blockchain Recording</h3>
              <p style={styles.stepDescription}>
                Your encrypted vote is submitted as a transaction to the Polygon blockchain with an immutable record, timestamp, and transaction hash.
              </p>
              <div style={styles.technicalBox}>
                Network: Polygon Amoy Testnet
              </div>
            </div>
          </div>

          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>4</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>Vote Tallying</h3>
              <p style={styles.stepDescription}>
                After election closes, votes are tallied using homomorphic properties. Results are computed WITHOUT decrypting individual votes.
              </p>
              <div style={styles.technicalBox}>
                Tally Method: Homomorphic aggregation
              </div>
            </div>
          </div>

          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>5</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>Result Announcement</h3>
              <p style={styles.stepDescription}>
                Election authority uses master private key to decrypt only the aggregated tally. Individual votes remain encrypted forever.
              </p>
              <div style={styles.technicalBox}>
                Decryption: Multi-signature authorization required
              </div>
            </div>
          </div>

        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Public Ledger Verification</h2>
        <div style={styles.verificationCard}>
          <h3 style={styles.cardTitle}>How Voters Verify Their Encrypted Vote</h3>
          <p style={styles.cardDescription}>
            Every voter can independently verify their encrypted vote on the public blockchain ledger. Your vote proof provides complete transparency while maintaining ballot secrecy.
          </p>
          
          <div style={styles.ledgerExample}>
            <div style={styles.ledgerTitle}>Example Public Ledger Entry:</div>
            <div style={styles.ledgerContent}>
              <div style={styles.ledgerRow}>
                <span style={styles.ledgerLabel}>Transaction Hash:</span>
                <span style={styles.ledgerValue}>0x7f9f3c2a...</span>
              </div>
              <div style={styles.ledgerRow}>
                <span style={styles.ledgerLabel}>Voter Wallet:</span>
                <span style={styles.ledgerValue}>0x742d35Cc...</span>
              </div>
              <div style={styles.ledgerRow}>
                <span style={styles.ledgerLabel}>Encrypted Vote:</span>
                <span style={styles.ledgerValue}>0xE9F2A8C4...</span>
              </div>
              <div style={styles.ledgerRow}>
                <span style={styles.ledgerLabel}>Timestamp:</span>
                <span style={styles.ledgerValue}>2026-01-26 14:23:45</span>
              </div>
              <div style={styles.ledgerRow}>
                <span style={styles.ledgerLabel}>Status:</span>
                <span style={{...styles.ledgerValue, color: '#10b981'}}>VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.featuresGrid}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🔒</div>
          <h3 style={styles.featureTitle}>End-to-End Encryption</h3>
          <p style={styles.featureText}>
            Military-grade encryption ensures your vote remains completely private and secure
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>⛓️</div>
          <h3 style={styles.featureTitle}>Immutable Records</h3>
          <p style={styles.featureText}>
            Once recorded on the blockchain, votes cannot be altered, deleted, or tampered with
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>✅</div>
          <h3 style={styles.featureTitle}>Verifiable Results</h3>
          <p style={styles.featureText}>
            Anyone can audit the election results and verify vote counts independently
          </p>
        </div>
      </div>
    </div>
  );

  const VoterPage = () => (
    <div style={styles.pageContent}>
      <div style={styles.dashboardHeader}>
        <h2 style={styles.pageTitle}>Voter Dashboard</h2>
        <p style={styles.pageSubtitle}>View and participate in active elections</p>
      </div>
      
      <div style={styles.dashboardGrid}>
        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>Your Profile</h3>
          <div style={styles.cardContent}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Voter ID:</span>
              <span style={styles.infoValue}>VTR-2026-4521</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Wallet:</span>
              <span style={styles.infoValue}>
                {connectedWallet ? `${connectedWallet.substring(0, 6)}...${connectedWallet.substring(38)}` : '0x742d...bEf4'}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Public Key:</span>
              <span style={styles.infoValue}>0x8f7e...def1</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Status:</span>
              <span style={{...styles.infoValue, color: '#10b981'}}>Verified</span>
            </div>
          </div>
        </div>

        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>Active Elections</h3>
          <div style={styles.cardContent}>
            <div style={styles.electionItem}>
              <div>
                <div style={styles.electionTitle}>Presidential Election 2026</div>
                <div style={styles.electionDate}>Ends: Jan 30, 2026</div>
              </div>
              <button style={styles.voteButton}>Vote</button>
            </div>
            <div style={styles.electionItem}>
              <div>
                <div style={styles.electionTitle}>City Council Election</div>
                <div style={styles.electionDate}>Ends: Feb 15, 2026</div>
              </div>
              <button style={styles.voteButton}>Vote</button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.infoCard}>
        <h3 style={styles.cardTitle}>Your Vote History</h3>
        <div style={styles.cardContent}>
          <div style={styles.voteHistoryItem}>
            <div>
              <div style={styles.electionTitle}>Local Elections 2025</div>
              <div style={styles.electionDate}>Voted: Dec 15, 2025</div>
            </div>
            <div style={styles.txHash}>
              Tx: 0x7f9f3c...5e7f3b6d
              <button style={styles.verifyBtn}>Verify on Ledger</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
  <div style={styles.container}>
    <HomePage />
  </div>
);

}

export default VoteBlockLayout;