import '../styles/contenido.css'

function Contenido() {
  const sections = [
    {
      title: "Generar Ticket",
      description: "Crea y administra tickets o facturas de pago.",
      img: "https://cdn.icon-icons.com/icons2/3053/PNG/512/pdf_reader_pro_macos_bigsur_icon_189857.png",
    },
    {
      title: "Comandos en Windows",
      description: "Accede a guías rápidas de comandos útiles para Windows.",
      img: "https://concepto.de/wp-content/uploads/2018/09/sjfogvgbk-e1537188132616.jpg",
    },
    {
      title: "Historial de Tickets",
      description:
        "Consulta las cantidades y estadísticas de tickets realizados.",
      img: "https://via.placeholder.com/150",
    },
    {
      title: "Atajos en macOS",
      description: "Descubre combinaciones clave y atajos en Mac.",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 efecto">
          Blume - Tech Soporte Técnico
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={section.img}
                alt={section.title}
                className="w-full h-50 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700 card-text">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-500 card-descrip">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contenido;
