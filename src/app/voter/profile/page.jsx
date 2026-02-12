'use client';

import React, { useState, useEffect } from 'react';
import {
  User,
  Calendar,
  MapPin,
  ShieldCheck,
  Activity,
  Hash,
  Map,
  BadgeCheck,
  Wallet,
  Globe,
  Vote
} from 'lucide-react';
import Link from 'next/link';

const VoterProfile = () => {
  const [votedElections, setVotedElections] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('votedElections') || '[]');
    setVotedElections(stored);
  }, []);

  const voterInfo = {
    voterId: 'VOT-2024-883921',
    fullName: 'Sarah J. Connor',
    dob: '1995-08-14',
    gender: 'Female',
    photoUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop',
    votingStatus: 'Eligible',
    walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    wardNumber: 'Ward 42',
    assemblyConstituency: 'AC-105 South Bengaluru',
    constituencyName: 'Bangalore South',
    elections: [
      {
        id: 1,
        title: 'National General Election 2024',
        date: '2024-11-05',
        status: 'Active',
        description:
          'Cast your vote for the Member of Parliament within your constituency.'
      },
      {
        id: 2,
        title: 'State Assembly Election 2025',
        date: '2025-05-12',
        status: 'Upcoming',
        description:
          'Elect your representative for the State Legislative Assembly.'
      },
      {
        id: 3,
        title: 'Municipal Corporation Election',
        date: '2024-02-10',
        status: 'Completed',
        description:
          'Local body elections for improved civic amenities.'
      }
    ]
  };

  const truncateWallet = (address) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;


  return (
    <div className="min-h-screen bg-[#0a0a1a] text-slate-200 font-sans selection:bg-violet-500/30 relative overflow-hidden" style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-10">

        {/* Page Header */}
        <header className="flex justify-between items-center" style={{ marginBottom: "10px", marginLeft: "20px" }}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#12122a] border border-white/10">
              <User className="w-5 h-5 text-violet-400" />
            </div>
            <div style={{ marginTop: "10px" }}>
              <h1 className="text-3xl font-bold text-white">
                Voter Profile
              </h1>
              <p className="text-sm text-slate-400" style={{ marginTop: "4px" }}>
                View your voter information and active elections
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#12122a] border border-white/10">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <Wallet className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-mono text-slate-300">
              {truncateWallet(voterInfo.walletAddress)}
            </span>
          </div>
        </header>

        {/* Profile Identity */}
        <section
          className="flex flex-col items-center text-center bg-[#12122a]/80 border border-white/10 rounded-2xl backdrop-blur-xl"
          style={{ margin: "10px", padding: "24px" }}
        >
          <div className="relative shrink-0 ">
            <img
              src={voterInfo.photoUrl}
              alt={voterInfo.fullName}
              className="w-[120px] h-[120px] rounded-full object-cover border-2 border-violet-500/30"
            />
            <div className="absolute bottom-1 right-1 bg-[#12122a] p-1.5 rounded-full border border-white/10">
              <BadgeCheck className="w-4 h-4 text-violet-400" />
            </div>
          </div>

          <div className="space-y-4" style={{ marginTop: "10px" }}>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {voterInfo.fullName}
            </h2>

            <div className="flex flex-wrap justify-center gap-3" style={{ marginTop: "10px" }}>
              <MetaTag icon={<ShieldCheck size={16} />} label={voterInfo.voterId} />
              <MetaTag
                icon={<Activity size={16} />}
                label={voterInfo.votingStatus}
                active
              />
              <MetaTag icon={<User size={16} />} label={voterInfo.gender} />
              <MetaTag icon={<Calendar size={16} />} label={voterInfo.dob} />
              <MetaTag icon={<Hash size={16} />} label={voterInfo.wardNumber} />
              <MetaTag icon={<MapPin size={16} />} label={voterInfo.constituencyName} />
            </div>
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6" style={{ marginTop: "10px" }}>

          {/* Jurisdiction Card */}
          <div
            className="bg-[#12122a]/80 border border-white/10 rounded-2xl backdrop-blur-xl h-fit"
            style={{ padding: "24px" }}
          >
            <div className="flex items-center gap-2" style={{ marginBottom: "10px" }}>
              <Map className="w-5 h-5 text-violet-400" />
              <h3 className="text-lg font-bold text-white">Jurisdiction Details</h3>
            </div>

            <div style={{ marginTop: "10px" }}>
              <JurisdictionRow
                label="Assembly Constituency"
                value={voterInfo.assemblyConstituency}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <JurisdictionRow
                label="Parliamentary Constituency"
                value={voterInfo.constituencyName}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <JurisdictionRow
                label="Polling Station"
                value="Govt. Model High School, Block A"
              />
            </div>
          </div>

          {/* Elections */}
          <div>
            <div className="flex items-center gap-3" style={{ marginBottom: "10px" }}>
              <div className="p-2.5 rounded-lg bg-[#12122a] border border-white/10">
                <Vote className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Active Elections</h3>
            </div>

            {voterInfo.elections.map((election) => (
              <div
                key={election.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#12122a]/80 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-violet-500/30 transition hover:bg-[#12122a]"
                style={{ margin: "10px 0", padding: "24px" }}
              >
                <div className="space-y-3 max-w-2xl flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="text-lg font-semibold text-white">
                      {election.title}
                    </h4>
                    <StatusBadge status={election.status} />
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed" style={{ marginTop: "8px" }}>
                    {election.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500" style={{ marginTop: "10px" }}>
                    <InfoItem icon={<Calendar size={15} />} text={election.date} />
                    <InfoItem icon={<Globe size={15} />} text="Online Voting" />
                  </div>
                </div>

                <div className="shrink-0">
                  {election.status === 'Active' && !votedElections.includes(String(election.id)) ? (
                    <Link
                      href={`/voter/dashboard?electionId=${election.id}`}
                      className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold tracking-wide hover:from-blue-500 hover:to-violet-500 transition active:scale-[0.98] shadow-lg shadow-violet-500/25"
                      style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    >
                      Cast Vote
                    </Link>
                  ) : election.status === 'Active' && votedElections.includes(String(election.id)) ? (
                    <button
                      disabled
                      className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-xl bg-green-500/10 text-green-400 text-sm font-semibold border border-green-500/20 cursor-not-allowed"
                      style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    >
                      ✓ Voted
                    </button>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-xl bg-white/5 text-slate-500 text-sm font-medium border border-white/10 cursor-not-allowed"
                      style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    >
                      {election.status === 'Upcoming'
                        ? 'Opens Soon'
                        : 'Closed'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Reusable Components --- */

const MetaTag = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${active
      ? 'bg-green-500/10 border-green-500/20 text-green-400'
      : 'bg-white/5 border-white/10 text-slate-400'
      }`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

const JurisdictionRow = ({ label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl space-y-1" style={{ padding: "14px" }}>
    <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
      {label}
    </div>
    <div className="text-sm text-slate-300" style={{ marginTop: "4px" }}>{value}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-green-500/10 text-green-400 border-green-500/20',
    Upcoming: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Completed: 'bg-slate-500/10 text-slate-400 border-slate-500/20'
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span>{text}</span>
  </div>
);

export default VoterProfile;
