import { useState } from 'react';

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (token) => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return { loggedIn, login, logout, isAuthenticated };
};

export default useAuth;
