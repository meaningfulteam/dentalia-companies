document.addEventListener("DOMContentLoaded", async () => {
  let data = [];
  const [key, id] = ["Compañia final", "#autoComplete"];
  const dataSrc =
    "https://cdn.jsdelivr.net/gh/meaningfulteam/dentalia-companies@main/src/data.json";

  const input = document.querySelector(id);
  const searchButton = document.querySelector("#searchButton");
  const textarea = document.querySelector("#content");

  try {
    const response = await fetch(dataSrc);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    data = await response.json();
    
    // Extraer los valores únicos de "Compañia final" para la lista de sugerencias
    const uniqueCompanies = [...new Set(data.map(item => item[key]))];
    
    // Inicializar Awesomplete
    if (typeof Awesomplete !== 'undefined') {
      const awesomplete = new Awesomplete(input, {
        list: uniqueCompanies,
        minChars: 1,
        maxItems: 5,
        autoFirst: true
      });
      
      // Manejar la selección
      input.addEventListener('awesomplete-selectcomplete', function(e) {
        console.log('Selección completada:', e.text);
      });
    } else {
      console.error("Awesomplete no está disponible");
    }

    // Agregar funcionalidad al botón de búsqueda
    searchButton.addEventListener('click', () => {
      const searchTerm = input.value.trim();
      const companyExists = data.some(item => 
        item[key].toLowerCase() === searchTerm.toLowerCase()
      );
      
      textarea.value = companyExists ? "disponible" : "no disponible";
    });
  } catch (e) {
    console.error("Error cargando datos:", e);
  }
});
