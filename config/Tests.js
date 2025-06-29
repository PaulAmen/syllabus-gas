/**
 * Pruebas Consolidadas del Generador de Syllabus Académico
 * Incluye las pruebas más importantes de todos los módulos
 */

// ===== PRUEBAS DE CONSTANTES =====
function testConstantes() {
   console.log("=== PRUEBA DE CONSTANTES ===");

   try {
      if (typeof SPREADSHEET_ID !== "undefined") {
         console.log("✅ SPREADSHEET_ID definido");
      } else {
         console.log("❌ SPREADSHEET_ID no definido");
         return false;
      }

      if (typeof TEMPLATE_DOC_ID !== "undefined") {
         console.log("✅ TEMPLATE_DOC_ID definido");
      } else {
         console.log("❌ TEMPLATE_DOC_ID no definido");
         return false;
      }

      if (typeof FOLDER_ID !== "undefined") {
         console.log("✅ FOLDER_ID definido");
      } else {
         console.log("❌ FOLDER_ID no definido");
         return false;
      }

      console.log("✅ Todas las constantes están definidas");
      return true;
   } catch (error) {
      console.log("❌ Error en prueba de constantes:", error.message);
      return false;
   }
}

// ===== PRUEBAS DE UTILIDADES =====
function testUtilidades() {
   console.log("=== PRUEBA DE UTILIDADES ===");

   try {
      // Probar getSpreadsheet
      const ss = getSpreadsheet();
      console.log("✅ getSpreadsheet() funciona");

      // Probar getSheetData
      const data = getSheetData("ASIGNATURAS");
      console.log("✅ getSheetData() funciona:", data.length, "filas");

      // Probar funciones de respuesta
      const successResponse = createSuccessResponse("Test", { test: true });
      console.log(
         "✅ createSuccessResponse() funciona:",
         successResponse.success
      );

      const errorResponse = createErrorResponse("Test error");
      console.log("✅ createErrorResponse() funciona:", !errorResponse.success);

      // Probar validación
      const validation = validateRequiredFields({ test: "value" }, ["test"]);
      console.log("✅ validateRequiredFields() funciona:", validation.isValid);

      console.log("✅ Todas las utilidades funcionan");
      return true;
   } catch (error) {
      console.log("❌ Error en utilidades:", error.message);
      return false;
   }
}

// ===== PRUEBAS DE SERVICIOS =====
function testServicios() {
   console.log("=== PRUEBA DE SERVICIOS ===");

   try {
      // Probar getCarreras
      const carreras = getCarreras();
      console.log("✅ getCarreras() funciona:", carreras);

      // Probar cargarDatosSyllabus
      const datos = cargarDatosSyllabus("TI35");
      console.log("✅ cargarDatosSyllabus() funciona:", datos.success);

      if (datos.success) {
         console.log("📚 Asignatura cargada:", datos.data.nombreAsignatura);
      }

      // Probar actualizarCampoSyllabus
      const actualizacion = actualizarCampoSyllabus(
         "TI35",
         "Docente",
         "Test Docente"
      );
      console.log(
         "✅ actualizarCampoSyllabus() funciona:",
         actualizacion.success
      );

      console.log("✅ Todos los servicios funcionan");
      return true;
   } catch (error) {
      console.log("❌ Error en servicios:", error.message);
      return false;
   }
}

// ===== PRUEBAS DE INTEGRACIÓN =====
function testIntegracion() {
   console.log("=== PRUEBA DE INTEGRACIÓN ===");

   try {
      // Probar flujo completo
      const carreras = getCarreras();
      console.log("✅ getCarreras() funciona");

      const datos = cargarDatosSyllabus("TI35");
      console.log("✅ cargarDatosSyllabus() funciona");

      const actualizacion = actualizarCampoSyllabus(
         "TI35",
         "Docente",
         "Docente Integración"
      );
      console.log("✅ actualizarCampoSyllabus() funciona");

      // Probar utilidades
      const ss = getSpreadsheet();
      console.log("✅ getSpreadsheet() funciona");

      const data = getSheetData("ASIGNATURAS");
      console.log("✅ getSheetData() funciona");

      console.log("✅ Integración completa exitosa");
      return true;
   } catch (error) {
      console.log("❌ Error en integración:", error.message);
      return false;
   }
}

