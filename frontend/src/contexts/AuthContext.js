import React, { createContext, useState, useContext } from 'react';

// Criando o contexto de autenticação
export const AuthContext = createContext();

// Criando o provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);