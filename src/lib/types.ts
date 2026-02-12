export interface Voter {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  eligible: boolean;
  wardNo: string;
  address: string;
  jurisdiction: string;
  role: "voter" | "admin";
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  photo: string;
  electionId: string;
}

export type ElectionStatus = "upcoming" | "current" | "ended";

export interface Election {
  id: string;
  name: string;
  type: string;
  date: string;
  status: ElectionStatus;
  jurisdiction: string;
  description: string;
}

export interface Vote {
  electionId: string;
  candidateId: string;
  voterId: string;
}
