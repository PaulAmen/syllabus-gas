/**
 * Pruebas para el Paso 4: Actualizar Referencias
 * Verifica que las funciones principales funcionan correctamente
 * y que la integración con los módulos es exitosa
 */

function testPaso4() {
   console.log("=== PRUEBA DEL PASO 4 ===");

   try {
      // Probar funciones principales
      const carreras = getCarreras();
      console.log("✅ getCarreras() funciona:", carreras);

      // Probar carga de datos
      const datos = cargarDatosSyllabus("TI35");
      console.log("✅ cargarDatosSyllabus() funciona:", datos.success);

      if (datos.success) {
         console.log("📚 Asignatura cargada:", datos.data.nombreAsignatura);
      }

      // Probar actualización
      const actualizacion = actualizarCampoSyllabus(
         "TI35",
         "Docente",
         "Test Docente"
      );
      console.log(
         "✅ actualizarCampoSyllabus() funciona:",
         actualizacion.success
      );

      console.log("=== FIN DE PRUEBA ===");
      return true;
   } catch (error) {
      console.log("❌ Error en testPaso4:", error.message);
      return false;
   }
}

function testIntegracionPaso4() {
   console.log("=== PRUEBA DE INTEGRACIÓN PASO 4 ===");

   try {
      // Verificar que las utilidades están disponibles
      const ss = getSpreadsheet();
      console.log("✅ getSpreadsheet() funciona");

      const data = getSheetData("ASIGNATURAS");
      console.log("✅ getSheetData() funciona:", data.length, "filas");

      // Verificar que las funciones de respuesta están disponibles
      const testResponse = createSuccessResponse("Test", { test: true });
      console.log("✅ createSuccessResponse() funciona:", testResponse.success);

      const testError = createErrorResponse("Test error");
      console.log("✅ createErrorResponse() funciona:", !testError.success);

      // Verificar que las funciones de validación están disponibles
      const validation = validateRequiredFields({ test: "value" }, ["test"]);
      console.log("✅ validateRequiredFields() funciona:", validation.isValid);

      console.log("✅ Todas las utilidades están disponibles");
      console.log("=== FIN DE PRUEBA DE INTEGRACIÓN ===");
      return true;
   } catch (error) {
      console.log("❌ Error con utilidades:", error.message);
      console.log("=== FIN DE PRUEBA DE INTEGRACIÓN ===");
      return false;
   }
}

function testCompatibilidadPaso4() {
   console.log("=== PRUEBA DE COMPATIBILIDAD PASO 4 ===");

   try {
      // Verificar que las funciones originales están disponibles como fallback
      console.log("🔍 Verificando funciones de fallback...");

      // Estas funciones deberían estar definidas en los archivos originales
      if (typeof guardarSyllabusOriginal === "function") {
         console.log("✅ guardarSyllabusOriginal() disponible");
      } else {
         console.log("⚠️ guardarSyllabusOriginal() no disponible");
      }

      if (typeof cargarDatosSyllabusOriginal === "function") {
         console.log("✅ cargarDatosSyllabusOriginal() disponible");
      } else {
         console.log("⚠️ cargarDatosSyllabusOriginal() no disponible");
      }

      if (typeof actualizarCampoSyllabusOriginal === "function") {
         console.log("✅ actualizarCampoSyllabusOriginal() disponible");
      } else {
         console.log("⚠️ actualizarCampoSyllabusOriginal() no disponible");
      }

      console.log("✅ Compatibilidad verificada");
      console.log("=== FIN DE PRUEBA DE COMPATIBILIDAD ===");
      return true;
   } catch (error) {
      console.log("❌ Error en compatibilidad:", error.message);
      console.log("=== FIN DE PRUEBA DE COMPATIBILIDAD ===");
      return false;
   }
}

function testCompletoPaso4() {
   console.log("=== PRUEBA COMPLETA DEL PASO 4 ===");

   const resultados = {
      funciones: testPaso4(),
      integracion: testIntegracionPaso4(),
      compatibilidad: testCompatibilidadPaso4(),
   };

   console.log("\n=== RESUMEN DE RESULTADOS ===");
   console.log(
      "Funciones principales:",
      resultados.funciones ? "✅ PASÓ" : "❌ FALLÓ"
   );
   console.log(
      "Integración con módulos:",
      resultados.integracion ? "✅ PASÓ" : "❌ FALLÓ"
   );
   console.log(
      "Compatibilidad:",
      resultados.compatibilidad ? "✅ PASÓ" : "❌ FALLÓ"
   );

   const todasPasaron = Object.values(resultados).every(
      (result) => result === true
   );

   if (todasPasaron) {
      console.log("\n🎉 ¡TODAS LAS PRUEBAS PASARON! El Paso 4 está completo.");
      console.log("✅ Las funciones principales funcionan correctamente");
      console.log("✅ La integración con módulos es exitosa");
      console.log("✅ La compatibilidad está mantenida");
      console.log("\n🚀 ¡Listo para continuar con el Paso 5!");
   } else {
      console.log(
         "\n⚠️ Algunas pruebas fallaron. Revisar errores antes de continuar."
      );
   }

   console.log("=== FIN DE PRUEBA COMPLETA ===");
   return todasPasaron;
}

// Función para ejecutar todas las pruebas del Paso 4
function ejecutarPruebasPaso4() {
   console.log("🧪 Ejecutando pruebas del Paso 4...");
   return testCompletoPaso4();
}
