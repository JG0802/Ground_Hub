// src/stores/useTeamStore.js
import { create } from 'zustand';

const useTeamStore = create((set) => ({
  teams: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('teams')) || []
    : [],

  addTeam: (team) =>
    set((state) => {
      const updated = [...state.teams, team];
      if (typeof window !== 'undefined') {
        localStorage.setItem('teams', JSON.stringify(updated));
      }
      return { teams: updated };
    }),

  deleteTeam: (id) =>
    set((state) => {
      const updated = state.teams.filter((t) => t.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('teams', JSON.stringify(updated));
      }
      return { teams: updated };
    }),

  setTeams: (teams) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('teams', JSON.stringify(teams));
    }
    set({ teams });
  },
}));

export default useTeamStore;
