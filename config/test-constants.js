/**
 * Archivo de prueba para verificar que las constantes funcionan
 * Este archivo se puede eliminar después de las pruebas
 */

function testConstants() {
   try {
      console.log("=== PRUEBA DE CONSTANTES ===");

      // Verificar que las constantes están definidas
      console.log(
         "SPREADSHEET_ID:",
         typeof SPREADSHEET_ID !== "undefined"
            ? "✅ Definido"
            : "❌ No definido"
      );
      console.log(
         "TEMPLATE_DOC_ID:",
         typeof TEMPLATE_DOC_ID !== "undefined"
            ? "✅ Definido"
            : "❌ No definido"
      );
      console.log(
         "FOLDER_ID:",
         typeof FOLDER_ID !== "undefined" ? "✅ Definido" : "❌ No definido"
      );

      // Verificar acceso al Spreadsheet
      try {
         const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
         console.log("✅ Acceso a Spreadsheet exitoso");

         // Verificar hojas disponibles
         const sheets = ss.getSheets();
         console.log(
            `📋 Hojas disponibles: ${sheets.map((s) => s.getName()).join(", ")}`
         );

         // Verificar hoja ASIGNATURAS
         const sheetAsignaturas = ss.getSheetByName("ASIGNATURAS");
         if (sheetAsignaturas) {
            const data = sheetAsignaturas.getDataRange().getValues();
            console.log(
               `✅ Hoja ASIGNATURAS encontrada con ${data.length} filas`
            );
         } else {
            console.log("❌ Hoja ASIGNATURAS no encontrada");
         }
      } catch (error) {
         console.log("❌ Error al acceder al Spreadsheet:", error.message);
      }

      console.log("=== FIN DE PRUEBA ===");
      return "Prueba completada";
   } catch (error) {
      console.log("❌ Error en prueba:", error.message);
      return error.message;
   }
}

// Función para verificar que las funciones principales siguen funcionando
function testMainFunctions() {
   try {
      console.log("=== PRUEBA DE FUNCIONES PRINCIPALES ===");

      // Verificar función getCarreras
      try {
         const carreras = getCarreras();
         console.log(
            `✅ getCarreras(): ${carreras.length} carreras encontradas`
         );
      } catch (error) {
         console.log("❌ Error en getCarreras():", error.message);
      }

      // Verificar función cargarDatosSyllabus
      try {
         if (typeof cargarDatosSyllabus === "function") {
            console.log("✅ Función cargarDatosSyllabus disponible");
         } else {
            console.log("❌ Función cargarDatosSyllabus no disponible");
         }
      } catch (error) {
         console.log(
            "❌ Error verificando cargarDatosSyllabus:",
            error.message
         );
      }

      // Verificar función guardarSyllabus
      try {
         if (typeof guardarSyllabus === "function") {
            console.log("✅ Función guardarSyllabus disponible");
         } else {
            console.log("❌ Función guardarSyllabus no disponible");
         }
      } catch (error) {
         console.log("❌ Error verificando guardarSyllabus:", error.message);
      }

      console.log("=== FIN DE PRUEBA ===");
      return "Prueba de funciones completada";
   } catch (error) {
      console.log("❌ Error en prueba de funciones:", error.message);
      return error.message;
   }
}

/**
 * Función para analizar la estructura actual del Spreadsheet
 * Ayuda a entender qué hojas tienes y cómo están organizadas
 */
function analizarEstructuraSpreadsheet() {
   try {
      console.log("=== ANÁLISIS DE ESTRUCTURA DEL SPREADSHEET ===");

      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheets = ss.getSheets();

      console.log(`📊 Total de hojas: ${sheets.length}`);

      sheets.forEach((sheet, index) => {
         const nombre = sheet.getName();
         const data = sheet.getDataRange().getValues();
         const filas = data.length;
         const columnas = data.length > 0 ? data[0].length : 0;

         console.log(`\n📋 Hoja ${index + 1}: "${nombre}"`);
         console.log(`   - Filas: ${filas}`);
         console.log(`   - Columnas: ${columnas}`);

         // Mostrar headers si existen
         if (filas > 0 && columnas > 0) {
            const headers = data[0].slice(0, 5); // Solo primeros 5 headers
            console.log(`   - Headers (primeros 5): ${headers.join(", ")}`);
         }

         // Análisis específico por tipo de hoja
         if (nombre === "ASIGNATURAS") {
            console.log(`   - ✅ Esta es la hoja principal de asignaturas`);
            if (filas > 1) {
               console.log(
                  `   - 📚 Tienes ${filas - 1} asignaturas registradas`
               );
            }
         } else if (nombre === "CONTENIDOS") {
            console.log(`   - 📖 Esta parece ser una hoja de contenidos`);
         } else {
            console.log(`   - ❓ Hoja no identificada - posible carrera`);
         }
      });

      console.log("\n=== RECOMENDACIONES ===");
      console.log('1. La hoja "ASIGNATURAS" es tu hoja principal de datos');
      console.log(
         '2. La hoja "CONTENIDOS" parece ser para contenidos adicionales'
      );
      console.log('3. Para tu plan de "un programa por carrera":');
      console.log("   - Cada carrera debería tener su propia hoja");
      console.log('   - O usar un campo "Carrera" en la hoja ASIGNATURAS');

      console.log("\n=== FIN DE ANÁLISIS ===");
      return "Análisis completado";
   } catch (error) {
      console.log("❌ Error en análisis:", error.message);
      return error.message;
   }
}

