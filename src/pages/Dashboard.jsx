import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import side from "../assets/side.jpg";
import perfil from "../assets/Perlita.jpg";
import Contenido from "../components/Contenido";
import TicketForm from "../components/TicketForm";


function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Verificamos si el usuario existe, si no, redirigimos al login
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirigir al login después de cerrar sesión
  };

  if (!user) {
    // Si no hay usuario, no mostrar el contenido del dashboard
    return null; // Esto previene que el contenido del dashboard se muestre si no hay usuario
  }

  return (
    <div className="relative">
  {/*Boton hamburguesa*/}
  <button
    className="p-3 text-white bg-blumecolor rounded-md focus:outline-none fixed top-4 right-4 z-50"
    onClick={toggleSidebar}
  >
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>

  {/* Sidebar */}
  <div
    className={`fixed top-0 left-0 h-full text-white transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 ease-in-out w-64 bg-cover bg-center`}
    style={{ backgroundImage: `url(${side})` }}
  >
    {/* Contenedor Principal del Sidebar */}
    <div className="flex flex-col h-full">
      {/* Foto de Perfil y Título */}
      <div className="p-4 text-center">
        <img
          src={perfil} // Reemplaza con el enlace de la foto
          alt="Foto de Perfil"
          className="w-24 h-24 mx-auto rounded-full border-2 border-white"
        />
        <div className="mt-4 text-lg font-bold border-b border-teal-900 tracking-wider">
          Blume Tech
        </div>
      </div>

      {/* Menú de Opciones */}
      <ul className="mt-4 flex-grow">
        <Link to="/tiket"> <li className="p-4 hover:bg-teal-900 cursor-pointer">Generar ticket</li> </Link>
        <li className="p-4 hover:bg-teal-900 cursor-pointer">Perfil</li>
        <li className="p-4 hover:bg-teal-900 cursor-pointer">Configuración</li>
      </ul>

      {/* Botón Cerrar Sesión */}
      <div className="p-4 border-t border-white-700">
        <button
          onClick={handleLogout}
          className="w-full p-2 text-center bg-red-600 hover:bg-red-700 rounded-md"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Footer */}
      <footer className="p-4 border-t border-white-700 text-center">
        <span className="text-sm">&copy; 2025 Manuel Peva</span>
      </footer>
    </div>
  </div>

  {/* Contenido Principal */}
  <div className={`ml-0 md:ml-${isOpen ? '64' : '0'} p-4 transition-all duration-300`}>
    <h1 className="text-2xl font-bold">Bienvenido a la página principal</h1>
    <p>Este es el contenido principal de la página.</p>
  
  </div>

</div>
  );
}

export default Dashboard;
