// NOTA: La función principal actualizarCampoSyllabus() ahora está en Main.js y services/SyllabusService.js
// para mejor organización y mantenibilidad.

// Función de compatibilidad para actualizarCampoSyllabus (fallback)
function actualizarCampoSyllabusOriginal(
   nombreHoja,
   codigo,
   nombreCampo,
   valorCampo
) {
   try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      let sheet = ss.getSheetByName(nombreHoja);

      if (!sheet) {
         return {
            success: false,
            message: `No se encontró la hoja ${nombreHoja}`,
         };
      }

      // Buscar la fila que corresponde al código de asignatura
      const datos = sheet.getDataRange().getValues();
      const encabezados = datos[0];

      // Encontrar el índice del encabezado que corresponde al campo a actualizar
      let columnIndex = -1;
      for (let i = 0; i < encabezados.length; i++) {
         if (encabezados[i] === nombreCampo) {
            columnIndex = i;
            break;
         }
      }

      if (columnIndex === -1) {
         return {
            success: false,
            message: `No se encontró la columna con el nombre ${nombreCampo}`,
         };
      }

      // Buscar la fila que corresponde al código de asignatura
      let rowIndex = -1;
      for (let i = 1; i < datos.length; i++) {
         if (datos[i][0] === codigo) {
            rowIndex = i + 1; // +1 porque los índices de filas en Sheets empiezan en 1 y el 0 es el encabezado
            break;
         }
      }

      // Si no se encuentra la fila, devolver un error
      if (rowIndex === -1) {
         return {
            success: false,
            message: `No se encontró ninguna asignatura con el código ${codigo}`,
         };
      }

      // Actualizar la celda específica
      sheet.getRange(rowIndex, columnIndex + 1).setValue(valorCampo); // +1 porque las columnas en Sheets comienzan en 1

      return {
         success: true,
         message: `Campo ${nombreCampo} actualizado correctamente`,
      };
   } catch (error) {
      return {
         success: false,
         message: error.toString(),
      };
   }
}

// Función para mapear nombres de campo del frontend a encabezados de la hoja de cálculo (mantenida aquí por ser específica)
function mapearNombreCampo(nombreCampoFrontend) {
   // Mapeo de nombres de campo del frontend a encabezados de la hoja de cálculo
   const mapeoCampos = {
      codigo: "Código",
      nombreAsignatura: "Nombre de la asignatura",
      prerrequisito: "Prerrequisito",
      correquisito: "Correquisito",
      facultad: "Facultad",
      unidad: "Unidad",
      campoFormacion: "Campo de formación",
      modalidad: "Modalidad",
      periodo: "Periodo",
      nivel: "Nivel",
      paralelos: "Paralelos",
      horarioc: "HorarioC",
      horariot: "HorarioT",
      nombreDocente: "Docente",
      perfilDocente: "Perfil",
      totalHoras: "Total horas",
      horasDocencia: "HorasD",
      horasPresencial: "HorasP",
      horass: "HorasS",
      horasPAE: "PAE",
      horasTA: "TA",
      horasPPP: "PPP",
      horasHVS: "HVS",
      caracterizacion: "Caracterización",
      aportePerfil: "Aporte al perfil",
      objetivos: "Objetivos",
      competencias: "Competencias",
      actitudinales: "Actitudinales",
      cognitivos: "Cognitivos",
      procedimentales: "Procedimentales",
      contenidos: "Unidades temáticas",
      ut1: "UT1",
      ut2: "UT2",
      ut3: "UT3",
      ut4: "UT4",
      metodologia: "Metodología",
      evaluacion: "Evaluación",
      basica: "Básica",
      complementaria: "Complementaria",
      unidadna: "UNIDADNA",
      unidadga: "UnidadGA",
      subtemana: "SubtemaNA",
      subtemaa: "SubtemaA",
      raprendizajea: "RAprendizajeA",
      metodologiaa: "METODOLOGIAA",
      didacticosa: "DidácticosA",
      criteriosa: "CriteriosA",
      aprendizajea: "AprendizajeA",
      biblioa: "BiblioA",
      fechaa: "FechaA",
      unidadnb: "UNIDADNB",
      unidadgb: "UnidadGB",
      subtemanb: "SubtemaNB",
      subtemab: "SubtemaB",
      raprendizajeb: "RAprendizajeB",
      metodologiab: "METODOLOGIAB",
      didacticosb: "DidacticosB",
      criteriosb: "CriteriosB",
      aprendizajeb: "AprendizajeB",
      bibliob: "BiblioB",
      fechab: "FechaB",
      unidadnc: "UNIDADNC",
      unidadgc: "UnidadGC",
      subtemanc: "SubtemaNC",
      subtemac: "SubtemaC",
      raprendizajec: "RAprendizajeC",
      metodologiac: "METODOLOGIAC",
      didacticosc: "DidacticosC",
      criteriosc: "CriteriosC",
      aprendizajec: "AprendizajeC",
      biblioc: "BiblioC",
      fechac: "FechaC",
      unidadnd: "UNIDADND",
      unidadgd: "UnidadGD",
      subtemand: "SubtemaND",
      subtemad: "SubtemaD",
      raprendizajed: "RAprendizajeD",
      metodologiad: "METODOLOGIAD",
      didacticosd: "DidacticosD",
      criteriosd: "CriteriosD",
      aprendizajed: "AprendizajeD",
      bibliod: "BiblioD",
      fechad: "FechaD",
      planificacionData: "PlanificacionJSON",
   };

   // Retornar el nombre mapeado o el original si no hay mapeo
   return mapeoCampos[nombreCampoFrontend] || nombreCampoFrontend;
}

// Función para actualizar un campo desde el frontend (mantenida aquí por ser específica)
function actualizarCampo(carrera, codigo, nombreCampo, valorCampo) {
   // Ignorar el parámetro carrera y usar un valor fijo
   const nombreHojaFijo = "ASIGNATURAS"; // Cambia esto al nombre exacto de tu hoja

   // Mapear el nombre del campo desde el frontend al nombre en la hoja de cálculo
   const nombreColumna = mapearNombreCampo(nombreCampo);

   // Llamar a la función de actualización
   return actualizarCampoSyllabusOriginal(
      nombreHojaFijo,
      codigo,
      nombreColumna,
      valorCampo
   );
}
