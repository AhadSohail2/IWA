import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userRole: null,
  userName: null,
  token: null,
  login: () => { },
  logout: () => { }
});
