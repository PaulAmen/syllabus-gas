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


        // Función para dividir un campo en un array usando el separador |
        function dividirCampo(valor) {
            return valor ? valor.split('|').filter(item => item.trim().length > 0) : [];
        }

        // Procesar todos los campos para las unidades
        
        // Unidad 1
        const subtemasNA = dividirCampo(datos.subtemana);
        const subtemasA = dividirCampo(datos.subtemaa);
        const metodologiaA = dividirCampo(datos.metodologiaa);
        const recursosA = dividirCampo(datos.didacticosa);
        const escenariosA = dividirCampo(datos.aprendizajea);
        const bibliografiaA = dividirCampo(datos.biblioa);
        const fechaA = dividirCampo(datos.fechaa);
        
        // Unidad 2
        const subtemasNB = dividirCampo(datos.subtemanb);
        const subtemasB = dividirCampo(datos.subtemab);
        const metodologiaB = dividirCampo(datos.metodologiab);
        const recursosB = dividirCampo(datos.didacticosb);
        const escenariosB = dividirCampo(datos.aprendizajeb);
        const bibliografiaB = dividirCampo(datos.bibliob);
        const fechaB = dividirCampo(datos.fechab);
        
        // Unidad 3
        const subtemasNC = dividirCampo(datos.subtemanc);
        const subtemasC = dividirCampo(datos.subtemac);
        const metodologiaC = dividirCampo(datos.metodologiac);
        const recursosC = dividirCampo(datos.didacticosc);
        const escenariosC = dividirCampo(datos.aprendizajec);
        const bibliografiaC = dividirCampo(datos.biblioc);
        const fechaC = dividirCampo(datos.fechac);
        
        // Unidad 4
        const subtemasND = dividirCampo(datos.subtemand);
        const subtemasD = dividirCampo(datos.subtemad);
        const metodologiaD = dividirCampo(datos.metodologiad);
        const recursosD = dividirCampo(datos.didacticosd);
        const escenariosD = dividirCampo(datos.aprendizajed);
        const bibliografiaD = dividirCampo(datos.bibliod);
        const fechaD = dividirCampo(datos.fechad);
        
        // Determinar el número máximo de filas para cada unidad
        const maxFilas = 5; // Máximo 5 filas por unidad
        
        // Reemplazar campos para Unidad 1
        for (let i = 1; i <= maxFilas; i++) {
            // Subtema número
            body.replaceText(`{{SUBTEMAN1_${i}}}`, (i <= subtemasNA.length) ? subtemasNA[i-1].trim() : "");
            
            // Contenido del subtema
            body.replaceText(`{{SUBTEMA1_${i}}}`, (i <= subtemasA.length) ? subtemasA[i-1].trim() : "");
            
            // Metodología
            body.replaceText(`{{METODOLOGIA1_${i}}}`, (i <= metodologiaA.length) ? metodologiaA[i-1].trim() : "");
            
            // Recursos didácticos
            body.replaceText(`{{RECURSOS1_${i}}}`, (i <= recursosA.length) ? recursosA[i-1].trim() : "");
            
            // Escenario de aprendizaje
            body.replaceText(`{{ESCENARIO1_${i}}}`, (i <= escenariosA.length) ? escenariosA[i-1].trim() : "");
            
            // Bibliografía
            body.replaceText(`{{BIBLIOGRAFIA1_${i}}}`, (i <= bibliografiaA.length) ? bibliografiaA[i-1].trim() : "");
            
            // Fecha/paralelo
            body.replaceText(`{{FECHA1_${i}}}`, (i <= fechaA.length) ? fechaA[i-1].trim() : "");
        }
        
        // Reemplazar campos para Unidad 2
        for (let i = 1; i <= maxFilas; i++) {
            // Subtema número
            body.replaceText(`{{SUBTEMAN2_${i}}}`, (i <= subtemasNB.length) ? subtemasNB[i-1].trim() : "");
            
            // Contenido del subtema
            body.replaceText(`{{SUBTEMA2_${i}}}`, (i <= subtemasB.length) ? subtemasB[i-1].trim() : "");
            
            // Metodología
            body.replaceText(`{{METODOLOGIA2_${i}}}`, (i <= metodologiaB.length) ? metodologiaB[i-1].trim() : "");
            
            // Recursos didácticos
            body.replaceText(`{{RECURSOS2_${i}}}`, (i <= recursosB.length) ? recursosB[i-1].trim() : "");
            
            // Escenario de aprendizaje
            body.replaceText(`{{ESCENARIO2_${i}}}`, (i <= escenariosB.length) ? escenariosB[i-1].trim() : "");
            
            // Bibliografía
            body.replaceText(`{{BIBLIOGRAFIA2_${i}}}`, (i <= bibliografiaB.length) ? bibliografiaB[i-1].trim() : "");
            
            // Fecha/paralelo
            body.replaceText(`{{FECHA2_${i}}}`, (i <= fechaB.length) ? fechaB[i-1].trim() : "");
        }
        
        // Reemplazar campos para Unidad 3
        for (let i = 1; i <= maxFilas; i++) {
            // Subtema número
            body.replaceText(`{{SUBTEMAN3_${i}}}`, (i <= subtemasNC.length) ? subtemasNC[i-1].trim() : "");
            
            // Contenido del subtema
            body.replaceText(`{{SUBTEMA3_${i}}}`, (i <= subtemasC.length) ? subtemasC[i-1].trim() : "");
            
            // Metodología
            body.replaceText(`{{METODOLOGIA3_${i}}}`, (i <= metodologiaC.length) ? metodologiaC[i-1].trim() : "");
            
            // Recursos didácticos
            body.replaceText(`{{RECURSOS3_${i}}}`, (i <= recursosC.length) ? recursosC[i-1].trim() : "");
            
            // Escenario de aprendizaje
            body.replaceText(`{{ESCENARIO3_${i}}}`, (i <= escenariosC.length) ? escenariosC[i-1].trim() : "");
            
            // Bibliografía
            body.replaceText(`{{BIBLIOGRAFIA3_${i}}}`, (i <= bibliografiaC.length) ? bibliografiaC[i-1].trim() : "");
            
            // Fecha/paralelo
            body.replaceText(`{{FECHA3_${i}}}`, (i <= fechaC.length) ? fechaC[i-1].trim() : "");
        }
        
        // Reemplazar campos para Unidad 4
        for (let i = 1; i <= maxFilas; i++) {
            // Subtema número
            body.replaceText(`{{SUBTEMAN4_${i}}}`, (i <= subtemasND.length) ? subtemasND[i-1].trim() : "");
            
            // Contenido del subtema
            body.replaceText(`{{SUBTEMA4_${i}}}`, (i <= subtemasD.length) ? subtemasD[i-1].trim() : "");
            
            // Metodología
            body.replaceText(`{{METODOLOGIA4_${i}}}`, (i <= metodologiaD.length) ? metodologiaD[i-1].trim() : "");
            
            // Recursos didácticos
            body.replaceText(`{{RECURSOS4_${i}}}`, (i <= recursosD.length) ? recursosD[i-1].trim() : "");
            
            // Escenario de aprendizaje
            body.replaceText(`{{ESCENARIO4_${i}}}`, (i <= escenariosD.length) ? escenariosD[i-1].trim() : "");
            
            // Bibliografía
            body.replaceText(`{{BIBLIOGRAFIA4_${i}}}`, (i <= bibliografiaD.length) ? bibliografiaD[i-1].trim() : "");
            
            // Fecha/paralelo
            body.replaceText(`{{FECHA4_${i}}}`, (i <= fechaD.length) ? fechaD[i-1].trim() : "");
        }
        
        // Resto de reemplazos en el documento
        body.replaceText("{{UNIDADNA}}", datos.unidadna || "");
        body.replaceText("{{RAPRENDIZAJEA}}", datos.raprendizajea || "");
        body.replaceText("{{CRITERIOSA}}", datos.criteriosa || "");

        body.replaceText("{{UNIDADNB}}", datos.unidadnb || "");
        body.replaceText("{{RAPRENDIZAJEB}}", datos.raprendizajeb || "");
        body.replaceText("{{CRITERIOSB}}", datos.criteriosb || "");

        body.replaceText("{{UNIDADNC}}", datos.unidadnc || "");
        body.replaceText("{{RAPRENDIZAJEC}}", datos.raprendizajec || "");
        body.replaceText("{{CRITERIOSC}}", datos.criteriosc || "");

        body.replaceText("{{UNIDADND}}", datos.unidadnd || "");
        body.replaceText("{{RAPRENDIZAJED}}", datos.raprendizajed || "");
        body.replaceText("{{CRITERIOSD}}", datos.criteriosd || "");

        // Limpiar cualquier placeholder no reemplazado (opcional)
        body.replaceText("{{[^}]*}}", "");



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