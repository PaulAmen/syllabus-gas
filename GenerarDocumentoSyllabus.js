function generarDocumentoSyllabus(carrera, datos) {
    try {
        // Check if template ID is set
        if (!TEMPLATE_DOC_ID) {
            throw new Error("El ID del documento plantilla no está configurado.");
        }

        // Get the template file and destination folder
        const templateFile = DriveApp.getFileById(TEMPLATE_DOC_ID);
        const folder = DriveApp.getFolderById(FOLDER_ID);

        if (!templateFile) {
            throw new Error("No se pudo acceder al documento plantilla.");
        }
        if (!folder) {
            throw new Error("No se pudo acceder a la carpeta de destino en Drive.");
        }

        // Create a copy of the template in Drive
        const fileName = datos.nombreAsignatura + " - " + datos.codigo;
        const newFile = templateFile.makeCopy(fileName, folder);
        const docId = newFile.getId();

        // Open the newly created document for editing
        const doc = DocumentApp.openById(docId);
        const body = doc.getBody();

        // Información General - use the actual values from datos instead of empty variables
        body.replaceText("{{CODIGO}}", datos.codigo || "");
        body.replaceText("{{NOMBRE_ASIGNATURA}}", datos.nombreAsignatura || "");
        body.replaceText("{{PRERREQUISITO}}", datos.prerrequisito || "");
        body.replaceText("{{CORREQUISITO}}", datos.correquisito || "");
        body.replaceText("{{FACULTAD}}", datos.facultad || "");
        body.replaceText("{{CARRERA}}", carrera || "");
        body.replaceText("{{UNIDAD}}", datos.unidad || "");
        body.replaceText("{{CAMPO_FORMACION}}", datos.campoFormacion || "");
        body.replaceText("{{MODALIDAD}}", datos.modalidad || "");
        body.replaceText("{{PERIODO}}", datos.periodo || "");
        body.replaceText("{{NIVEL}}", datos.nivel || "");
        body.replaceText("{{PARALELOS}}", datos.paralelos || "");
        body.replaceText("{{HORARIOC}}", datos.horarioc || "");
        body.replaceText("{{HORARIOT}}", datos.horariot || "");
        body.replaceText("{{DOCENTE}}", datos.nombreDocente || "");
        body.replaceText("{{PERFIL}}", datos.perfilDocente || "");

        // Carga Horaria
        body.replaceText("{{TOTALH}}", datos.totalHoras || "");
        body.replaceText("{{HORASD}}", datos.horasDocencia || "");
        body.replaceText("{{HORASP}}", datos.horasPresencial || "");
        body.replaceText("{{HORASS}}", datos.horass || "");
        body.replaceText("{{PAE}}", datos.horasPAE || "");
        body.replaceText("{{TA}}", datos.horasTA || "");
        body.replaceText("{{PPP}}", datos.horasPPP || "");
        body.replaceText("{{HVS}}", datos.horasHVS || "");
        body.replaceText("{{UNIDADN}}", datos.unidadn || "");

        // Componentes Académicos
        body.replaceText("{{CARACTERIZACION}}", datos.caracterizacion || "");
        body.replaceText("{{APORTE_PERFIL}}", datos.aportePerfil || "");
        body.replaceText("{{OBJETIVOS}}", datos.objetivos || "");

        // Competencias
        if (datos.competencias) {
            let competenciasText = "";
            if (Array.isArray(datos.competencias)) {
                competenciasText = datos.competencias.map((comp, index) => `${index + 1}. ${comp}`).join("\n");
            } else {
                competenciasText = datos.competencias;
            }
            body.replaceText("{{COMPETENCIAS}}", competenciasText);
        } else {
            body.replaceText("{{COMPETENCIAS}}", "");
        }

        // Resultados de aprendizaje
        body.replaceText("{{ACTITUDINALES}}", datos.actitudinales || "");
        body.replaceText("{{COGNITIVOS}}", datos.cognitivos || "");
        body.replaceText("{{PROCEDIMENTALES}}", datos.procedimentales || "");

        body.replaceText("{{UT1}}", datos.ut1 || "");
        body.replaceText("{{UT2}}", datos.ut2 || "");
        body.replaceText("{{UT3}}", datos.ut3 || "");
        body.replaceText("{{UT4}}", datos.ut4 || "");
        body.replaceText("{{METODOLOGIA}}", datos.metodologia || "");
        body.replaceText("{{EVALUACION}}", datos.evaluacion || "");
        body.replaceText("{{BASICA}}", datos.basica || "");
        body.replaceText("{{COMPLEMENTARIA}}", datos.complementaria || "");

        // Unidades temáticas - corrected duplicate
        // body.replaceText("{{HVS}}", datos.horasHVS || ""); // Already replaced above

        // REEMPLAZAR EN EL DOCUMENTO UNIDAD 1
        body.replaceText("{{UNIDADNA}}", datos.unidadna || "");
        body.replaceText("{{UNIDADGA}}", datos.unidadga || "");
        body.replaceText("{{SUBTEMANA}}", datos.subtemana || "");
        body.replaceText("{{SUBTEMAA}}", datos.subtemaa || "");
        body.replaceText("{{RAPRENDIZAJEA}}", datos.raprendizajea || "");
        body.replaceText("{{METODOLOGIAA}}", datos.metodologiaa || "");
        body.replaceText("{{DIDACTICOSA}}", datos.didacticosa || "");
        body.replaceText("{{CRITERIOSA}}", datos.criteriosa || "");
        body.replaceText("{{APRENDIZAJEA}}", datos.aprendizajea || "");
        body.replaceText("{{BIBLIOA}}", datos.biblioa || "");
        body.replaceText("{{FECHAA}}", datos.fechaa || "");

        // REEMPLAZAR EN EL DOCUMENTO UNIDAD 2
        body.replaceText("{{UNIDADNB}}", datos.unidadnb || "");
        body.replaceText("{{UNIDADGB}}", datos.unidadgb || "");
        body.replaceText("{{SUBTEMANB}}", datos.subtemanb || "");
        body.replaceText("{{SUBTEMAB}}", datos.subtemab || "");
        body.replaceText("{{RAPRENDIZAJEB}}", datos.raprendizajeb || "");
        body.replaceText("{{METODOLOGIAB}}", datos.metodologiab || "");
        body.replaceText("{{DIDACTICOSB}}", datos.didacticosb || "");
        body.replaceText("{{CRITERIOSB}}", datos.criteriosb || "");
        body.replaceText("{{APRENDIZAJEB}}", datos.aprendizajeb || "");
        body.replaceText("{{BIBLIOGRAFIAB}}", datos.bibliob || "");
        body.replaceText("{{FECHAB}}", datos.fechab || "");

        // REEMPLAZAR EN EL DOCUMENTO UNIDAD 3
        body.replaceText("{{UNIDADNC}}", datos.unidadnc || "");
        body.replaceText("{{UNIDADGC}}", datos.unidadgc || "");
        body.replaceText("{{SUBTEMANC}}", datos.subtemanc || "");
        body.replaceText("{{SUBTEMAC}}", datos.subtemac || "");
        body.replaceText("{{RAPRENDIZAJEC}}", datos.raprendizajec || "");
        // Fixed the typo in metodologiac vs. metologiac
        body.replaceText("{{METODOLOGIAC}}", datos.metodologiac || "");
        body.replaceText("{{DIDACTICOSC}}", datos.didacticosc || "");
        body.replaceText("{{CRITERIOSC}}", datos.criteriosc || "");
        body.replaceText("{{APRENDIZAJEC}}", datos.aprendizajec || "");
        body.replaceText("{{BIBLIOGRAFIAC}}", datos.biblioc || "");
        body.replaceText("{{FECHAC}}", datos.fechac || "");

        // REEMPLAZAR EN EL DOCUMENTO UNIDAD 4
        body.replaceText("{{UNIDADND}}", datos.unidadnd || "");
        body.replaceText("{{UNIDADGD}}", datos.unidadgd || "");
        body.replaceText("{{SUBTEMAND}}", datos.subtemand || "");
        body.replaceText("{{SUBTEMAD}}", datos.subtemad || "");
        body.replaceText("{{RAPRENDIZAJED}}", datos.raprendizajed || "");
        // Fixed the typo in metodologiad vs. metologiad
        body.replaceText("{{METODOLOGIAD}}", datos.metodologiad || "");
        body.replaceText("{{DIDACTICOSD}}", datos.didacticosd || "");
        body.replaceText("{{CRITERIOSD}}", datos.criteriosd || "");
        body.replaceText("{{APRENDIZAJED}}", datos.aprendizajed || "");
        body.replaceText("{{BIBLIOGRAFIAD}}", datos.bibliod || "");
        body.replaceText("{{FECHAD}}", datos.fechad || "");

        // Save the document and return the ID
        doc.saveAndClose();
        return { success: true, fileId: docId };
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}