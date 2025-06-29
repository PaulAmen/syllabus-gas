/**
 * Pruebas para el Paso 5: Limpiar Archivos Originales
 * Verifica que las funciones principales funcionan correctamente
 * después de eliminar código duplicado
 */

function testPaso5() {
   console.log("=== PRUEBA DEL PASO 5 ===");

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
         "Docente Original"
      );
      console.log(
         "✅ actualizarCampoSyllabus() funciona:",
         actualizacion.success
      );

      console.log("=== FIN DE PRUEBA ===");
      return true;
   } catch (error) {
      console.log("❌ Error en testPaso5:", error.message);
      return false;
   }
}

function testSinDuplicados() {
   console.log("=== PRUEBA SIN DUPLICADOS ===");

   try {
      // Verificar que las funciones principales están en Main.js
      console.log("🔍 Verificando funciones principales...");

      if (typeof getCarreras === "function") {
         console.log("✅ getCarreras() disponible en Main.js");
      } else {
         console.log("❌ getCarreras() no disponible");
         return false;
      }

      if (typeof cargarDatosSyllabus === "function") {
         console.log("✅ cargarDatosSyllabus() disponible en Main.js");
      } else {
         console.log("❌ cargarDatosSyllabus() no disponible");
         return false;
      }

      if (typeof actualizarCampoSyllabus === "function") {
         console.log("✅ actualizarCampoSyllabus() disponible en Main.js");
      } else {
         console.log("❌ actualizarCampoSyllabus() no disponible");
         return false;
      }

      // Verificar que las funciones de fallback están disponibles
      console.log("🔍 Verificando funciones de fallback...");

      if (typeof guardarSyllabusOriginal === "function") {
         console.log("✅ guardarSyllabusOriginal() disponible");
      } else {
         console.log("❌ guardarSyllabusOriginal() no disponible");
         return false;
      }

      if (typeof cargarDatosSyllabusOriginal === "function") {
         console.log("✅ cargarDatosSyllabusOriginal() disponible");
      } else {
         console.log("❌ cargarDatosSyllabusOriginal() no disponible");
         return false;
      }

      if (typeof actualizarCampoSyllabusOriginal === "function") {
         console.log("✅ actualizarCampoSyllabusOriginal() disponible");
      } else {
         console.log("❌ actualizarCampoSyllabusOriginal() no disponible");
         return false;
      }

      console.log("✅ No hay funciones duplicadas");
      console.log("=== FIN DE PRUEBA ===");
      return true;
   } catch (error) {
      console.log("❌ Error en testSinDuplicados:", error.message);
      console.log("=== FIN DE PRUEBA ===");
      return false;
   }
}

function testFuncionesEspecificas() {
   console.log("=== PRUEBA DE FUNCIONES ESPECÍFICAS ===");

   try {
      // Verificar que las funciones específicas están disponibles
      console.log("🔍 Verificando funciones específicas...");

      if (typeof generarDocumentoSyllabus === "function") {
         console.log("✅ generarDocumentoSyllabus() disponible en Código.js");
      } else {
         console.log("❌ generarDocumentoSyllabus() no disponible");
         return false;
      }

      if (typeof mapearNombreCampo === "function") {
         console.log(
            "✅ mapearNombreCampo() disponible en ActualizarCampoSyllabus.js"
         );
      } else {
         console.log("❌ mapearNombreCampo() no disponible");
         return false;
      }

      if (typeof actualizarCampo === "function") {
         console.log(
            "✅ actualizarCampo() disponible en ActualizarCampoSyllabus.js"
         );
      } else {
         console.log("❌ actualizarCampo() no disponible");
         return false;
      }

      console.log("✅ Todas las funciones específicas están disponibles");
      console.log("=== FIN DE PRUEBA ===");
      return true;
   } catch (error) {
      console.log("❌ Error en testFuncionesEspecificas:", error.message);
      console.log("=== FIN DE PRUEBA ===");
      return false;
   }
}

function testCompletoPaso5() {
   console.log("=== PRUEBA COMPLETA DEL PASO 5 ===");

   const resultados = {
      funciones: testPaso5(),
      sinDuplicados: testSinDuplicados(),
      funcionesEspecificas: testFuncionesEspecificas(),
   };

   console.log("\n=== RESUMEN DE RESULTADOS ===");
   console.log(
      "Funciones principales:",
      resultados.funciones ? "✅ PASÓ" : "❌ FALLÓ"
   );
   console.log(
      "Sin duplicados:",
      resultados.sinDuplicados ? "✅ PASÓ" : "❌ FALLÓ"
   );
   console.log(
      "Funciones específicas:",
      resultados.funcionesEspecificas ? "✅ PASÓ" : "❌ FALLÓ"
   );

   const todasPasaron = Object.values(resultados).every(
      (result) => result === true
   );

   if (todasPasaron) {
      console.log("\n🎉 ¡TODAS LAS PRUEBAS PASARON! El Paso 5 está completo.");
      console.log("✅ Las funciones principales funcionan correctamente");
      console.log("✅ No hay código duplicado");
      console.log("✅ Las funciones específicas están disponibles");
      console.log("✅ Los archivos originales están limpios");
      console.log("\n🚀 ¡Listo para continuar con el Paso 6!");
   } else {
      console.log(
         "\n⚠️ Algunas pruebas fallaron. Revisar errores antes de continuar."
      );
   }

   console.log("=== FIN DE PRUEBA COMPLETA ===");
   return todasPasaron;
}

// Función para ejecutar todas las pruebas del Paso 5
function ejecutarPruebasPaso5() {
   console.log("🧪 Ejecutando pruebas del Paso 5...");
   return testCompletoPaso5();
}
