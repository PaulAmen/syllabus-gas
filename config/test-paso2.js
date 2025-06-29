/**
 * Archivo de prueba para el Paso 2 - Utilidades
 * Verifica que las funciones de utilidad funcionan correctamente
 */

/**
 * Prueba las utilidades de Google Sheets
 */
function testSpreadsheetUtils() {
   try {
      console.log("=== PRUEBA DE UTILIDADES DE SPREADSHEET ===");

      // Prueba 1: Obtener Spreadsheet
      try {
         const ss = getSpreadsheet();
         console.log("✅ getSpreadsheet() funciona");
      } catch (error) {
         console.log("❌ Error en getSpreadsheet():", error.message);
      }

      // Prueba 2: Obtener hoja por nombre
      try {
         const sheet = getSheetByName("ASIGNATURAS");
         if (sheet) {
            console.log("✅ getSheetByName() funciona");
         } else {
            console.log("❌ getSheetByName() no encontró la hoja ASIGNATURAS");
         }
      } catch (error) {
         console.log("❌ Error en getSheetByName():", error.message);
      }

      // Prueba 3: Obtener datos de hoja
      try {
         const data = getSheetData("ASIGNATURAS");
         console.log(
            `✅ getSheetData() funciona - ${data.length} filas obtenidas`
         );
      } catch (error) {
         console.log("❌ Error en getSheetData():", error.message);
      }

      // Prueba 4: Obtener headers
      try {
         const headers = getSheetHeaders("ASIGNATURAS");
         console.log(
            `✅ getSheetHeaders() funciona - ${headers.length} headers obtenidos`
         );
         console.log(
            `📋 Primeros 5 headers: ${headers.slice(0, 5).join(", ")}`
         );
      } catch (error) {
         console.log("❌ Error en getSheetHeaders():", error.message);
      }

      // Prueba 5: Conteo de filas y columnas
      try {
         const rowCount = getSheetRowCount("ASIGNATURAS");
         const colCount = getSheetColumnCount("ASIGNATURAS");
         console.log(`✅ getSheetRowCount() y getSheetColumnCount() funcionan`);
         console.log(`📊 ASIGNATURAS: ${rowCount} filas, ${colCount} columnas`);
      } catch (error) {
         console.log("❌ Error en conteo:", error.message);
      }

      console.log("=== FIN DE PRUEBA SPREADSHEET ===");
      return "Prueba de Spreadsheet completada";
   } catch (error) {
      console.log("❌ Error en prueba de Spreadsheet:", error.message);
      return error.message;
   }
}

/**
 * Prueba las utilidades de procesamiento de datos
 */
function testDataProcessor() {
   try {
      console.log("=== PRUEBA DE PROCESAMIENTO DE DATOS ===");

      // Prueba 1: Mapeo de fila a objeto
      try {
         const headers = ["Código", "Nombre", "Facultad"];
         const rowData = ["MAT101", "Matemáticas", "Ciencias Técnicas"];
         const mapped = mapRowToObject(headers, rowData);

         if (mapped.Código === "MAT101" && mapped.Nombre === "Matemáticas") {
            console.log("✅ mapRowToObject() funciona");
         } else {
            console.log("❌ mapRowToObject() no mapeó correctamente");
         }
      } catch (error) {
         console.log("❌ Error en mapRowToObject():", error.message);
      }

      // Prueba 2: Conversión segura de números
      try {
         const num1 = safeNumberConversion("123", 0);
         const num2 = safeNumberConversion("abc", 0);
         const num3 = safeNumberConversion(null, 5);

         if (num1 === 123 && num2 === 0 && num3 === 5) {
            console.log("✅ safeNumberConversion() funciona");
         } else {
            console.log("❌ safeNumberConversion() no convirtió correctamente");
         }
      } catch (error) {
         console.log("❌ Error en safeNumberConversion():", error.message);
      }

      // Prueba 3: Parseo seguro de JSON
      try {
         const json1 = safeJsonParse('{"test": "value"}', null);
         const json2 = safeJsonParse("invalid json", {});

         if (
            json1 &&
            json1.test === "value" &&
            json2 &&
            Object.keys(json2).length === 0
         ) {
            console.log("✅ safeJsonParse() funciona");
         } else {
            console.log("❌ safeJsonParse() no parseó correctamente");
         }
      } catch (error) {
         console.log("❌ Error en safeJsonParse():", error.message);
      }

      // Prueba 4: Limpieza de strings
      try {
         const clean1 = cleanString("  test  ");
         const clean2 = cleanString("test   with   spaces");

         if (clean1 === "test" && clean2 === "test with spaces") {
            console.log("✅ cleanString() funciona");
         } else {
            console.log("❌ cleanString() no limpió correctamente");
         }
      } catch (error) {
         console.log("❌ Error en cleanString():", error.message);
      }

      // Prueba 5: Validación de campos requeridos
      try {
         const data = { name: "Test", email: "", age: 25 };
         const validation = validateRequiredFields(data, [
            "name",
            "email",
            "age",
         ]);

         if (
            !validation.isValid &&
            validation.missingFields.includes("email")
         ) {
            console.log("✅ validateRequiredFields() funciona");
         } else {
            console.log("❌ validateRequiredFields() no validó correctamente");
         }
      } catch (error) {
         console.log("❌ Error en validateRequiredFields():", error.message);
      }

      console.log("=== FIN DE PRUEBA PROCESAMIENTO ===");
      return "Prueba de procesamiento completada";
   } catch (error) {
      console.log("❌ Error en prueba de procesamiento:", error.message);
      return error.message;
   }
}