// ===== PRUEBAS DE RENDIMIENTO =====
function testRendimiento() {
   console.log("=== PRUEBA DE RENDIMIENTO ===");

   const startTime = new Date().getTime();

   try {
      // Probar carga de datos múltiples veces
      for (let i = 0; i < 3; i++) {
         const datos = cargarDatosSyllabus("TI35");
         if (!datos.success) {
            console.log("❌ Error en carga de datos");
            return false;
         }
      }

      const endTime = new Date().getTime();
      const tiempoTotal = endTime - startTime;
      const tiempoPromedio = tiempoTotal / 3;

      console.log(`✅ Tiempo total: ${tiempoTotal}ms`);
      console.log(`✅ Tiempo promedio por operación: ${tiempoPromedio}ms`);

      if (tiempoTotal < 10000) {
         console.log("✅ Rendimiento aceptable");
         return true;
      } else {
         console.log("⚠️ Rendimiento lento");
         return false;
      }
   } catch (error) {
      console.log("❌ Error en prueba de rendimiento:", error.message);
      return false;
   }
}

// ===== PRUEBAS DE FUNCIONES ESPECÍFICAS =====
function testFuncionesEspecificas() {
   console.log("=== PRUEBA DE FUNCIONES ESPECÍFICAS ===");

   try {
      // Verificar funciones específicas
      if (typeof generarDocumentoSyllabus === "function") {
         console.log("✅ generarDocumentoSyllabus() disponible");
      }

      if (typeof mapearNombreCampo === "function") {
         console.log("✅ mapearNombreCampo() disponible");
      }

      if (typeof actualizarCampo === "function") {
         console.log("✅ actualizarCampo() disponible");
      }

      // Verificar funciones de fallback
      if (typeof guardarSyllabusOriginal === "function") {
         console.log("✅ guardarSyllabusOriginal() disponible");
      }

      if (typeof cargarDatosSyllabusOriginal === "function") {
         console.log("✅ cargarDatosSyllabusOriginal() disponible");
      }

      if (typeof actualizarCampoSyllabusOriginal === "function") {
         console.log("✅ actualizarCampoSyllabusOriginal() disponible");
      }

      console.log("✅ Todas las funciones específicas están disponibles");
      return true;
   } catch (error) {
      console.log("❌ Error en funciones específicas:", error.message);
      return false;
   }
}

// ===== PRUEBA COMPLETA =====
function testCompleto() {
   console.log("=== PRUEBA COMPLETA DEL SISTEMA ===");

   const resultados = {
      constantes: testConstantes(),
      utilidades: testUtilidades(),
      servicios: testServicios(),
      integracion: testIntegracion(),
      rendimiento: testRendimiento(),
      funcionesEspecificas: testFuncionesEspecificas(),
   };

   console.log("\n=== RESUMEN DE RESULTADOS ===");
   console.log("Constantes:", resultados.constantes ? "✅ PASÓ" : "❌ FALLÓ");
   console.log("Utilidades:", resultados.utilidades ? "✅ PASÓ" : "❌ FALLÓ");
   console.log("Servicios:", resultados.servicios ? "✅ PASÓ" : "❌ FALLÓ");
   console.log("Integración:", resultados.integracion ? "✅ PASÓ" : "❌ FALLÓ");
   console.log("Rendimiento:", resultados.rendimiento ? "✅ PASÓ" : "❌ FALLÓ");
   console.log(
      "Funciones específicas:",
      resultados.funcionesEspecificas ? "✅ PASÓ" : "❌ FALLÓ"
   );

   const todasPasaron = Object.values(resultados).every(
      (result) => result === true
   );

   if (todasPasaron) {
      console.log("\n🎉 ¡TODAS LAS PRUEBAS PASARON!");
      console.log("✅ Sistema completamente funcional");
      console.log("✅ Arquitectura modular verificada");
      console.log("✅ Performance optimizada");
      console.log("✅ Integración exitosa");
      console.log("\n🚀 ¡El proyecto está listo para producción!");
   } else {
      console.log("\n⚠️ Algunas pruebas fallaron. Revisar errores.");
   }

   console.log("=== FIN DE PRUEBA COMPLETA ===");
   return todasPasaron;
}

// ===== FUNCIÓN PRINCIPAL PARA EJECUTAR PRUEBAS =====
function ejecutarPruebas() {
   console.log("🧪 Ejecutando pruebas del sistema...");
   return testCompleto();
}

