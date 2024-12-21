import { useEffect } from 'react';
import '../styles/alert.css'; // Archivo CSS para los estilos

const Alert = ({ message, type, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration || 3000); // Por defecto, 3 segundos

    return () => clearTimeout(timer); // Limpieza del temporizador
  }, [duration, onClose]);

  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  );
};

export default Alert;
