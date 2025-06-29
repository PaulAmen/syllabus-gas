/**
 * Utilidades para procesamiento de datos
 * Funciones para manipular y transformar datos
 */

/**
 * Mapea datos de una fila según los headers proporcionados
 * @param {Array} headers - Array de headers
 * @param {Array} rowData - Array de datos de la fila
 * @param {Object} fieldMapping - Mapeo de campos (opcional)
 * @returns {Object} Objeto con datos mapeados
 */
function mapRowToObject(headers, rowData, fieldMapping = {}) {
   try {
      const mappedData = {};

      headers.forEach((header, index) => {
         if (header && header.toString().trim() !== "") {
            const key = fieldMapping[header] || header;
            let value = rowData[index];

            // Procesar valores especiales
            if (value === null || value === undefined) {
               value = "";
            } else if (typeof value === "string") {
               value = value.trim();
            }

            mappedData[key] = value;
         }
      });

      return mappedData;
   } catch (error) {
      Logger.log(`Error al mapear fila: ${error.message}`);
      return {};
   }
}

/**
 * Convierte un objeto a array para guardar en hoja
 * @param {Object} dataObject - Objeto con datos
 * @param {Array} headers - Array de headers en orden
 * @param {Object} reverseMapping - Mapeo inverso de campos (opcional)
 * @returns {Array} Array con datos en el orden de los headers
 */
function objectToRowArray(dataObject, headers, reverseMapping = {}) {
   try {
      return headers.map((header) => {
         const key = reverseMapping[header] || header;
         return dataObject[key] || "";
      });
   } catch (error) {
      Logger.log(`Error al convertir objeto a array: ${error.message}`);
      return [];
   }
}

/**
 * Valida que un objeto tenga los campos requeridos
 * @param {Object} data - Objeto a validar
 * @param {Array} requiredFields - Array de campos requeridos
 * @returns {Object} Resultado de validación {isValid, missingFields}
 */
function validateRequiredFields(data, requiredFields) {
   try {
      const missingFields = [];

      requiredFields.forEach((field) => {
         if (!data[field] || data[field].toString().trim() === "") {
            missingFields.push(field);
         }
      });

      return {
         isValid: missingFields.length === 0,
         missingFields: missingFields,
      };
   } catch (error) {
      Logger.log(`Error en validación: ${error.message}`);
      return {
         isValid: false,
         missingFields: ["Error de validación"],
      };
   }
}

/**
 * Limpia y normaliza un string
 * @param {string} text - Texto a limpiar
 * @returns {string} Texto limpio
 */
function cleanString(text) {
   if (!text) return "";

   return text
      .toString()
      .trim()
      .replace(/\s+/g, " ") // Reemplazar múltiples espacios con uno
      .replace(/[^\w\s\-.,;:()]/g, ""); // Remover caracteres especiales excepto algunos
}

/**
 * Convierte un valor a número de forma segura
 * @param {*} value - Valor a convertir
 * @param {number} defaultValue - Valor por defecto si la conversión falla
 * @returns {number} Número convertido
 */
function safeNumberConversion(value, defaultValue = 0) {
   try {
      if (value === null || value === undefined || value === "") {
         return defaultValue;
      }

      const num = Number(value);
      return isNaN(num) ? defaultValue : num;
   } catch (error) {
      Logger.log(`Error al convertir a número: ${error.message}`);
      return defaultValue;
   }
}

/**
 * Parsea JSON de forma segura
 * @param {string} jsonString - String JSON a parsear
 * @param {*} defaultValue - Valor por defecto si el parseo falla
 * @returns {*} Objeto parseado o valor por defecto
 */
function safeJsonParse(jsonString, defaultValue = null) {
   try {
      if (!jsonString || typeof jsonString !== "string") {
         return defaultValue;
      }

      return JSON.parse(jsonString);
   } catch (error) {
      Logger.log(`Error al parsear JSON: ${error.message}`);
      return defaultValue;
   }
}

/**
 * Convierte un objeto a JSON string de forma segura
 * @param {Object} obj - Objeto a convertir
 * @returns {string} JSON string o string vacío si falla
 */
function safeJsonStringify(obj) {
   try {
      if (!obj) return "";
      return JSON.stringify(obj);
   } catch (error) {
      Logger.log(`Error al convertir a JSON: ${error.message}`);
      return "";
   }
}

/**
 * Filtra un array de objetos por criterios específicos
 * @param {Array} data - Array de objetos a filtrar
 * @param {Object} filters - Objeto con criterios de filtrado
 * @returns {Array} Array filtrado
 */
function filterData(data, filters) {
   try {
      return data.filter((item) => {
         return Object.keys(filters).every((key) => {
            const filterValue = filters[key];
            const itemValue = item[key];

            if (filterValue === null || filterValue === undefined) {
               return true; // No filtrar si el valor es null/undefined
            }

            if (typeof filterValue === "string") {
               return (
                  itemValue &&
                  itemValue
                     .toString()
                     .toLowerCase()
                     .includes(filterValue.toLowerCase())
               );
            }

            return itemValue === filterValue;
         });
      });
   } catch (error) {
      Logger.log(`Error al filtrar datos: ${error.message}`);
      return [];
   }
}

/**
 * Ordena un array de objetos por un campo específico
 * @param {Array} data - Array de objetos a ordenar
 * @param {string} sortField - Campo por el cual ordenar
 * @param {boolean} ascending - true para orden ascendente, false para descendente
 * @returns {Array} Array ordenado
 */
function sortData(data, sortField, ascending = true) {
   try {
      return data.sort((a, b) => {
         const aValue = a[sortField];
         const bValue = b[sortField];

         if (aValue === bValue) return 0;

         let comparison = 0;
         if (typeof aValue === "string" && typeof bValue === "string") {
            comparison = aValue.localeCompare(bValue);
         } else {
            comparison = aValue < bValue ? -1 : 1;
         }

         return ascending ? comparison : -comparison;
      });
   } catch (error) {
      Logger.log(`Error al ordenar datos: ${error.message}`);
      return data;
   }
}

/**
 * Genera un ID único simple
 * @param {string} prefix - Prefijo para el ID
 * @returns {string} ID único
 */
function generateUniqueId(prefix = "") {
   try {
      const timestamp = new Date().getTime();
      const random = Math.random().toString(36).substr(2, 9);
      return `${prefix}${timestamp}_${random}`;
   } catch (error) {
      Logger.log(`Error al generar ID: ${error.message}`);
      return `${prefix}${Date.now()}`;
   }
}

/**
 * Formatea una fecha para mostrar
 * @param {Date|string} date - Fecha a formatear
 * @param {string} format - Formato deseado ('short', 'long', 'iso')
 * @returns {string} Fecha formateada
 */
function formatDate(date, format = "short") {
   try {
      if (!date) return "";

      const dateObj = typeof date === "string" ? new Date(date) : date;

      if (isNaN(dateObj.getTime())) {
         return "";
      }

      switch (format) {
         case "long":
            return dateObj.toLocaleDateString("es-ES", {
               year: "numeric",
               month: "long",
               day: "numeric",
            });
         case "iso":
            return dateObj.toISOString();
         case "short":
         default:
            return dateObj.toLocaleDateString("es-ES");
      }
   } catch (error) {
      Logger.log(`Error al formatear fecha: ${error.message}`);
      return "";
   }
}
