import { createContext, useContext, useState } from "react";

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Cargar el usuario desde localStorage si existe
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );
  
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser)); // Guardar el usuario en localStorage
      return true; // Login exitoso
    }
  
    return false; // Credenciales inválidas
  };

  const register = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (storedUsers.some((u) => u.email === email)) {
      return false; // Usuario ya registrado
    }

    const newUser = { email, password };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers)); // Guardar usuarios en localStorage
    return true; // Registro exitoso
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Limpiar el usuario del localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
