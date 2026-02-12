import React, { createContext, useContext, useState, ReactNode } from "react";
import { Election, Candidate, Vote } from "@/lib/types";
import { mockElections, mockCandidates, mockVotes } from "@/lib/mock-data";

interface VoteContextType {
  elections: Election[];
  candidates: Candidate[];
  votes: Vote[];
  castVote: (electionId: string, candidateId: string, voterId: string) => void;
  hasVoted: (electionId: string, voterId: string) => boolean;
  getResultsForElection: (electionId: string) => { candidateId: string; name: string; party: string; votes: number }[];
  addElection: (election: Election) => void;
  updateElection: (id: string, updates: Partial<Election>) => void;
  deleteElection: (id: string) => void;
  addCandidate: (candidate: Candidate) => void;
  deleteCandidate: (id: string) => void;
}

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export function VoteProvider({ children }: { children: ReactNode }) {
  const [elections, setElections] = useState<Election[]>(mockElections);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [votes, setVotes] = useState<Vote[]>(mockVotes);

  const castVote = (electionId: string, candidateId: string, voterId: string) => {
    setVotes((prev) => [...prev, { electionId, candidateId, voterId }]);
  };

  const hasVoted = (electionId: string, voterId: string) => {
    return votes.some((v) => v.electionId === electionId && v.voterId === voterId);
  };

  const getResultsForElection = (electionId: string) => {
    const electionCandidates = candidates.filter((c) => c.electionId === electionId);
    return electionCandidates.map((c) => ({
      candidateId: c.id,
      name: c.name,
      party: c.party,
      votes: votes.filter((v) => v.electionId === electionId && v.candidateId === c.id).length,
    }));
  };

  const addElection = (election: Election) => setElections((prev) => [...prev, election]);
  const updateElection = (id: string, updates: Partial<Election>) =>
    setElections((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  const deleteElection = (id: string) => setElections((prev) => prev.filter((e) => e.id !== id));
  const addCandidate = (candidate: Candidate) => setCandidates((prev) => [...prev, candidate]);
  const deleteCandidate = (id: string) => setCandidates((prev) => prev.filter((c) => c.id !== id));

  return (
    <VoteContext.Provider
      value={{
        elections,
        candidates,
        votes,
        castVote,
        hasVoted,
        getResultsForElection,
        addElection,
        updateElection,
        deleteElection,
        addCandidate,
        deleteCandidate,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
}

export function useVote() {
  const ctx = useContext(VoteContext);
  if (!ctx) throw new Error("useVote must be used within VoteProvider");
  return ctx;
}
