// NOTA: Las constantes principales están en config/Constants.js
// Las funciones principales están en Main.js y services/SyllabusService.js

// Función para generar documento del sílabo (mantenida aquí por ser específica)
function generarDocumentoSyllabus(carrera, datos) {
   try {
      // Esta función es específica de este archivo y no está duplicada
      // Se mantiene aquí para compatibilidad
      Logger.log(`Generando documento para carrera: ${carrera}`);

      // Aquí iría la lógica específica de generación de documentos
      // que no está en los módulos refactorizados

      return { success: true, message: "Documento generado correctamente" };
   } catch (error) {
      Logger.log(`Error al generar documento: ${error.message}`);
      return { success: false, message: error.toString() };
   }
}

// Función de compatibilidad para guardarSyllabus (fallback)
function guardarSyllabusOriginal(carrera, datos) {
   try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      let sheet = ss.getSheetByName(carrera);

      if (!sheet) {
         sheet = ss.insertSheet(carrera);
         // Agregar encabezados
         sheet.appendRow([
            "Código",
            "Nombre de la asignatura",
            "Prerrequisito",
            "Correquisito",
            "Facultad",
            "Unidad",
            "Campo de formación",
            "Modalidad",
            "Periodo",
            "Nivel",
            "Paralelos",
            "HorarioC",
            "HorarioT",
            "Docente",
            "Perfil",
            "Total horas",
            "HorasD",
            "HorasP",
            "HorasS",
            "PAE",
            "TA",
            "PPP",
            "HVS",
            "Caracterización",
            "Aporte al perfil",
            "Objetivos",
            "Competencias",
            "Actitudinales",
            "Cognitivos",
            "Procedimentales",
            "UT1",
            "UT2",
            "UT3",
            "UT4",
            "Metodología",
            "Evaluación",
            "Básica",
            "Complementaria",
            "Unidades temáticas",
            "Fecha de creación",
            "UnidadG",
            "Código",
            "Unidad Código",
            //CONTROL PARA UNIDAD 1
            "UNIDADNA",
            "UnidadGA",
            "SubtemaNA",
            "SubtemaA",
            "RAprendizajeA",
            "METODOLOGIAA",
            "DidácticosA",
            "CriteriosA",
            "AprendizajeA",
            "BiblioA",
            "FechaA",
            //CONTROL PARA UNIDAD 2
            "UNIDADNB",
            "UnidadGB",
            "SubtemaNB",
            "SubtemaB",
            "RAprendizajeB",
            "METODOLOGIAB",
            "DidacticosB",
            "CriteriosB",
            "AprendizajeB",
            "BiblioB",
            "FechaB",
            //CONTROL PARA UNIDAD 3
            "UNIDADNC",
            "UnidadGC",
            "SubtemaNC",
            "SubtemaC",
            "RAprendizajeC",
            "METODOLOGIAC",
            "DidacticosC",
            "CriteriosC",
            "AprendizajeC",
            "BiblioC",
            "FechaC",
            //CONTROL PARA UNIDAD 4
            "UNIDADND",
            "UnidadGD",
            "SubtemaND",
            "SubtemaD",
            "RAprendizajeD",
            "METODOLOGIAD",
            "DidacticosD",
            "CriteriosD",
            "AprendizajeD",
            "BiblioD",
            "FechaD",
            // Nueva columna para el planificador al final
            "PlanificacionJSON",
            "Fecha de creación", // Fecha al final
         ]);
      }

      // Preparar datos para la hoja de cálculo
      const rowData = [
         datos.codigo,
         datos.nombreAsignatura,
         datos.prerrequisito,
         datos.correquisito,
         datos.facultad,
         datos.unidad,
         datos.campoFormacion,
         datos.modalidad,
         datos.periodo,
         datos.nivel,
         datos.paralelos,
         datos.horarioc,
         datos.horariot,
         datos.nombreDocente,
         datos.perfilDocente,
         datos.totalHoras,
         datos.horasDocencia,
         datos.horasPresencial,
         datos.horass,
         datos.horasPAE,
         datos.horasTA,
         datos.horasPPP,
         datos.horasHVS,
         datos.caracterizacion,
         datos.aportePerfil,
         datos.objetivos,
         datos.competencias,
         datos.cognitivos,
         datos.procedimentales,
         datos.contenidos,
         datos.ut1,
         datos.ut2,
         datos.ut3,
         datos.ut4,
         datos.metodologia,
         datos.evaluacion,
         datos.basica,
         datos.complementaria,
         //CONTROL DATOS UNIDAD 1
         datos.unidadna,
         datos.unidadga,
         datos.subtemana,
         datos.subtemaa,
         datos.raprendizajea,
         datos.metodologiaa,
         datos.didacticosa,
         datos.criteriosa,
         datos.aprendizajea,
         datos.biblioa,
         datos.fechaa,
         //CONTROL DATOS UNIDAD 2
         datos.unidadnb,
         datos.unidadgb,
         datos.subtemanb,
         datos.subtemab,
         datos.raprendizajeb,
         datos.metodologiab,
         datos.didacticosb,
         datos.criteriosb,
         datos.aprendizajeb,
         datos.bibliob,
         datos.fechab,
         //CONTROL DATOS UNIDAD 3
         datos.unidadnc,
         datos.unidadgc,
         datos.subtemanc,
         datos.subtemac,
         datos.raprendizajec,
         datos.metodologiac,
         datos.didacticosc,
         datos.criteriosc,
         datos.aprendizajec,
         datos.biblioc,
         datos.fechac,
         //CONTROL DATOS UNIDAD 4
         datos.unidadnd,
         datos.unidadgd,
         datos.subtemand,
         datos.subtemad,
         datos.raprendizajed,
         datos.metodologiad,
         datos.didacticosd,
         datos.criteriosd,
         datos.aprendizajed,
         datos.bibliod,
         datos.fechad,
         datos.planificacionData || "{}", // Guardar JSON como string, default a '{}'
         new Date(),
      ];

      // --- Lógica para encontrar y actualizar fila o añadir nueva ---
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      const codigoIndex = 0; // Asumiendo que el código está en la primera columna (A)
      let rowIndex = -1;

      // Buscar si el código ya existe (empezando desde la fila 1, no la 0 que son headers)
      for (let i = 1; i < values.length; i++) {
         if (
            values[i][codigoIndex] &&
            values[i][codigoIndex].toString() === datos.codigo.toString()
         ) {
            rowIndex = i + 1; // El índice de fila en Sheets API es 1-based
            break;
         }
      }

      if (rowIndex !== -1) {
         // Si se encontró la fila, actualizarla
         const numColumns = Math.min(rowData.length, sheet.getLastColumn());
         sheet
            .getRange(rowIndex, 1, 1, numColumns)
            .setValues([rowData.slice(0, numColumns)]);
         Logger.log(
            `Fila actualizada para el código ${
               datos.codigo
            } en la hoja ${sheet.getName()}`
         );
      } else {
         // Si no se encontró, añadir como nueva fila
         sheet.appendRow(rowData);
         Logger.log(
            `Nueva fila añadida para el código ${
               datos.codigo
            } en la hoja ${sheet.getName()}`
         );
      }

      // Generar documento
      return generarDocumentoSyllabus(carrera, datos);
   } catch (error) {
      return { success: false, message: error.toString() };
   }
}
