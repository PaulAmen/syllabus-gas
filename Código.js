// Configuración de la aplicación
const SPREADSHEET_ID = "1byVwunHRmWbgf0XOeOkHQNW6eiTZ-n4NO_61pb0mYcc"; // ID de la hoja de cálculo principal
const TEMPLATE_DOC_ID = ""; // ID del documento plantilla del sílabo

// Función para mostrar la interfaz de usuario
function doGet() {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("Generador de Sílabos")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

// Función para incluir archivos HTML
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Función para obtener las carreras disponibles
function getCarreras() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheets = ss.getSheets();
  return sheets.map((sheet) => sheet.getName());
}

// Función para guardar la información del sílabo
function guardarSyllabus(carrera, datos) {
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
,
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
      new Date(),
    ];

    // Agregar nueva fila con los datos
    sheet.appendRow(rowData);

    // Generar documento
    return generarDocumentoSyllabus(carrera, datos);
  } catch (error) {
    return { success: false, message: error.toString() };
  }
}

// Función para generar el documento del sílabo
function generarDocumentoSyllabus(carrera, datos) {
  try {
    const template = DocumentApp.openById(TEMPLATE_DOC_ID);
    const doc = template.makeCopy();

    // Reemplazar marcadores en el documento
    const body = doc.getBody();

    // Información General
    body.replaceText("{{CODIGO}}", datos.codigo);
    body.replaceText("{{NOMBRE_ASIGNATURA}}", datos.nombreAsignatura);
    body.replaceText("{{PRERREQUISITO}}", datos.prerrequisito);
    body.replaceText("{{CORREQUISITO}}", datos.correquisito);
    body.replaceText("{{FACULTAD}}", datos.facultad);
    body.replaceText("{{CARRERA}}", carrera);
    body.replaceText("{{UNIDAD}}", unidad);
    body.replaceText("{{CAMPO_FORMACION}}", datos.campoFormacion);
    body.replaceText("{{MODALIDAD}}", modalidad);
    body.replaceText("{{PERIODO}}", periodo);
    body.replaceText("{{NIVEL}}", nivel);
    body.replaceText("{{PARALELOS}}", paralelos);
    body.replaceText("{{HORARIOC}}", datos.horarioc);
    body.replaceText("{{HORARIOT}}", datos.horariot);
    body.replaceText("{{DOCENTE}}", datos.nombreDocente);
    body.replaceText("{{PERFIL}}", datos.perfilDocente);

    // Carga Horaria
    body.replaceText("{{TOTALH}}", datos.totalHoras);
    body.replaceText("{{HORASD}}", datos.horasDocencia);
    body.replaceText("{{HORASP}}", datos.horasPresencial);
    body.replaceText("{{HORASS}}", datos.horass);
    body.replaceText("{{PAE}}", datos.horasPAE);
    body.replaceText("{{TA}}", datos.horasTA);
    body.replaceText("{{PPP}}", datos.horasPPP);
    body.replaceText("{{HVS}}", datos.horasHVS);
    body.replaceText("{{UNIDADN}}", datos.unidadn);

    // Componentes Académicos
    body.replaceText("{{CARACTERIZACION}}", datos.caracterizacion);
    body.replaceText("{{APORTE_PERFIL}}", datos.aportePerfil);
    body.replaceText("{{OBJETIVOS}}", datos.objetivos);

    // Competencias
    const competenciasText = datos.competencias
      .map((comp, index) => `${index + 1}. ${comp}`)
      .join("\n");
    body.replaceText("{{COMPETENCIAS}}", competenciasText);

    // Resultados de aprendizaje

    body.replaceText("{{ACTITUDINALES}}", datos.actitudinales);
    body.replaceText("{{COGNITIVOS}}", datos.cognitivos);
    body.replaceText("{{PROCEDIMENTALES}}", datos.procedimentales);

    body.replaceText("{{UT1}}", datos.ut1, datos.ut2, datos.ut3, datos.ut4);
    body.replaceText("{{METODOLOGIA}}", datos.metodologia);
    body.replaceText("{{EVALUACION}}", datos.evaluacion);
    body.replaceText("{{BASICA}}", datos.basica);
    body.replaceText("{{COMPLEMENTARIA}}", datos.complementaria);

    // Unidades temáticas
    body.replaceText("{{HVS}}", datos.horasHVS)


    //REEMPLAZAR EN EL DOCUMENTO UNIDAD 1
    cuerpo.replaceText("{{UNIDADNA}}", datos.unidadna);
    cuerpo.replaceText("{{UNIDADGA}}", datos.unidadga);
    cuerpo.replaceText("{{SUBTEMANA}}", datos.subtemana);
    cuerpo.replaceText("{{SUBTEMAA}}", datos.subtemaa);
    cuerpo.replaceText("{{RAPRENDIZAJEA}}", datos.raprendizajea);
    cuerpo.replaceText("{{METODOLOGIAA}}", datos.metologiaa);
    cuerpo.replaceText("{{DIDACTICOSA}}", datos.didacticosa);
    cuerpo.replaceText("{{CRITERIOSA}}", datos.crieriosa);
    cuerpo.replaceText("{{APRENDIZAJEA}}", datos.aprendizajea);
    cuerpo.replaceText("{{BIBLIOA}}", datos.biblioa);
    cuerpo.replaceText("{{FECHAA}}", datos.fechaa);

    //REEMPLAZAR EN EL DOCUMENTO UNIDAD 2
    cuerpo.replaceText("{{UNIDADNB}}", datos.unidadnb);
    cuerpo.replaceText("{{UNIDADGB}}", datos.unidadgb);
    cuerpo.replaceText("{{SUBTEMANB}}", datos.subtemanb);
    cuerpo.replaceText("{{SUBTEMAB}}", datos.subtemab);
    cuerpo.replaceText("{{RAPRENDIZAJEB}}", datos.raprendizajeb);
    cuerpo.replaceText("{{METODOLOGIAB}}", datos.metologiab);
    cuerpo.replaceText("{{DIDACTICOSB}}", datos.didacticosb);
    cuerpo.replaceText("{{CRITERIOSB}}", datos.crieriosb);
    cuerpo.replaceText("{{APRENDIZAJEB}}", datos.aprendizajeb);
    cuerpo.replaceText("{{BIBLIOGRAFIAB}}", datos.bibliob);
    cuerpo.replaceText("{{FECHAB}}", datos.fechab);


    //REEMPLAZAR EN EL DOCUMENTO UNIDAD 3
    cuerpo.replaceText("{{UNIDADNC}}", datos.unidadnc);
    cuerpo.replaceText("{{UNIDADGC}}", datos.unidadgc);
    cuerpo.replaceText("{{SUBTEMANC}}", datos.subtemanc);
    cuerpo.replaceText("{{SUBTEMAC}}", datos.subtemac);
    cuerpo.replaceText("{{RAPRENDIZAJEC}}", datos.raprendizajec);
    cuerpo.replaceText("{{METODOLOGIAC}}", datos.metologiac);
    cuerpo.replaceText("{{DIDACTICOSC}}", datos.didacticosc);
    cuerpo.replaceText("{{CRITERIOSC}}", datos.crieriosc);
    cuerpo.replaceText("{{APRENDIZAJEC}}", datos.aprendizajec);
    cuerpo.replaceText("{{BIBLIOGRAFIAC}}", datos.biblioc);
    cuerpo.replaceText("{{FECHAC}}", datos.fechac);


    //REEMPLAZAR EN EL DOCUMENTO UNIDAD 4
    cuerpo.replaceText("{{UNIDADND}}", datos.unidadnd);
    cuerpo.replaceText("{{UNIDADGD}}", datos.unidadgd);
    cuerpo.replaceText("{{SUBTEMAND}}", datos.subtemand);
    cuerpo.replaceText("{{SUBTEMAD}}", datos.subtemad);
    cuerpo.replaceText("{{RAPRENDIZAJED}}", datos.raprendizajed);
    cuerpo.replaceText("{{METODOLOGIAD}}", datos.metologiad);
    cuerpo.replaceText("{{DIDACTICOSD}}", datos.didacticosd);
    cuerpo.replaceText("{{CRITERIOSD}}", datos.crieriosd);
    cuerpo.replaceText("{{APRENDIZAJED}}", datos.aprendizajed);
    cuerpo.replaceText("{{BIBLIOGRAFIAD}}", datos.bibliod);
    cuerpo.replaceText("{{FECHAD}}", datos.fechad);
    // Guardar y obtener URL del documento
    doc.saveAndClose();
    const url = doc.getUrl();

    return { success: true, url: url };
  } catch (error) {
    return { success: false, message: error.toString() };
  }
}

// Función para cargar los datos del sílabo
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
