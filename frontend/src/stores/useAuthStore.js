import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),

  login: (token) => {
    localStorage.setItem('token', token);
    const decode = jwtDecode(token);
    set({
      token,
      user: {
        id: decode.id,
        email: decode.email,
        rol: decode.rol
      }
    })
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },

  setUser: (user) => set({ user })
}))