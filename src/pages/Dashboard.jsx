import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import side from "../assets/side.jpg";
import perfil from "../assets/Perlita.jpg";
import logo from "../assets/logo.png"
import "../styles/dashboard.css"

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
        <Link to="/calender"> <li className="p-4 hover:bg-teal-900 cursor-pointer">Calendario</li> </Link>
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
  
     <img
            src={logo}
            alt="Logo"
            className="w-20 h-15 mx-auto rounded-full shadow-lg shadow-gray-500/50 "
          />
    <h2 className="blume">Blume - Tech</h2>
    <div className="grid grid-cols-2 gap-4">
  
  <button className=" flex flex-col items-center bg-blue-500 p-4 rounded-lg shadow-lg  shadow-gray-500/50">
    <img src="imagen1.jpg" alt="Imagen 1" className="w-16 h-16 mb-2"/>
    <span className="text-white">Botón 1</span>
  </button>

  <button className="flex flex-col items-center bg-blue-500 p-4 rounded-lg shadow-lg shadow-gray-500/50 ">
    <img src="imagen2.jpg" alt="Imagen 2" className="w-16 h-16 mb-2"/>
    <span className="text-white">Botón 2</span>
  </button>


  <button className="flex flex-col items-center bg-blue-500 p-4 rounded-lg shadow-lg shadow-gray-500/50">
    <img src="imagen3.jpg" alt="Imagen 3" className="w-16 h-16 mb-2"/>
    <span className="text-white">Botón 3</span>
  </button>

  <button className="flex flex-col items-center bg-blue-500 p-4 rounded-lg shadow-lg shadow-gray-500/50">
    <img src="imagen4.jpg" alt="Imagen 4" className="w-16 h-16 mb-2"/>
    <span className="text-white">Botón 4</span>
  </button>
</div>
  
  </div>

</div>

  );
}

export default Dashboard;
