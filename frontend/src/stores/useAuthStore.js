import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    const now = Date.now() / 1000;
    return exp < now;
  } catch (e) {
    console.log(e.message)
    return true;
  }
}

export const useAuthStore = create((set) => {
  const token = localStorage.getItem('token');
  let user = null;

  if (token && !isTokenExpired(token)) {
    const decode = jwtDecode(token);
    user = {
      id: decode.id,
      email: decode.email,
      rol: decode.rol
    };
  } else {
    localStorage.removeItem('token')
  }

  return {
    token: token && !isTokenExpired(token) ? token : null,
    user,

    login: (token) => {
      localStorage.setItem('token', token);
      const decode = jwtDecode(token);
      set({
        token,
        user: {
          id: decode.id,
          email: decode.email,
          rol: decode.rol
        },
      });
    },

    logout: () => {
      localStorage.removeItem('token');
      set({ token: null, user: null });
    },
  }
})