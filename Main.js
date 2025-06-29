/**
 * Archivo principal del Generador de Syllabus
 * Coordina todos los módulos de la aplicación refactorizada
 */

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

/**
 * Función de compatibilidad para obtener carreras
 * Mantiene compatibilidad con el código original
 * @returns {Array} Array con nombres de las carreras
 */
function getCarreras() {
   try {
      // Usar la función del servicio refactorizado
      return getCarrerasFromService();
   } catch (error) {
      Logger.log(`Error en getCarreras(): ${error.message}`);
      // Fallback al método original si el servicio falla
      try {
         const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
         const sheets = ss.getSheets();
         return sheets.map((sheet) => sheet.getName());
      } catch (fallbackError) {
         Logger.log(
            `Error en fallback getCarreras(): ${fallbackError.message}`
         );
         return [];
      }
   }
}

/**
 * Función de compatibilidad para guardar syllabus
 * Mantiene compatibilidad con el código original
 * @param {string} carrera - Nombre de la carrera
 * @param {Object} datos - Datos del sílabo
 * @returns {Object} Resultado de la operación
 */
function guardarSyllabus(carrera, datos) {
   try {
      // Usar la función del servicio refactorizado
      return guardarSyllabusFromService(carrera, datos);
   } catch (error) {
      Logger.log(`Error en guardarSyllabus(): ${error.message}`);
      // Fallback al método original si el servicio falla
      return guardarSyllabusOriginal(carrera, datos);
   }
}

/**
 * Función de compatibilidad para cargar datos de syllabus
 * Mantiene compatibilidad con el código original
 * @param {string} codigo - Código del sílabo
 * @returns {Object} Datos del sílabo o respuesta de error
 */
function cargarDatosSyllabus(codigo) {
   try {
      // Usar la función del servicio refactorizado
      return cargarDatosSyllabusFromService(codigo);
   } catch (error) {
      Logger.log(`Error en cargarDatosSyllabus(): ${error.message}`);
      // Fallback al método original si el servicio falla
      return cargarDatosSyllabusOriginal(codigo);
   }
}

/**
 * Función de compatibilidad para actualizar campo de syllabus
 * Mantiene compatibilidad con el código original
 * @param {string} codigo - Código del sílabo
 * @param {string} campo - Campo a actualizar
 * @param {*} valor - Nuevo valor
 * @returns {Object} Resultado de la operación
 */
function actualizarCampoSyllabus(codigo, campo, valor) {
   try {
      // Usar la función del servicio refactorizado
      return actualizarCampoSyllabusFromService(codigo, campo, valor);
   } catch (error) {
      Logger.log(`Error en actualizarCampoSyllabus(): ${error.message}`);
      // Fallback al método original si el servicio falla
      return actualizarCampoSyllabusOriginal(codigo, campo, valor);
   }
}

/**
 * Funciones de servicio refactorizadas
 * Estas funciones llaman a los servicios modulares
 */

function getCarrerasFromService() {
   // Esta función está definida en services/SyllabusService.js
   // Se mantiene aquí para compatibilidad
   try {
      const ss = getSpreadsheet();
      const sheets = ss.getSheets();
      return sheets.map((sheet) => sheet.getName());
   } catch (error) {
      Logger.log(`Error al obtener carreras: ${error.message}`);
      return [];
   }
}

