'use client';

import { useEffect } from 'react';

export default function ConnectWallet() {

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not installed');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const walletAddress = accounts[0];
      console.log('Voter wallet address:', accounts);

      // Send to backend to bind with voter ID
      await fetch('/api/wallet/bind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      });

    } catch (err) {
      console.error('MetaMask error:', err);
    }
  };

  return (
    <button onClick={connectWallet}>
      Connect MetaMask Wallet
    </button>
  );
}
