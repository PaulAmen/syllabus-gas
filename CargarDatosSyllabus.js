function cargarDatosSyllabus(codigo) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName("ASIGNATURAS");
    if (!sheet) {
      return {
        success: false,
        message: "No se encontró la hoja de asignaturas",
      };
    }
    const data = sheet.getDataRange().getValues();
    const headers = data[0];

    

    // Buscar la fila que coincide con el código o nombre
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (
        row[0] === codigo ||
        row[1].toLowerCase() === codigo.toLowerCase()
      ) {
        const datos = {};

        // Mapear los datos según los encabezados
        headers.forEach((header, index) => {
          // Mapeo directo de encabezados a nombres de campos
          const mapeoCampos = {
            Código: "codigo",
            "Nombre de la asignatura": "nombreAsignatura",
            Prerrequisito: "prerrequisito",
            Correquisito: "correquisito",
            Facultad: "facultad",
            Unidad: "unidad",
            "Campo de formación": "campoFormacion",
            Modalidad: "modalidad",
            Periodo: "periodo",
            Nivel: "nivel",
            Paralelos: "paralelos",
            HorarioC: "horarioc",
            HorarioT: "horariot",
            Docente: "nombreDocente",
            Perfil: "perfilDocente",
            Totalh: "totalHoras",
            HorasD: "horasDocencia",
            HorasP: "horasPresencial",
            HorasS: "horass",
            PAE: "horasPAE",
            TA: "horasTA",
            PPP: "horasPPP",
            HVS: "horasHVS",
            UT1: "ut1",
            UT2: "ut2",
            UT3: "ut3",
            UT4: "ut4",
            Caracterización: "caracterizacion",
            Aporte: "aportePerfil",
            Objetivos: "objetivos",
            Competencias: "competencias",
            Actitudinales: "actitudinales",
            Cognitivos: "cognitivos",
            Procedimentales: "procedimentales",
            Contenidos: "contenidos1",
            Metodología: "metodologia",
            Evaluación: "evaluacion",
            Básica: "basica",
            Complementaria: "complementaria",
            "Código": "codigo",
            "Unidad Código": "unidadCodigo",
            UnidadN: "unidadn",
            SubtemaN: "subteman",
            SubtemaT: "subtemat",
            "Aprendizaje": "aprendizaje",
            "Metodologi": "metodologi",
            "Didácticos": "didacticos",
            "Criterios": "criterios",
            "Bibliografía": "bibliografia",
            "FP": "fp",
            UnidadG: "unidadg",
            //CONTROL PARA UNIDAD 1
            UNIDADNA: "unidadna",
            UnidadGA: "unidadga",
            SubtemaNA: "subtemana",
            SubtemaA: "subtemaa",
            RAprendizajeA: "raprendizajea",
            METODOLOGIAA: "metodologiaa",
            DidácticosA: "didacticosa",
            CriteriosA: "criteriosa",
            AprendizajeA: "aprendizajea",
            BiblioA: "biblioa",
            FechaA: "fechaa",
            //CONTROL PARA UNIDAD 2
            UNIDADNB: "unidadnb",
            UnidadGB: "unidadgb",
            SubtemaNB: "subtemanb",
            SubtemaB: "subtemab",
            RAprendizajeB: "raprendizajeb",
            METODOLOGIAB: "metodologiab",
            DidácticosB: "didacticosb",
            CriteriosB: "criteriosb",
            AprendizajeB: "aprendizajeb",
            BiblioB: "bibliob",
            FechaB: "fechab",
            //CONTROL PARA UNIDAD 3
            UNIDADNC: "unidadnc",
            UnidadGC: "unidadgc",
            SubtemaNC: "subtemanc",
            SubtemaC: "subtemac",
            RAprendizajeC: "raprendizajec",
            METODOLOGIAC: "metodologiac",
            DidácticosC: "didacticosc",
            CriteriosC: "criteriosc",
            AprendizajeC: "aprendizajec",
            BiblioC: "biblioc",
            FechaC: "fechac",
            //CONTROL PARA UNIDAD 4
            UNIDADND: "unidadnd",
            UnidadGD: "unidadgd",
            SubtemaND: "subtemand",
            SubtemaD: "subtemad",
            RAprendizajeD: "raprendizajed",
            METODOLOGIAD: "metodologiad",
            DidácticosD: "didacticosd",
            CriteriosD: "criteriosd",
            AprendizajeD: "aprendizajed",
            BiblioD: "bibliod",
            FechaD: "fechad",
            PlanificacionJSON: "planificacionData",
          };

          const key = mapeoCampos[header];

          if (key) {
            // Manejar campos que son arrays (JSON)
            if (
              [
                "competencias",
                "resultadosActitudinales",
                "resultadosCognitivos",
                "resultadosProcedimentales",
              ].includes(key)
            ) {
              try {
                datos[key] = JSON.parse(row[index]);
              } catch (e) {
                datos[key] = [];
              }
            } else {
              // Convertir a número los campos de carga horaria
              if (
                [
                  "totalHoras",
                  "horasDocencia",
                  "horasPresencial",
                  "horasSincronica",
                  "horasPAE",
                  "horasTA",
                  "horasPPP",
                  "horasHVS",
                ].includes(key)
              ) {
                datos[key] = Number(row[index]) || 0;
              } else {
                // Manejar campos de tipo select
                if (key === "facultad") {
                  datos[key] = "Ciencias Técnicas"; // Valor fijo ya que es la única opción
                } else if (key === "unidad") {
                  // Asegurar que el valor coincida con las opciones del select
                  const valor = row[index];
                  if (
                    [
                      "Unidad Básica",
                      "Unidad Profesional",
                      "Unidad Complementaria",
                      "Unidad de Integración Curricular/Titulación",
                    ].includes(valor)
                  ) {
                    datos[key] = valor;
                  } else {
                    datos[key] = "";
                  }
                } else if (key === "campoFormacion") {
                  // Asegurar que el valor coincida con las opciones del select
                  const valor = row[index];
                  if (
                    [
                      "Ciencias Básicas",
                      "Ciencias de la Ingeniería",
                      "Ingeniería Aplicada",
                      "Ciencias Sociales y Humanísticas",
                    ].includes(valor)
                  ) {
                    datos[key] = valor;
                  } else {
                    datos[key] = "";
                  }
                } else if (key === "modalidad") {
                  // Asegurar que el valor coincida con las opciones del select
                  const valor = row[index];
                  if (
                    [
                      "Presencial",
                      "Semipresencial",
                      "Virtual",
                    ].includes(valor)
                  ) {
                    datos[key] = valor;
                  } else {
                    datos[key] = "";
                  }
                } else if (key === "periodo") {
                  // Asegurar que el valor coincida con las opciones del select
                  const valor = row[index];
                  if (
                    [
                      "PI 2025",
                      "PII 2025",
                      "PI 2026",
                      "PII 2026",
                      "PI 2027",
                      "PII 2027",
                    ].includes(valor)
                  ) {
                    datos[key] = valor;
                  } else {
                    datos[key] = "";
                  }
                } else if (key === "nivel") {
                  // Asegurar que el valor coincida con las opciones del select
                  const valor = row[index];
                  if (
                    [
                      "Primero",
                      "Segundo",
                      "Tercero",
                      "Cuarto",
                      "Quinto",
                      "Sexto",
                      "Séptimo",
                      "Octavo",
                    ].includes(valor)
                  ) {
                    datos[key] = valor;
                  } else {
                    datos[key] = "";
                  }
                } else if (key === "paralelos") {
                  // Asegurar que el valor coincida con las opciones del select
                  const valor = row[index];
                  if (
                    [
                      "A",
                      "B",
                      "C",
                      "D",
                      "E",
                      "F",
                    ].includes(valor)
                  ) {
                    datos[key] = valor;
                  } else {
                    datos[key] = "";
                  }
                } else {
                  // Asegurarse de que los campos de texto no sean undefined
                  datos[key] = row[index] || "";
                }
              }
            }
          }
        });

        return { success: true, data: datos };
      }
    }

    return {
      success: false,
      message: "No se encontró la asignatura especificada",
    };
  } catch (error) {
    return { success: false, message: error.toString() };
  }
  function cargarDatosSyllabus(unidadSolicitada) {
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CONTENIDOS");
    const datos = hoja.getDataRange().getValues();
    const encabezados = datos[0];

    const idxUnidad = encabezados.indexOf("UNIDADN");
    const idxUnidadG = encabezados.indexOf("Unidad");
    const idxSubtemaN = encabezados.indexOf("SUBTEMAN");
    const idxSubtemaT = encabezados.indexOf("SUBTEMA");
    const idxAprendizaje = encabezados.indexOf("Aprendizaje");
    const idxMetodologia = encabezados.indexOf("METODOLOGIA");
    const idxDidacticos = encabezados.indexOf("Didácticos");
    const idxCriterios = encabezados.indexOf("Criterios");
    const idxBibliografia = encabezados.indexOf("Bibliografía");
    const idxFP = encabezados.indexOf("FP");

    for (let i = 1; i < datos.length; i++) {
      if (datos[i][idxUnidad].toString().toUpperCase() === unidadSolicitada.toUpperCase()) {
        return {
          success: true,
          unidadg: datos[i][idxUnidadG],
          subteman: datos[i][idxSubtemaN],
          subtemat: datos[i][idxSubtemaT],
          aprendizaje: datos[i][idxAprendizaje],
          metodologi: datos[i][idxMetodologia],
          didacticos: datos[i][idxDidacticos],
          criterios: datos[i][idxCriterios],
          bibliografia: datos[i][idxBibliografia],
          fp: datos[i][idxFP]
        };
      }
    }

    return { success: false, mensaje: "Unidad no encontrada." };
  }

}
