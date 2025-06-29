/**
 * Utilidades para manejo de Google Sheets
 * Funciones básicas para trabajar con hojas de cálculo
 */

/**
 * Obtiene una hoja de cálculo por ID
 * @param {string} spreadsheetId - ID de la hoja de cálculo
 * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet} Objeto Spreadsheet
 */
function getSpreadsheet(spreadsheetId = SPREADSHEET_ID) {
   try {
      return SpreadsheetApp.openById(spreadsheetId);
   } catch (error) {
      Logger.log(
         `Error al abrir Spreadsheet ${spreadsheetId}: ${error.message}`
      );
      throw error;
   }
}

/**
 * Obtiene una hoja específica por nombre
 * @param {string} sheetName - Nombre de la hoja
 * @param {string} spreadsheetId - ID de la hoja de cálculo (opcional)
 * @returns {GoogleAppsScript.Spreadsheet.Sheet|null} Objeto Sheet o null si no existe
 */
function getSheetByName(sheetName, spreadsheetId = SPREADSHEET_ID) {
   try {
      const ss = getSpreadsheet(spreadsheetId);
      return ss.getSheetByName(sheetName);
   } catch (error) {
      Logger.log(`Error al obtener hoja ${sheetName}: ${error.message}`);
      return null;
   }
}

/**
 * Obtiene todos los datos de una hoja
 * @param {string} sheetName - Nombre de la hoja
 * @param {string} spreadsheetId - ID de la hoja de cálculo (opcional)
 * @returns {Array} Array de arrays con los datos de la hoja
 */
function getSheetData(sheetName, spreadsheetId = SPREADSHEET_ID) {
   try {
      const sheet = getSheetByName(sheetName, spreadsheetId);
      if (!sheet) {
         Logger.log(`Hoja ${sheetName} no encontrada`);
         return [];
      }
      return sheet.getDataRange().getValues();
   } catch (error) {
      Logger.log(`Error al obtener datos de ${sheetName}: ${error.message}`);
      return [];
   }
}

/**
 * Obtiene los headers (primera fila) de una hoja
 * @param {string} sheetName - Nombre de la hoja
 * @param {string} spreadsheetId - ID de la hoja de cálculo (opcional)
 * @returns {Array} Array con los headers
 */
function getSheetHeaders(sheetName, spreadsheetId = SPREADSHEET_ID) {
   try {
      const data = getSheetData(sheetName, spreadsheetId);
      return data.length > 0 ? data[0] : [];
   } catch (error) {
      Logger.log(`Error al obtener headers de ${sheetName}: ${error.message}`);
      return [];
   }
}

/**
 * Busca una fila por valor en una columna específica
 * @param {string} sheetName - Nombre de la hoja
 * @param {number} columnIndex - Índice de la columna (0-based)
 * @param {string} searchValue - Valor a buscar
 * @param {string} spreadsheetId - ID de la hoja de cálculo (opcional)
 * @returns {number} Índice de la fila encontrada (-1 si no se encuentra)
 */
function findRowByColumnValue(
   sheetName,
   columnIndex,
   searchValue,
   spreadsheetId = SPREADSHEET_ID
) {
   try {
      const data = getSheetData(sheetName, spreadsheetId);

      for (let i = 1; i < data.length; i++) {
         // Empezar desde 1 para saltar headers
         const cellValue = data[i][columnIndex];
         if (
            cellValue &&
            cellValue.toString().toLowerCase() === searchValue.toLowerCase()
         ) {
            return i;
         }
      }

      return -1; // No encontrado
   } catch (error) {
      Logger.log(`Error al buscar en ${sheetName}: ${error.message}`);
      return -1;
   }
}

/**
 * Actualiza una fila específica en una hoja
 * @param {string} sheetName - Nombre de la hoja
 * @param {number} rowIndex - Índice de la fila (1-based)
 * @param {Array} rowData - Datos de la fila
 * @param {string} spreadsheetId - ID de la hoja de cálculo (opcional)
 * @returns {boolean} true si se actualizó correctamente
 */
