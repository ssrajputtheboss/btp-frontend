import { useState } from 'react';

export function useAuth() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  function setTokenAndUser(token, user) {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }
  return { token, user, setTokenAndUser, signOut };
}