/**
 * Función para probar la carga de datos con un código específico
 * @param {string} codigo - Código a probar
 */
function probarCargaEspecifica(codigo) {
   try {
      console.log(`=== PRUEBA DE CARGA: ${codigo} ===`);

      const resultado = cargarDatosSyllabus(codigo);

      if (resultado.success) {
         console.log("✅ Datos cargados exitosamente");
         console.log(
            `📚 Asignatura: ${resultado.data.nombreAsignatura || "N/A"}`
         );
         console.log(`🏫 Facultad: ${resultado.data.facultad || "N/A"}`);
         console.log(`📝 Código: ${resultado.data.codigo || "N/A"}`);
      } else {
         console.log("❌ Error al cargar datos");
         console.log(`💬 Mensaje: ${resultado.message}`);
      }

      console.log("=== FIN DE PRUEBA ===");
      return resultado;
   } catch (error) {
      console.log("❌ Error en prueba:", error.message);
      return { success: false, error: error.message };
   }
}

/**
 * NUEVA FUNCIÓN: Obtener carreras únicas del campo "Carrera"
 * Esta es la función que debería reemplazar getCarreras() actual
 */
function getCarrerasUnicas() {
   try {
      console.log("=== OBTENIENDO CARRERAS ÚNICAS ===");

      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName("ASIGNATURAS");

      if (!sheet) {
         console.log("❌ Hoja ASIGNATURAS no encontrada");
         return [];
      }

      const data = sheet.getDataRange().getValues();
      const headers = data[0];

      // Buscar la columna "Carrera"
      const carreraIndex = headers.findIndex((header) =>
         header.toLowerCase().includes("carrera")
      );

      if (carreraIndex === -1) {
         console.log('❌ Columna "Carrera" no encontrada');
         console.log("📋 Headers disponibles:", headers.join(", "));
         return [];
      }

      console.log(
         `✅ Columna "Carrera" encontrada en posición ${carreraIndex}`
      );

      // Obtener valores únicos de carreras (excluyendo header)
      const carreras = new Set();
      for (let i = 1; i < data.length; i++) {
         const carrera = data[i][carreraIndex];
         if (carrera && carrera.toString().trim() !== "") {
            carreras.add(carrera.toString().trim());
         }
      }

      const carrerasUnicas = Array.from(carreras).sort();

      console.log(`📚 Carreras encontradas: ${carrerasUnicas.length}`);
      carrerasUnicas.forEach((carrera, index) => {
         console.log(`   ${index + 1}. ${carrera}`);
      });

      console.log("=== FIN DE ANÁLISIS ===");
      return carrerasUnicas;
   } catch (error) {
      console.log("❌ Error obteniendo carreras:", error.message);
      return [];
   }
}

/**
 * NUEVA FUNCIÓN: Obtener asignaturas de una carrera específica
 * @param {string} carrera - Nombre de la carrera
 */
function getAsignaturasPorCarrera(carrera) {
   try {
      console.log(`=== ASIGNATURAS DE: ${carrera} ===`);

      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName("ASIGNATURAS");

      if (!sheet) {
         console.log("❌ Hoja ASIGNATURAS no encontrada");
         return [];
      }

      const data = sheet.getDataRange().getValues();
      const headers = data[0];

      // Buscar columnas importantes
      const carreraIndex = headers.findIndex((header) =>
         header.toLowerCase().includes("carrera")
      );
      const codigoIndex = headers.findIndex((header) =>
         header.toLowerCase().includes("código")
      );
      const nombreIndex = headers.findIndex((header) =>
         header.toLowerCase().includes("nombre")
      );

      if (carreraIndex === -1) {
         console.log('❌ Columna "Carrera" no encontrada');
         return [];
      }

      // Filtrar asignaturas por carrera
      const asignaturas = [];
      for (let i = 1; i < data.length; i++) {
         const row = data[i];
         const rowCarrera = row[carreraIndex];

         if (
            rowCarrera &&
            rowCarrera.toString().trim().toLowerCase() === carrera.toLowerCase()
         ) {
            const asignatura = {
               codigo: row[codigoIndex] || "",
               nombre: row[nombreIndex] || "",
               carrera: rowCarrera,
               fila: i + 1,
            };
            asignaturas.push(asignatura);
         }
      }

      console.log(
         `📚 ${asignaturas.length} asignaturas encontradas para ${carrera}`
      );
      asignaturas.slice(0, 5).forEach((asig, index) => {
         console.log(`   ${index + 1}. ${asig.codigo} - ${asig.nombre}`);
      });

      if (asignaturas.length > 5) {
         console.log(`   ... y ${asignaturas.length - 5} más`);
      }

      console.log("=== FIN DE ANÁLISIS ===");
      return asignaturas;
   } catch (error) {
      console.log("❌ Error obteniendo asignaturas:", error.message);
      return [];
   }
}
