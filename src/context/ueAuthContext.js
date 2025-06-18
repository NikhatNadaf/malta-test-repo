import { create } from "zustand";

export const useAuthState = create((set) => ({
  session: null,
  user: null,
  showLogoutModal: false,
  setSession: (session) => set((state) => ({ ...state, session })),
  setUser: (user) => set((state) => ({ ...state, user })),

  onToggleLogoutModal: () =>
    set((state) => ({ ...state, showLogoutModal: !state.showLogoutModal })),
}));
