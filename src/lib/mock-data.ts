import { Voter, Candidate, Election, Vote } from "./types";

export const mockVoters: Voter[] = [
  {
    id: "v1",
    name: "Alex Johnson",
    email: "alex@example.com",
    age: 28,
    gender: "Male",
    eligible: true,
    wardNo: "W-12",
    address: "123 Blockchain Ave, District 5",
    jurisdiction: "Metro City Central",
    role: "voter",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@voteblock.com",
    age: 35,
    gender: "Male",
    eligible: true,
    wardNo: "W-01",
    address: "1 Admin Plaza",
    jurisdiction: "Metro City Central",
    role: "admin",
  },
];

export const mockElections: Election[] = [
  {
    id: "e1",
    name: "City Council Election 2026",
    type: "Municipal",
    date: "2026-03-15",
    status: "current",
    jurisdiction: "Metro City Central",
    description: "Vote for your city council representative for the 2026 term.",
  },
  {
    id: "e2",
    name: "State Assembly Election",
    type: "State",
    date: "2026-06-20",
    status: "upcoming",
    jurisdiction: "Metro State",
    description: "State assembly elections for all districts.",
  },
  {
    id: "e3",
    name: "Ward Committee Election",
    type: "Local",
    date: "2026-07-10",
    status: "upcoming",
    jurisdiction: "Ward W-12",
    description: "Election for ward committee members.",
  },
  {
    id: "e4",
    name: "Mayor Election 2025",
    type: "Municipal",
    date: "2025-11-05",
    status: "ended",
    jurisdiction: "Metro City Central",
    description: "Mayoral election for the city of Metro.",
  },
  {
    id: "e5",
    name: "School Board Election 2025",
    type: "Local",
    date: "2025-09-15",
    status: "ended",
    jurisdiction: "Metro City Central",
    description: "School board member elections.",
  },
];

export const mockCandidates: Candidate[] = [
  // Current election e1
  { id: "c1", name: "Maria Santos", party: "Progressive Alliance", photo: "👩‍💼", electionId: "e1" },
  { id: "c2", name: "James Chen", party: "Citizens United", photo: "👨‍💼", electionId: "e1" },
  { id: "c3", name: "Priya Patel", party: "Green Future", photo: "👩‍🔬", electionId: "e1" },
  { id: "c4", name: "David Kim", party: "Independent", photo: "🧑‍💻", electionId: "e1" },
  // Upcoming e2
  { id: "c5", name: "Sarah Williams", party: "Democratic Front", photo: "👩‍⚖️", electionId: "e2" },
  { id: "c6", name: "Robert Brown", party: "People's Party", photo: "👨‍🏫", electionId: "e2" },
  // Upcoming e3
  { id: "c7", name: "Lisa Wang", party: "Community First", photo: "👩‍🏫", electionId: "e3" },
  { id: "c8", name: "Ahmed Ali", party: "Reform Party", photo: "👨‍⚕️", electionId: "e3" },
  // Ended e4
  { id: "c9", name: "John Marshall", party: "Citizens United", photo: "👨‍💼", electionId: "e4" },
  { id: "c10", name: "Elena Rodriguez", party: "Progressive Alliance", photo: "👩‍💼", electionId: "e4" },
  { id: "c11", name: "Tom Baker", party: "Independent", photo: "🧑‍💻", electionId: "e4" },
  // Ended e5
  { id: "c12", name: "Nancy Drew", party: "Education First", photo: "👩‍🏫", electionId: "e5" },
  { id: "c13", name: "Mark Spencer", party: "Reform Party", photo: "👨‍🏫", electionId: "e5" },
];

export const mockVotes: Vote[] = [
  // Ended e4 votes
  { electionId: "e4", candidateId: "c9", voterId: "voter1" },
  { electionId: "e4", candidateId: "c10", voterId: "voter2" },
  { electionId: "e4", candidateId: "c10", voterId: "voter3" },
  { electionId: "e4", candidateId: "c10", voterId: "voter4" },
  { electionId: "e4", candidateId: "c9", voterId: "voter5" },
  { electionId: "e4", candidateId: "c11", voterId: "voter6" },
  { electionId: "e4", candidateId: "c10", voterId: "voter7" },
  { electionId: "e4", candidateId: "c9", voterId: "voter8" },
  { electionId: "e4", candidateId: "c10", voterId: "voter9" },
  { electionId: "e4", candidateId: "c11", voterId: "voter10" },
  // Ended e5 votes
  { electionId: "e5", candidateId: "c12", voterId: "voter1" },
  { electionId: "e5", candidateId: "c12", voterId: "voter2" },
  { electionId: "e5", candidateId: "c13", voterId: "voter3" },
  { electionId: "e5", candidateId: "c12", voterId: "voter4" },
  { electionId: "e5", candidateId: "c13", voterId: "voter5" },
  { electionId: "e5", candidateId: "c12", voterId: "voter6" },
];