function updateSheetRow(
   sheetName,
   rowIndex,
   rowData,
   spreadsheetId = SPREADSHEET_ID
) {
   try {
      const sheet = getSheetByName(sheetName, spreadsheetId);
      if (!sheet) {
         Logger.log(`Hoja ${sheetName} no encontrada`);
         return false;
      }

      const numColumns = Math.min(rowData.length, sheet.getLastColumn());
      sheet
         .getRange(rowIndex, 1, 1, numColumns)
         .setValues([rowData.slice(0, numColumns)]);

      Logger.log(`Fila ${rowIndex} actualizada en ${sheetName}`);
      return true;
   } catch (error) {
      Logger.log(`Error al actualizar fila en ${sheetName}: ${error.message}`);
      return false;
   }
}

/**
 * Agrega una nueva fila a una hoja
 * @param {string} sheetName - Nombre de la hoja
 * @param {Array} rowData - Datos de la fila
 * @param {string} spreadsheetId - ID de la hoja de cálculo (opcional)
 * @returns {boolean} true si se agregó correctamente
 */
function appendSheetRow(sheetName, rowData, spreadsheetId = SPREADSHEET_ID) {
   try {
      const sheet = getSheetByName(sheetName, spreadsheetId);
      if (!sheet) {
         Logger.log(`Hoja ${sheetName} no encontrada`);
         return false;
      }

      sheet.appendRow(rowData);
      Logger.log(`Nueva fila agregada a ${sheetName}`);
      return true;
   } catch (error) {
      Logger.log(`Error al agregar fila en ${sheetName}: ${error.message}`);
      return false;
   }
}

/**
 * Crea una nueva hoja si no existe
 * @param {string} sheetName - Nombre de la hoja
 * @param {Array} headers - Headers para la nueva hoja
 * @param {string} spreadsheetId - ID de la hoja de cálculo (opcional)
 * @returns {GoogleAppsScript.Spreadsheet.Sheet|null} Objeto Sheet creado o existente
 */
function createSheetIfNotExists(
   sheetName,
   headers = [],
   spreadsheetId = SPREADSHEET_ID
) {
   try {
      const ss = getSpreadsheet(spreadsheetId);
      let sheet = ss.getSheetByName(sheetName);

      if (!sheet) {
         sheet = ss.insertSheet(sheetName);
         Logger.log(`Nueva hoja ${sheetName} creada`);

         if (headers.length > 0) {
            sheet.appendRow(headers);
            Logger.log(`Headers agregados a ${sheetName}`);
         }
      } else {
         Logger.log(`Hoja ${sheetName} ya existe`);
      }

      return sheet;
   } catch (error) {
      Logger.log(`Error al crear hoja ${sheetName}: ${error.message}`);
      return null;
   }
}

/**
 * Obtiene el número de filas con datos en una hoja
 * @param {string} sheetName - Nombre de la hoja
 * @param {string} spreadsheetId - ID de la hoja de cálculo (opcional)
 * @returns {number} Número de filas con datos
 */
function getSheetRowCount(sheetName, spreadsheetId = SPREADSHEET_ID) {
   try {
      const sheet = getSheetByName(sheetName, spreadsheetId);
      if (!sheet) {
         return 0;
      }
      return sheet.getLastRow();
   } catch (error) {
      Logger.log(
         `Error al obtener conteo de filas en ${sheetName}: ${error.message}`
      );
      return 0;
   }
}

/**
 * Obtiene el número de columnas con datos en una hoja
 * @param {string} sheetName - Nombre de la hoja
 * @param {string} spreadsheetId - ID de la hoja de cálculo (opcional)
 * @returns {number} Número de columnas con datos
 */
function getSheetColumnCount(sheetName, spreadsheetId = SPREADSHEET_ID) {
   try {
      const sheet = getSheetByName(sheetName, spreadsheetId);
      if (!sheet) {
         return 0;
      }
      return sheet.getLastColumn();
   } catch (error) {
      Logger.log(
         `Error al obtener conteo de columnas en ${sheetName}: ${error.message}`
      );
      return 0;
   }
}