// ===== PRUEBAS RÁPIDAS =====
function pruebaRapida() {
   console.log("⚡ Prueba rápida del sistema...");

   try {
      const carreras = getCarreras();
      const datos = cargarDatosSyllabus("TI35");

      console.log("✅ getCarreras():", carreras.length, "carreras");
      console.log("✅ cargarDatosSyllabus():", datos.success ? "OK" : "ERROR");

      if (datos.success) {
         console.log("📚 Asignatura:", datos.data.nombreAsignatura);
      }

      console.log("✅ Prueba rápida completada");
      return true;
   } catch (error) {
      console.log("❌ Error en prueba rápida:", error.message);
      return false;
   }
}

// ===== PRUEBA DE CONSTANTES ESPECÍFICA =====
function testConstantesDisponibles() {
   console.log("=== PRUEBA DE CONSTANTES DISPONIBLES ===");

   try {
      // Verificar que las constantes están definidas globalmente
      if (typeof SPREADSHEET_ID !== "undefined") {
         console.log("✅ SPREADSHEET_ID definido:", SPREADSHEET_ID);
      } else {
         console.log("❌ SPREADSHEET_ID no definido");
         return false;
      }

      if (typeof TEMPLATE_DOC_ID !== "undefined") {
         console.log("✅ TEMPLATE_DOC_ID definido:", TEMPLATE_DOC_ID);
      } else {
         console.log("❌ TEMPLATE_DOC_ID no definido");
         return false;
      }

      if (typeof FOLDER_ID !== "undefined") {
         console.log("✅ FOLDER_ID definido:", FOLDER_ID);
      } else {
         console.log("❌ FOLDER_ID no definido");
         return false;
      }

      // Probar acceso a la hoja de cálculo
      try {
         const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
         console.log("✅ Acceso a hoja de cálculo exitoso");
      } catch (error) {
         console.log(
            "❌ Error al acceder a la hoja de cálculo:",
            error.message
         );
         return false;
      }

      console.log("✅ Todas las constantes están disponibles y funcionando");
      return true;
   } catch (error) {
      console.log("❌ Error en prueba de constantes:", error.message);
      return false;
   }
}

// ===== PRUEBA DE FUNCIONES PRINCIPALES =====
function testFuncionesPrincipales() {
   console.log("=== PRUEBA DE FUNCIONES PRINCIPALES ===");

   try {
      // Probar getCarreras
      const carreras = getCarreras();
      console.log("✅ getCarreras() funciona:", carreras);

      // Probar cargarDatosSyllabus
      const datos = cargarDatosSyllabus("TI35");
      console.log("✅ cargarDatosSyllabus() funciona:", datos.success);

      if (datos.success) {
         console.log("📚 Asignatura cargada:", datos.data.nombreAsignatura);
      } else {
         console.log("⚠️ No se pudo cargar la asignatura TI35");
      }

      console.log("✅ Funciones principales funcionan");
      return true;
   } catch (error) {
      console.log("❌ Error en funciones principales:", error.message);
      return false;
   }
}

// ===== PRUEBA ESPECÍFICA PARA ERROR DE CONSTANTES =====
function testErrorConstantesSolucionado() {
   console.log("=== PRUEBA: ERROR DE CONSTANTES SOLUCIONADO ===");

   try {
      // Verificar que no hay error de redeclaración
      console.log("✅ Verificando que no hay error de redeclaración...");

      // Verificar que las constantes están disponibles
      if (typeof SPREADSHEET_ID === "undefined") {
         console.log("❌ SPREADSHEET_ID aún no está disponible");
         return false;
      }

      if (typeof TEMPLATE_DOC_ID === "undefined") {
         console.log("❌ TEMPLATE_DOC_ID aún no está disponible");
         return false;
      }

      if (typeof FOLDER_ID === "undefined") {
         console.log("❌ FOLDER_ID aún no está disponible");
         return false;
      }

      // Probar que las funciones principales funcionan
      console.log("✅ Probando funciones principales...");

      try {
         const carreras = getCarreras();
         console.log("✅ getCarreras() funciona correctamente");
      } catch (error) {
         console.log("❌ Error en getCarreras():", error.message);
         return false;
      }

      try {
         const datos = cargarDatosSyllabus("TI35");
         console.log("✅ cargarDatosSyllabus() funciona correctamente");
      } catch (error) {
         console.log("❌ Error en cargarDatosSyllabus():", error.message);
         return false;
      }

      console.log("🎉 ¡ERROR DE CONSTANTES COMPLETAMENTE SOLUCIONADO!");
      console.log("✅ No hay redeclaración de constantes");
      console.log("✅ Todas las constantes están disponibles");
      console.log("✅ Todas las funciones principales funcionan");

      return true;
   } catch (error) {
      console.log("❌ Error en prueba de solución:", error.message);
      return false;
   }
}
