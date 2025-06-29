/**
 * Archivo de prueba para el Paso 3 - Servicios
 * Verifica que los servicios de negocio funcionan correctamente
 */

/**
 * Prueba las funciones principales del servicio de Syllabus
 */
function testSyllabusService() {
   try {
      console.log("=== PRUEBA DE SERVICIO DE SYLLABUS ===");

      // Prueba 1: Obtener carreras
      try {
         const carreras = getCarreras();
         console.log(
            `✅ getCarreras() funciona - ${carreras.length} carreras encontradas`
         );
         console.log(`📋 Carreras: ${carreras.join(", ")}`);
      } catch (error) {
         console.log("❌ Error en getCarreras():", error.message);
      }

      // Prueba 2: Cargar datos de syllabus (con un código que sabemos que existe)
      try {
         // Obtener un código real de la base de datos
         const data = getSheetData("ASIGNATURAS");
         if (data.length > 1) {
            const codigoPrueba = data[1][0]; // Primer código en la base de datos
            console.log(`🔍 Probando con código: ${codigoPrueba}`);

            const resultado = cargarDatosSyllabus(codigoPrueba);

            if (resultado.success) {
               console.log("✅ cargarDatosSyllabus() funciona");
               console.log(
                  `📚 Asignatura cargada: ${
                     resultado.data.nombreAsignatura || "N/A"
                  }`
               );
            } else {
               console.log(
                  "❌ cargarDatosSyllabus() falló:",
                  resultado.message
               );
            }
         } else {
            console.log("⚠️ No hay datos en la hoja ASIGNATURAS para probar");
         }
      } catch (error) {
         console.log("❌ Error en cargarDatosSyllabus():", error.message);
      }

      // Prueba 3: Validar datos requeridos
      try {
         const datosCompletos = {
            codigo: "TEST001",
            nombreAsignatura: "Asignatura de Prueba",
         };

         const datosIncompletos = {
            codigo: "TEST002",
            // Falta nombreAsignatura
         };

         const validation1 = validateRequiredFields(datosCompletos, [
            "codigo",
            "nombreAsignatura",
         ]);
         const validation2 = validateRequiredFields(datosIncompletos, [
            "codigo",
            "nombreAsignatura",
         ]);

         if (validation1.isValid && !validation2.isValid) {
            console.log("✅ Validación de campos requeridos funciona");
         } else {
            console.log(
               "❌ Validación de campos requeridos no funciona correctamente"
            );
         }
      } catch (error) {
         console.log("❌ Error en validación:", error.message);
      }

      // Prueba 4: Crear respuestas de éxito y error
      try {
         const successResponse = createSuccessResponse("Operación exitosa", {
            data: "test",
         });
         const errorResponse = createErrorResponse("Error de prueba", {
            code: 500,
         });

         if (successResponse.success && !errorResponse.success) {
            console.log("✅ Funciones de respuesta funcionan correctamente");
         } else {
            console.log("❌ Funciones de respuesta no funcionan correctamente");
         }
      } catch (error) {
         console.log("❌ Error en funciones de respuesta:", error.message);
      }

      console.log("=== FIN DE PRUEBA DE SERVICIO ===");
      return "Prueba de servicio completada";
   } catch (error) {
      console.log("❌ Error en prueba de servicio:", error.message);
      return error.message;
   }
}

/**
 * Prueba la integración con las utilidades
 */
function testIntegracionUtilidades() {
   try {
      console.log("=== PRUEBA DE INTEGRACIÓN CON UTILIDADES ===");

      // Prueba 1: Verificar que las utilidades están disponibles
      const utilidadesRequeridas = [
         "getSpreadsheet",
         "getSheetByName",
         "getSheetData",
         "createSheetIfNotExists",
         "appendSheetRow",
         "validateRequiredFields",
         "createSuccessResponse",
         "createErrorResponse",
      ];

      let todasDisponibles = true;
      utilidadesRequeridas.forEach((util) => {
         if (typeof this[util] !== "function") {
            console.log(`❌ Utilidad ${util} no disponible`);
            todasDisponibles = false;
         }
      });

      if (todasDisponibles) {
         console.log("✅ Todas las utilidades requeridas están disponibles");
      }

      // Prueba 2: Verificar acceso a datos
      try {
         const data = getSheetData("ASIGNATURAS");
         const headers = getSheetHeaders("ASIGNATURAS");

         console.log(
            `✅ Acceso a datos funciona - ${data.length} filas, ${headers.length} columnas`
         );
      } catch (error) {
         console.log("❌ Error en acceso a datos:", error.message);
      }

      // Prueba 3: Verificar manejo de errores
      try {
         const resultado = cargarDatosSyllabus(""); // Código vacío

         if (!resultado.success) {
            console.log("✅ Manejo de errores funciona correctamente");
         } else {
            console.log("❌ Manejo de errores no funciona correctamente");
         }
      } catch (error) {
         console.log("❌ Error en manejo de errores:", error.message);
      }

      console.log("=== FIN DE PRUEBA DE INTEGRACIÓN ===");
      return "Prueba de integración completada";
   } catch (error) {
      console.log("❌ Error en prueba de integración:", error.message);
      return error.message;
   }
}

/**
 * Prueba completa del Paso 3
 */
function testPaso3Completo() {
   try {
      console.log("=== PRUEBA COMPLETA DEL PASO 3 ===");

      const resultados = [];

      // Probar servicio de Syllabus
      try {
         const resultado1 = testSyllabusService();
         resultados.push(`Servicio: ${resultado1}`);
      } catch (error) {
         resultados.push(`Servicio: ❌ ${error.message}`);
      }

      // Probar integración con utilidades
      try {
         const resultado2 = testIntegracionUtilidades();
         resultados.push(`Integración: ${resultado2}`);
      } catch (error) {
         resultados.push(`Integración: ❌ ${error.message}`);
      }

      console.log("\n=== RESUMEN DE RESULTADOS ===");
      resultados.forEach((resultado) => {
         console.log(resultado);
      });

      console.log("\n=== FIN DE PRUEBA COMPLETA ===");
      return "Prueba completa del Paso 3 finalizada";
   } catch (error) {
      console.log("❌ Error en prueba completa:", error.message);
      return error.message;
   }
}

/**
 * Prueba específica de carga de datos con código real
 * @param {string} codigo - Código a probar
 */
function probarCargaConCodigoReal(codigo) {
   try {
      console.log(`=== PRUEBA DE CARGA CON CÓDIGO: ${codigo} ===`);

      const resultado = cargarDatosSyllabus(codigo);

      if (resultado.success) {
         console.log("✅ Carga exitosa");
         console.log(
            `📚 Asignatura: ${resultado.data.nombreAsignatura || "N/A"}`
         );
         console.log(`🏫 Facultad: ${resultado.data.facultad || "N/A"}`);
         console.log(`📝 Código: ${resultado.data.codigo || "N/A"}`);
      } else {
         console.log("❌ Error en carga:", resultado.message);
      }

      console.log("=== FIN DE PRUEBA ===");
      return resultado;
   } catch (error) {
      console.log("❌ Error en prueba:", error.message);
      return { success: false, error: error.message };
   }
}
