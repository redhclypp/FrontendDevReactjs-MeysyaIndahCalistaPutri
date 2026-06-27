import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Soal teknikal minta README mencantumkan username/password untuk login,
// jadi di sini dibuat auth sederhana (hardcoded) sebagai gate sebelum
// masuk ke halaman utama. Untuk technical test ini cukup, TIDAK untuk
// production (jangan pernah hardcode credential beneran kayak gini).
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'admin123';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );
  const [error, setError] = useState('');

  const login = (username, password) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setError('');
      return true;
    }
    setError('Username atau password salah.');
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
