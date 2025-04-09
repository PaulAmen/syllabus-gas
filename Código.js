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
            "Unidad curricular",
            "Campo de formación",
            "Modalidad",
            "Periodo académico",
            "Nivel",
            "Paralelos",
            "Horario de clases",
            "Horario de tutorías",
            "Nombre del docente",
            "Perfil del docente",
            "Total horas",
            "Horas de docencia",
            "Horas presencial",
            "Horas sincrónica",
            "Horas PAE",
            "Horas TA",
            "Horas PPP",
            "Horas HVS",
            "Caracterización",
            "Aporte al perfil",
            "Objetivos",
            "Competencias",
            "Resultados actitudinales",
            "Resultados cognitivos",
            "Resultados procedimentales",
            "Contenidos generales",
            "Metodología",
            "Evaluación",
            "Bibliografía básica",
            "Bibliografía complementaria",
            "Unidades temáticas",
            "Fecha de creación",
         ]);
      }

      // Preparar datos para la hoja de cálculo
      const rowData = [
         datos.codigo,
         datos.nombreAsignatura,
         datos.prerrequisito,
         datos.correquisito,
         datos.facultad,
         datos.unidadCurricular,
         datos.campoFormacion,
         datos.modalidad,
         datos.periodo,
         datos.nivel,
         datos.paralelos,
         datos.horarioClases,
         datos.horarioTutorias,
         datos.nombreDocente,
         datos.perfilDocente,
         datos.totalHoras,
         datos.horasDocencia,
         datos.horasPresencial,
         datos.horasSincronica,
         datos.horasPAE,
         datos.horasTA,
         datos.horasPPP,
         datos.horasHVS,
         datos.caracterizacion,
         datos.aportePerfil,
         datos.objetivos,
         JSON.stringify(datos.competencias),
         JSON.stringify(datos.resultadosActitudinales),
         JSON.stringify(datos.resultadosCognitivos),
         JSON.stringify(datos.resultadosProcedimentales),
         datos.contenidos,
         datos.metodologia,
         datos.evaluacion,
         datos.bibliografiaBasica,
         datos.bibliografiaComplementaria,
         JSON.stringify({
            nombres: datos.nombreUnidad,
            subtemas: datos.subtemas,
            resultados: datos.resultadosUnidad,
            metodologias: datos.metodologiasUnidad,
            recursos: datos.recursosUnidad,
            criterios: datos.criteriosUnidad,
            instrumentos: datos.instrumentosUnidad,
            escenarios: datos.escenarioUnidad,
            fuentes: datos.fuentesUnidad,
            fechas: datos.fechasUnidad,
         }),
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
      body.replaceText("{{UNIDAD_CURRICULAR}}", datos.unidadCurricular);
      body.replaceText("{{CAMPO_FORMACION}}", datos.campoFormacion);
      body.replaceText("{{MODALIDAD}}", datos.modalidad);
      body.replaceText("{{PERIODO}}", datos.periodo);
      body.replaceText("{{NIVEL}}", datos.nivel);
      body.replaceText("{{PARALELOS}}", datos.paralelos);
      body.replaceText("{{HORARIO_CLASES}}", datos.horarioClases);
      body.replaceText("{{HORARIO_TUTORIAS}}", datos.horarioTutorias);
      body.replaceText("{{NOMBRE_DOCENTE}}", datos.nombreDocente);
      body.replaceText("{{PERFIL_DOCENTE}}", datos.perfilDocente);

      // Carga Horaria
      body.replaceText("{{TOTAL_HORAS}}", datos.totalHoras);
      body.replaceText("{{HORAS_DOCENCIA}}", datos.horasDocencia);
      body.replaceText("{{HORAS_PRESENCIAL}}", datos.horasPresencial);
      body.replaceText("{{HORAS_SINCRONICA}}", datos.horasSincronica);
      body.replaceText("{{HORAS_PAE}}", datos.horasPAE);
      body.replaceText("{{HORAS_TA}}", datos.horasTA);
      body.replaceText("{{HORAS_PPP}}", datos.horasPPP);
      body.replaceText("{{HORAS_HVS}}", datos.horasHVS);

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
      const resultadosActitudinalesText = datos.resultadosActitudinales
         .map((res, index) => `${index + 1}. ${res}`)
         .join("\n");
      const resultadosCognitivosText = datos.resultadosCognitivos
         .map((res, index) => `${index + 1}. ${res}`)
         .join("\n");
      const resultadosProcedimentalesText = datos.resultadosProcedimentales
         .map((res, index) => `${index + 1}. ${res}`)
         .join("\n");

      body.replaceText(
         "{{RESULTADOS_ACTITUDINALES}}",
         resultadosActitudinalesText
      );
      body.replaceText("{{RESULTADOS_COGNITIVOS}}", resultadosCognitivosText);
      body.replaceText(
         "{{RESULTADOS_PROCEDIMENTALES}}",
         resultadosProcedimentalesText
      );

      body.replaceText("{{CONTENIDOS}}", datos.contenidos);
      body.replaceText("{{METODOLOGIA}}", datos.metodologia);
      body.replaceText("{{EVALUACION}}", datos.evaluacion);
      body.replaceText("{{BIBLIOGRAFIA_BASICA}}", datos.bibliografiaBasica);
      body.replaceText(
         "{{BIBLIOGRAFIA_COMPLEMENTARIA}}",
         datos.bibliografiaComplementaria
      );

      // Unidades temáticas
      let unidadesText = "";
      for (let i = 0; i < datos.nombreUnidad.length; i++) {
         unidadesText += `\nUnidad ${i + 1}: ${datos.nombreUnidad[i]}\n`;
         unidadesText += `Subtemas:\n${datos.subtemas[i]}\n`;
         unidadesText += `Resultados de aprendizaje:\n${datos.resultadosUnidad[i]}\n`;
         unidadesText += `Metodologías:\n${datos.metodologiasUnidad[i]}\n`;
         unidadesText += `Recursos:\n${datos.recursosUnidad[i]}\n`;
         unidadesText += `Criterios de evaluación:\n${datos.criteriosUnidad[i]}\n`;
         unidadesText += `Instrumentos de evaluación:\n${datos.instrumentosUnidad[i]}\n`;
         unidadesText += `Escenario: ${datos.escenarioUnidad[i]}\n`;
         unidadesText += `Fuentes de consulta:\n${datos.fuentesUnidad[i]}\n`;
         unidadesText += `Fechas:\n${datos.fechasUnidad[i]}\n`;
         unidadesText += "----------------------------------------\n";
      }
      body.replaceText("{{UNIDADES_TEMATICAS}}", unidadesText);

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
   let logs = "";
   try {
      logs += logDatos(
         "Iniciando búsqueda de asignatura con código: " + codigo
      );

      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName("ASIGNATURAS");

      if (!sheet) {
         logs += logDatos("No se encontró la hoja ASIGNATURAS");
         return {
            success: false,
            message: "No se encontró la hoja ASIGNATURAS",
            logs: logs,
         };
      }

      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      logs += logDatos("Headers encontrados: " + headers.join(", "));

      let datos = {};
      let encontrado = false;

      for (let i = 1; i < data.length; i++) {
         const row = data[i];
         if (row[0] === codigo) {
            logs += logDatos("Asignatura encontrada en la fila: " + (i + 1));
            encontrado = true;

            for (let j = 0; j < headers.length; j++) {
               const header = headers[j];
               const value = row[j];

               try {
                  if (
                     header === "competencias" ||
                     header === "resultados" ||
                     header === "unidadesTematicas"
                  ) {
                     datos[header] = JSON.parse(value || "[]");
                     logs += logDatos(
                        `Campo ${header} procesado como JSON: ${JSON.stringify(
                           datos[header]
                        )}`
                     );
                  } else if (
                     header === "creditos" ||
                     header === "horasPresenciales" ||
                     header === "horasAutonomas"
                  ) {
                     datos[header] = parseFloat(value) || 0;
                     logs += logDatos(
                        `Campo ${header} procesado como número: ${datos[header]}`
                     );
                  } else {
                     datos[header] = value || "";
                     logs += logDatos(
                        `Campo ${header} procesado como texto: ${datos[header]}`
                     );
                  }
               } catch (error) {
                  logs += logDatos(
                     `Error procesando campo ${header}: ${error.message}`
                  );
                  datos[header] = "";
               }
            }
            break;
         }
      }

      if (!encontrado) {
         logs += logDatos(
            "No se encontró la asignatura con el código proporcionado"
         );
         return {
            success: false,
            message: "No se encontró la asignatura con el código proporcionado",
            logs: logs,
         };
      }

      logs += logDatos("Datos cargados exitosamente");
      return { success: true, data: datos, logs: logs };
   } catch (error) {
      logs += logDatos("Error general: " + error.message);
      return {
         success: false,
         message: "Error al cargar los datos: " + error.message,
         logs: logs,
      };
   }
}

// Función para logging
function logDatos(mensaje) {
   const timestamp = new Date().toLocaleString();
   let logMessage = `[${timestamp}] ${mensaje}\n`;

   // Retornar el mensaje de log para mostrarlo en el cliente
   return logMessage;
}

// Función para obtener los logs
function getLogs() {
   return "Logs iniciados...";
}
