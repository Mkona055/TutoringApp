import { useState } from 'react';
import jwt_decode from 'jwt-decode';

const useAuth = () => {
  const [token, setToken] = useState(false);
  const [authUser, setAuthUser] = useState(false);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  const handleDecode = () => {
    try {
      const decoded = jwt_decode(jwtToken);
      setAuthUser(decoded);
    } catch (error) {
      console.error('Error decoding token:', error.message);
      setAuthUser(null);
    }
  }
  

  return { token, login, logout, isAuthenticated };
};

export default useAuth;
