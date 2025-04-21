const fs = require("fs");
const csv = require("csv-parse/sync");

// Leer el archivo CSV
const csvFilePath = "./src/data.csv";
const jsonFilePath = "./src/data.json";

try {
  // Leer el contenido del archivo CSV
  const fileContent = fs.readFileSync(csvFilePath, "utf-8");

  // Parsear el CSV a un array de objetos
  const rawData = csv.parse(fileContent, {
    columns: true, // Usa la primera fila como nombres de columnas
    skip_empty_lines: true,
  });

  const unique = [...new Set(rawData.map((item) => item["Compañia final"]))];

  const records = unique.map((item) => {
    return {
      name: item,
    };
  });

  // Asegurarse de que el directorio src existe
  if (!fs.existsSync("./src")) {
    fs.mkdirSync("./src");
  }

  // Escribir el resultado en data.json
  fs.writeFileSync(jsonFilePath, JSON.stringify(records, null, 2));

  console.log("Conversión completada exitosamente!");
  console.log(`Los datos han sido guardados en ${jsonFilePath}`);
} catch (error) {
  console.error("Error durante la conversión:", error.message);
}