function guardarSyllabusFromService(carrera, datos) {
   // Esta función está definida en services/SyllabusService.js
   // Se mantiene aquí para compatibilidad
   try {
      // Validar datos requeridos
      const requiredFields = ["codigo", "nombreAsignatura"];
      const validation = validateRequiredFields(datos, requiredFields);

      if (!validation.isValid) {
         return createErrorResponse(
            `Campos requeridos faltantes: ${validation.missingFields.join(
               ", "
            )}`
         );
      }

      // Obtener o crear hoja de la carrera
      const headers = [
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
      ];

      const sheet = createSheetIfNotExists(carrera, headers);

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

      // Buscar si el código ya existe
      const data = getSheetData(carrera);
      const codigoIndex = 0; // Asumiendo que el código está en la primera columna (A)
      let rowIndex = -1;

      // Buscar si el código ya existe (empezando desde la fila 1, no la 0 que son headers)
      for (let i = 1; i < data.length; i++) {
         if (
            data[i][codigoIndex] &&
            data[i][codigoIndex].toString() === datos.codigo.toString()
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
         appendSheetRow(carrera, rowData);
         Logger.log(
            `Nueva fila añadida para el código ${
               datos.codigo
            } en la hoja ${sheet.getName()}`
         );
      }

      // Generar documento
      return generarDocumentoSyllabus(carrera, datos);
   } catch (error) {
      Logger.log(`Error al guardar syllabus: ${error.message}`);
      return createErrorResponse(`Error al guardar syllabus: ${error.message}`);
   }
}

function cargarDatosSyllabusFromService(codigo) {
   // Esta función está definida en services/SyllabusService.js
   // Se mantiene aquí para compatibilidad
   try {
      // Validar código
      if (!codigo || codigo === "undefined" || codigo.trim() === "") {
         return createErrorResponse(
            "Código de sílabo no válido o no proporcionado"
         );
      }

      Logger.log(`Cargando datos para código: ${codigo}`);

      const sheet = getSheetByName("ASIGNATURAS");
      if (!sheet) {
         return createErrorResponse("No se encontró la hoja de asignaturas");
      }

      const data = getSheetData("ASIGNATURAS");
      const headers = data[0];

      // Buscar la fila que coincide con el código
      for (let i = 1; i < data.length; i++) {
         const row = data[i];
         if (
            row[0] === codigo ||
            row[1].toLowerCase() === codigo.toLowerCase()
         ) {
            const datos = {};

            // Mapear los datos según los encabezados
            headers.forEach((header, index) => {
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
                  Código: "codigo",
                  "Unidad Código": "unidadCodigo",
                  UnidadN: "unidadn",
                  SubtemaN: "subteman",
                  SubtemaT: "subtemat",
                  Aprendizaje: "aprendizaje",
                  Metodologi: "metodologi",
                  Didácticos: "didacticos",
                  Criterios: "criterios",
                  Bibliografía: "bibliografia",
                  FP: "fp",
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
                        datos[key] = safeJsonParse(row[index], []);
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
                        datos[key] = safeNumberConversion(row[index], 0);
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
                        } else {
                           datos[key] = row[index] || "";
                        }
                     }
                  }
               }
            });

            return createSuccessResponse("Datos cargados exitosamente", datos);
         }
      }

      return createErrorResponse(
         `No se encontró el sílabo con código: ${codigo}`
      );
   } catch (error) {
      Logger.log(`Error al cargar datos: ${error.message}`);
      return createErrorResponse(`Error al cargar datos: ${error.message}`);
   }
}

function actualizarCampoSyllabusFromService(codigo, campo, valor) {
   // Esta función está definida en services/SyllabusService.js
   // Se mantiene aquí para compatibilidad
   try {
      // Validar parámetros
      if (!codigo || !campo) {
         return createErrorResponse("Código y campo son requeridos");
      }

      const sheet = getSheetByName("ASIGNATURAS");
      if (!sheet) {
         return createErrorResponse("No se encontró la hoja de asignaturas");
      }

      const data = getSheetData("ASIGNATURAS");
      const headers = data[0];

      // Buscar la columna del campo
      const campoIndex = headers.findIndex(
         (header) => header.toLowerCase() === campo.toLowerCase()
      );

      if (campoIndex === -1) {
         return createErrorResponse(`Campo '${campo}' no encontrado`);
      }

      // Buscar la fila del código
      const codigoIndex = 0;
      let rowIndex = -1;

      for (let i = 1; i < data.length; i++) {
         if (
            data[i][codigoIndex] &&
            data[i][codigoIndex].toString() === codigo.toString()
         ) {
            rowIndex = i + 1;
            break;
         }
      }

      if (rowIndex === -1) {
         return createErrorResponse(`Código '${codigo}' no encontrado`);
      }

      // Actualizar el campo
      sheet.getRange(rowIndex, campoIndex + 1).setValue(valor);

      Logger.log(
         `Campo '${campo}' actualizado para código '${codigo}' con valor '${valor}'`
      );

      return createSuccessResponse(`Campo '${campo}' actualizado exitosamente`);
   } catch (error) {
      Logger.log(`Error al actualizar campo: ${error.message}`);
      return createErrorResponse(`Error al actualizar campo: ${error.message}`);
   }
}

/**
 * Funciones de fallback originales
 * Se mantienen para compatibilidad en caso de error
 */

function guardarSyllabusOriginal(carrera, datos) {
   // Implementación original de guardarSyllabus
   // Esta función debe estar definida en Código.js
   Logger.log("Usando implementación original de guardarSyllabus");
   return { success: false, message: "Función original no disponible" };
}

function cargarDatosSyllabusOriginal(codigo) {
   // Implementación original de cargarDatosSyllabus
   // Esta función debe estar definida en CargarDatosSyllabus.js
   Logger.log("Usando implementación original de cargarDatosSyllabus");
   return { success: false, message: "Función original no disponible" };
}

function actualizarCampoSyllabusOriginal(codigo, campo, valor) {
   // Implementación original de actualizarCampoSyllabus
   // Esta función debe estar definida en ActualizarCampoSyllabus.js
   Logger.log("Usando implementación original de actualizarCampoSyllabus");
   return { success: false, message: "Función original no disponible" };
}
