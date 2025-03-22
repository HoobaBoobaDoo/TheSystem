import React, { useState, createContext } from 'react';

interface Goal {
  id: string;
  title: string;
  target: number;
  progress: number;
}

interface AppContextType {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  exp: number;
  setExp: (exp: number) => void;
  rank: string;
  setRank: (rank: string) => void;
}

export const AppContext = createContext<AppContextType>({
  goals: [],
  setGoals: () => {},
  exp: 0,
  setExp: () => {},
  rank: 'F',
  setRank: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: '50 push-ups', target: 50, progress: 0 },
    { id: '2', title: '2000 stappen', target: 2000, progress: 0 },
  ]);
  const [exp, setExp] = useState(0);
  const [rank, setRank] = useState('F');

  return (
    <AppContext.Provider value={{ goals, setGoals, exp, setExp, rank, setRank }}>
      {children}
    </AppContext.Provider>
  );
};