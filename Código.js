// Configuración de la aplicación
const SPREADSHEET_ID = "1byVwunHRmWbgf0XOeOkHQNW6eiTZ-n4NO_61pb0mYcc"; // ID de la hoja de cálculo principal
const TEMPLATE_DOC_ID = "19D3axgYKdKyf-C6O7yg2T8j3DLQjs8OyhEirmo3tXLk"; // ID del documento plantilla del sílabo
const FOLDER_ID = "1kqGZPLQCxnod_zk2GqPhk9y6d06jOYWo";


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
        
        //Add headers only if the sheet is created.

        //Agregar encabezados

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
