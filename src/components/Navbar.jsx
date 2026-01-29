'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const [walletStatus, setWalletStatus] = useState('');
    const [connectedWallet, setConnectedWallet] = useState(null);

    // Check if wallet is already connected on mount
    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setConnectedWallet(accounts[0]);
                    setWalletStatus('success');
                }
            }
        };
        checkConnection();
    }, []);

    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            setWalletStatus('error');
            alert('Please install MetaMask!');
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

        } catch (error) {
            console.error("Connection error:", error);
            setWalletStatus('error');
        }
    };

    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <header className="header">
            <div className="header-container">
                <h1 className="logo">VoteBlock</h1>

                <nav className="nav">
                    <Link href="/">Home</Link>
                    <Link href="/voter/dashboard">Voter</Link>
                    <Link href="/admin/dashboard">Admin</Link>
                    <Link href="/logout">Logout</Link>

                    <button
                        onClick={connectWallet}
                        className="connect-btn"
                        style={{
                            marginLeft: '20px',
                            padding: '8px 16px',
                            backgroundColor: connectedWallet ? 'rgba(16, 185, 129, 0.1)' : '#7c3aed',
                            color: connectedWallet ? '#10b981' : 'white',
                            border: connectedWallet ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            fontFamily: 'monospace'
                        }}
                    >
                        {connectedWallet ? formatAddress(connectedWallet) : 'Connect Wallet'}
                    </button>
                </nav>
            </div>
        </header>
    );
}
