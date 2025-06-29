/**
 * Utilidades para manejo de HTML
 * Funciones para trabajar con templates y contenido HTML
 */

/**
 * Incluye un archivo HTML en el template
 * @param {string} filename - Nombre del archivo HTML a incluir
 * @returns {string} Contenido del archivo HTML
 */
function include(filename) {
   try {
      return HtmlService.createHtmlOutputFromFile(filename).getContent();
   } catch (error) {
      Logger.log(`Error al incluir archivo ${filename}: ${error.message}`);
      return `<!-- Error al cargar ${filename} -->`;
   }
}

/**
 * Crea un template HTML con datos
 * @param {string} templateName - Nombre del archivo template
 * @param {Object} data - Datos para el template
 * @returns {GoogleAppsScript.HTML.HtmlTemplate} Template HTML
 */
function createTemplate(templateName, data = {}) {
   try {
      const template = HtmlService.createTemplateFromFile(templateName);

      // Asignar datos al template
      Object.keys(data).forEach((key) => {
         template[key] = data[key];
      });

      return template;
   } catch (error) {
      Logger.log(`Error al crear template ${templateName}: ${error.message}`);
      throw error;
   }
}

/**
 * Renderiza un template HTML
 * @param {string} templateName - Nombre del archivo template
 * @param {Object} data - Datos para el template
 * @returns {GoogleAppsScript.HTML.HtmlOutput} HTML renderizado
 */
function renderTemplate(templateName, data = {}) {
   try {
      const template = createTemplate(templateName, data);
      return template.evaluate();
   } catch (error) {
      Logger.log(
         `Error al renderizar template ${templateName}: ${error.message}`
      );
      throw error;
   }
}

/**
 * Escapa caracteres especiales en HTML
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
   if (!text) return "";

   return text
      .toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
}

/**
 * Genera opciones para un select HTML
 * @param {Array} options - Array de opciones
 * @param {string} selectedValue - Valor seleccionado
 * @param {string} emptyOption - Texto para opción vacía (opcional)
 * @returns {string} HTML de las opciones
 */
function generateSelectOptions(options, selectedValue = "", emptyOption = "") {
   try {
      let html = "";

      if (emptyOption) {
         html += `<option value="">${escapeHtml(emptyOption)}</option>`;
      }

      options.forEach((option) => {
         const value = option.value || option;
         const text = option.text || option;
         const selected =
            value.toString() === selectedValue.toString() ? " selected" : "";

         html += `<option value="${escapeHtml(value)}"${selected}>${escapeHtml(
            text
         )}</option>`;
      });

      return html;
   } catch (error) {
      Logger.log(`Error al generar opciones de select: ${error.message}`);
      return "";
   }
}

/**
 * Genera un atributo HTML de forma segura
 * @param {string} name - Nombre del atributo
 * @param {string} value - Valor del atributo
 * @returns {string} Atributo HTML
 */
function generateHtmlAttribute(name, value) {
   if (!name || !value) return "";
   return `${escapeHtml(name)}="${escapeHtml(value)}"`;
}

/**
 * Genera múltiples atributos HTML
 * @param {Object} attributes - Objeto con atributos
 * @returns {string} String con todos los atributos
 */
function generateHtmlAttributes(attributes) {
   try {
      return Object.keys(attributes)
         .map((key) => generateHtmlAttribute(key, attributes[key]))
         .filter((attr) => attr !== "")
         .join(" ");
   } catch (error) {
      Logger.log(`Error al generar atributos HTML: ${error.message}`);
      return "";
   }
}

/**
 * Crea una respuesta JSON para el frontend
 * @param {boolean} success - Indica si la operación fue exitosa
 * @param {string} message - Mensaje de respuesta
 * @param {*} data - Datos adicionales
 * @returns {Object} Objeto de respuesta
 */
function createResponse(success, message, data = null) {
   return {
      success: success,
      message: message,
      data: data,
      timestamp: new Date().toISOString(),
   };
}

/**
 * Crea una respuesta de éxito
 * @param {string} message - Mensaje de éxito
 * @param {*} data - Datos adicionales
 * @returns {Object} Objeto de respuesta exitosa
 */
function createSuccessResponse(message, data = null) {
   return createResponse(true, message, data);
}

/**
 * Crea una respuesta de error
 * @param {string} message - Mensaje de error
 * @param {*} data - Datos adicionales del error
 * @returns {Object} Objeto de respuesta de error
 */
function createErrorResponse(message, data = null) {
   return createResponse(false, message, data);
}

/**
 * Valida y sanitiza datos de entrada del frontend
 * @param {Object} inputData - Datos de entrada
 * @param {Array} allowedFields - Campos permitidos
 * @returns {Object} Datos sanitizados
 */
function sanitizeInput(inputData, allowedFields = []) {
   try {
      const sanitized = {};

      if (!inputData || typeof inputData !== "object") {
         return sanitized;
      }

      Object.keys(inputData).forEach((key) => {
         if (allowedFields.length === 0 || allowedFields.includes(key)) {
            let value = inputData[key];

            // Sanitizar strings
            if (typeof value === "string") {
               value = value.trim();
               // Remover caracteres potencialmente peligrosos
               value = value.replace(/[<>]/g, "");
            }

            sanitized[key] = value;
         }
      });

      return sanitized;
   } catch (error) {
      Logger.log(`Error al sanitizar entrada: ${error.message}`);
      return {};
   }
}

/**
 * Genera un ID único para elementos HTML
 * @param {string} prefix - Prefijo para el ID
 * @returns {string} ID único
 */
function generateHtmlId(prefix = "element") {
   return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Convierte un objeto a atributos data-* para HTML
 * @param {Object} data - Objeto con datos
 * @returns {string} String con atributos data-*
 */
function objectToDataAttributes(data) {
   try {
      return Object.keys(data)
         .map((key) => {
            const value =
               typeof data[key] === "object"
                  ? JSON.stringify(data[key])
                  : data[key];
            return `data-${key}="${escapeHtml(value)}"`;
         })
         .join(" ");
   } catch (error) {
      Logger.log(
         `Error al convertir objeto a data attributes: ${error.message}`
      );
      return "";
   }
}