/**
 * Prueba las utilidades de HTML
 */
function testHtmlUtils() {
   try {
      console.log("=== PRUEBA DE UTILIDADES HTML ===");

      // Prueba 1: Escape de HTML
      try {
         const escaped = escapeHtml('<script>alert("test")</script>');
         if (escaped.includes("&lt;") && escaped.includes("&gt;")) {
            console.log("✅ escapeHtml() funciona");
         } else {
            console.log("❌ escapeHtml() no escapó correctamente");
         }
      } catch (error) {
         console.log("❌ Error en escapeHtml():", error.message);
      }

      // Prueba 2: Generación de opciones de select
      try {
         const options = [
            { value: "1", text: "Opción 1" },
            { value: "2", text: "Opción 2" },
         ];
         const html = generateSelectOptions(options, "1");

         if (html.includes("selected") && html.includes("Opción 1")) {
            console.log("✅ generateSelectOptions() funciona");
         } else {
            console.log("❌ generateSelectOptions() no generó correctamente");
         }
      } catch (error) {
         console.log("❌ Error en generateSelectOptions():", error.message);
      }

      // Prueba 3: Respuestas JSON
      try {
         const success = createSuccessResponse("Éxito", { data: "test" });
         const error = createErrorResponse("Error", { code: 500 });

         if (success.success && !error.success && success.data && error.data) {
            console.log(
               "✅ createSuccessResponse() y createErrorResponse() funcionan"
            );
         } else {
            console.log(
               "❌ Las funciones de respuesta no funcionaron correctamente"
            );
         }
      } catch (error) {
         console.log("❌ Error en funciones de respuesta:", error.message);
      }

      // Prueba 4: Sanitización de entrada
      try {
         const input = {
            name: "  Test  ",
            email: '<script>alert("xss")</script>',
         };
         const sanitized = sanitizeInput(input, ["name", "email"]);

         if (
            sanitized.name === "Test" &&
            !sanitized.email.includes("<script>")
         ) {
            console.log("✅ sanitizeInput() funciona");
         } else {
            console.log("❌ sanitizeInput() no sanitizó correctamente");
         }
      } catch (error) {
         console.log("❌ Error en sanitizeInput():", error.message);
      }

      console.log("=== FIN DE PRUEBA HTML ===");
      return "Prueba de HTML completada";
   } catch (error) {
      console.log("❌ Error en prueba de HTML:", error.message);
      return error.message;
   }
}

/**
 * Prueba completa del Paso 2
 */
function testPaso2Completo() {
   try {
      console.log("=== PRUEBA COMPLETA DEL PASO 2 ===");

      const resultados = [];

      // Probar utilidades de Spreadsheet
      try {
         const resultado1 = testSpreadsheetUtils();
         resultados.push(`Spreadsheet: ${resultado1}`);
      } catch (error) {
         resultados.push(`Spreadsheet: ❌ ${error.message}`);
      }

      // Probar procesamiento de datos
      try {
         const resultado2 = testDataProcessor();
         resultados.push(`Datos: ${resultado2}`);
      } catch (error) {
         resultados.push(`Datos: ❌ ${error.message}`);
      }

      // Probar utilidades HTML
      try {
         const resultado3 = testHtmlUtils();
         resultados.push(`HTML: ${resultado3}`);
      } catch (error) {
         resultados.push(`HTML: ❌ ${error.message}`);
      }

      console.log("\n=== RESUMEN DE RESULTADOS ===");
      resultados.forEach((resultado) => {
         console.log(resultado);
      });

      console.log("\n=== FIN DE PRUEBA COMPLETA ===");
      return "Prueba completa del Paso 2 finalizada";
   } catch (error) {
      console.log("❌ Error en prueba completa:", error.message);
      return error.message;
   }
}
