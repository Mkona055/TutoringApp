import { useState } from 'react';
import {jwtDecode} from 'jwt-decode';


const useAuth = () => {  
  
  const handleDecode = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authUser, setAuthUser] = useState(token ? handleDecode(token) : null);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setAuthUser(handleDecode(token));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  

  return { authUser, token, login, logout, isAuthenticated };
};

export default useAuth;
