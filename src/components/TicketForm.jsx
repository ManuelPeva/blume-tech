import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import logo from "../assets/logo.png";
import confetti from "canvas-confetti";
import { useRef } from "react";
import html2pdf from "html2pdf.js"; // Importamos html2pdf.js
import { useNavigate } from "react-router-dom";
import "../styles/ticketForm.css";

function TicketForm() {
  const navigate = useNavigate(); // Crear el hook de navegación
  // Estado para almacenar múltiples imágenes
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    costo: "",
    description: "",
    images: [],
    signature: null,
  });

  const signatureRef = React.useRef();
  const formRef = useRef();
  const [loading, setLoading] = useState(false); // Estado para mostrar el loader

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "costo" ? (value === "" ? "" : parseFloat(value)) : value,
    });
  };

  // Función para manejar la carga de imágenes
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convertimos los archivos seleccionados en un arreglo
    const newImages = files.map((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]); // Agregamos la imagen cargada al estado
      };
      reader.readAsDataURL(file); // Leemos cada archivo como URL base64
    });
  };

  // Manejo de firma
  const handleClearSignature = () => signatureRef.current.clear();

  const handleSaveSignature = () => {
    setFormData({
      ...formData,
      signature: signatureRef.current.getTrimmedCanvas().toDataURL("image/png"),
    });
  };

  // Función para generar el PDF usando html2pdf.js
  const generatePDF = () => {
    // Ocultar los botones antes de generar el PDF
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.classList.add("hide-buttons"));
    // Capturar el contenido del formulario
    const element = formRef.current;

    // Configuración de html2pdf.js
    const opt = {
      margin: 0,
      filename: "ticket-servicio.pdf",
      image: { type: "jpeg", quality: 0.99 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generar el PDF
    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        // Restaurar los botones después de generar el PDF
        buttons.forEach((button) => button.classList.remove("hide-buttons"));
      });
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket Data:", formData);
    // Aquí puedes enviar los datos al backend o almacenarlos en el contexto global
    // Aquí se lanza el confeti
    confetti({
      particleCount: 100, // Número de partículas de confeti
      spread: 70, // Ángulo de dispersión
      origin: { x: 0.5, y: 0.5 }, // Centro de la pantalla
    });

    // Aquí podrías agregar el resto de la lógica de tu botón
    console.log("Ticket Generado");

    //generador pdf
    generatePDF();
  };

  // Función para borrar todo el contenido del formulario
  const handleClearForm = () => {
    setLoading(true); // Mostrar el loader

    // Simula un proceso de eliminación (puedes reemplazarlo con un proceso real)
    setTimeout(() => {
      setFormData({
        name: "",
        costo: "",
        description: "",
        signature: null,
      });
      setImages([]); // Limpiar las imágenes
      setLoading(false); // Ocultar el loader después del proceso
    }, 3000); // Simular 2 segundos de carga
  };

  // Función para regresar a /dashboard
  const handleGoBack = () => {
    navigate("/dashboard"); // Redirige específicamente a /dashboard
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md bg-gradient-to-br from-gray-100 bg-cyan-00"
      ref={formRef}
    >
      <img
        src={logo}
        alt="Logo"
        className="w-25 h-20 mx-auto rounded-full shadow-lg shadow-gray-500/50"
      />
      <h2 className="size">Blume - Tech</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Nombre del Cliente o Negocio:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="texto margen w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blumecolor"
              placeholder="Ingrese su nombre"
              required
            />
          </div>

          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Costo:
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg">
              {/* Símbolo $ */}
              <span className="px-4 py-2 text-gray-500">$</span>
              <input
                type="number"
                name="costo"
                value={formData.costo}
                onChange={handleChange}
                className="texto w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blumecolor"
                placeholder="Ingrese el costo"
                required
              />
            </div>
          </div>

          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Descripción del Problema:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blumecolor"
              placeholder="Describa el problema"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Imágen:
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
          rounded-lg cursor-pointer
          border border-gray-300 shadow-sm
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:bg-blumecolor file:text-white
          hover:file:bg-blumecolor3
          focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            {/* Mostrar las imágenes cargadas */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    src={image}
                    alt={`Imagen cargada ${index}`}
                    className="w-full max-w-md rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Firma del Cliente:
            </label>
            <div className="border border-gray-300 rounded-lg p-4">
              <SignatureCanvas
                ref={signatureRef}
                penColor="black"
                canvasProps={{
                  className: "w-full h-40",
                }}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={handleClearSignature}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  onClick={handleSaveSignature}
                  className="ml-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white bg-blumecolor rounded-lg hover:bg-blumecolor3 focus:ring focus:ring-blue-300"
          >
            Generar Ticket
          </button>
        </div>
        
         {/* Botón para regresar */}
         <div className="mt-6">
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full px-4 py-2 text-white bg-blumecolor3 rounded-lg hover:bg-blumecolor focus:ring focus:ring-blue-300"
          >
            Regresar
          </button>
        </div>
        {/* Botón para borrar todo el contenido */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleClearForm} // Llamar a la función de limpiar
            className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Borrar Todo
          </button>
        </div>
      </form>
      {/* Pantalla de carga (loader) */}
      {loading && (
        <div className="loader-container fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 bg-gray-900">
          <span className="loader">Deleting</span>
        </div>
      )}
    </div>
  );
}

export default TicketForm;
