// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Obtenemos el estado de autenticación
  console.log('Estado del usuario en ProtectedRoute:', user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children; // Si el usuario está autenticado, mostramos el contenido
};

export default ProtectedRoute;
