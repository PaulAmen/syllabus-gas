# 🔧 PASO 2: Refactorización de Utilidades

## 📋 **Objetivo**

Crear funciones de utilidad reutilizables para mejorar la organización y mantenibilidad del código.

## ✅ **Cambios Realizados**

### **1. Creación de carpeta `utils/`**

-  Se creó la carpeta `utils/` para organizar funciones de utilidad

### **2. Creación de `utils/SpreadsheetUtils.js`**

Funciones para manejo de Google Sheets:

-  `getSpreadsheet()` - Obtiene Spreadsheet por ID
-  `getSheetByName()` - Obtiene hoja por nombre
-  `getSheetData()` - Obtiene todos los datos de una hoja
-  `getSheetHeaders()` - Obtiene headers de una hoja
-  `findRowByColumnValue()` - Busca fila por valor en columna
-  `updateSheetRow()` - Actualiza fila específica
-  `appendSheetRow()` - Agrega nueva fila
-  `createSheetIfNotExists()` - Crea hoja si no existe
-  `getSheetRowCount()` - Obtiene número de filas
-  `getSheetColumnCount()` - Obtiene número de columnas

### **3. Creación de `utils/DataProcessor.js`**

Funciones para procesamiento de datos:

-  `mapRowToObject()` - Mapea fila a objeto
-  `objectToRowArray()` - Convierte objeto a array
-  `validateRequiredFields()` - Valida campos requeridos
-  `cleanString()` - Limpia y normaliza strings
-  `safeNumberConversion()` - Conversión segura a números
-  `safeJsonParse()` - Parseo seguro de JSON
-  `safeJsonStringify()` - Conversión segura a JSON
-  `filterData()` - Filtra array de objetos
-  `sortData()` - Ordena array de objetos
-  `generateUniqueId()` - Genera ID único
-  `formatDate()` - Formatea fechas

### **4. Creación de `utils/HtmlUtils.js`**

Funciones para manejo de HTML:

-  `include()` - Incluye archivo HTML
-  `createTemplate()` - Crea template HTML
-  `renderTemplate()` - Renderiza template
-  `escapeHtml()` - Escapa caracteres HTML
-  `generateSelectOptions()` - Genera opciones de select
-  `generateHtmlAttribute()` - Genera atributo HTML
-  `generateHtmlAttributes()` - Genera múltiples atributos
-  `createResponse()` - Crea respuesta JSON
-  `createSuccessResponse()` - Crea respuesta de éxito
-  `createErrorResponse()` - Crea respuesta de error
-  `sanitizeInput()` - Sanitiza entrada del frontend
-  `generateHtmlId()` - Genera ID único para HTML
-  `objectToDataAttributes()` - Convierte objeto a data-attributes

### **5. Archivo de prueba `config/test-paso2.js`**

-  Se creó archivo de prueba para verificar que las utilidades funcionan
-  Incluye pruebas para cada módulo de utilidades

## 🧪 **Pruebas a Realizar**

### **Antes de continuar, ejecuta estas pruebas en Google Apps Script:**

```javascript
// 1. Prueba completa del Paso 2
testPaso2Completo();

// 2. Pruebas individuales (opcional)
testSpreadsheetUtils();
testDataProcessor();
testHtmlUtils();
```

## ⚠️ **Importante**

**NO se han modificado los archivos originales aún.** Las funciones originales siguen funcionando para mantener la compatibilidad.

## 📝 **Próximos Pasos**

Una vez que confirmes que todo funciona correctamente:

1. **Paso 3**: Crear carpeta `services/` y mover lógica de negocio
2. **Paso 4**: Actualizar referencias en archivos principales
3. **Paso 5**: Limpiar archivos originales

## 🔍 **Verificación**

Si las pruebas pasan correctamente, verás:

-  ✅ Todas las utilidades de Spreadsheet funcionan
-  ✅ Todas las utilidades de procesamiento funcionan
-  ✅ Todas las utilidades de HTML funcionan
-  ✅ Funciones originales siguen disponibles

## 🚨 **Si hay problemas**

Si alguna prueba falla:

1. **NO continúes** con los siguientes pasos
2. **Revisa los logs** de error
3. **Verifica** que las funciones estén disponibles
4. **Contacta** para resolver el problema antes de continuar

## 🎯 **Beneficios de esta Refactorización**

### **Antes:**

```javascript
// Código repetido en múltiples archivos
const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
const sheet = ss.getSheetByName("ASIGNATURAS");
const data = sheet.getDataRange().getValues();
```

### **Después:**

```javascript
// Código reutilizable y más limpio
const data = getSheetData("ASIGNATURAS");
```

### **Ventajas:**

-  ✅ **Reutilización** de código
-  ✅ **Mantenibilidad** mejorada
-  ✅ **Consistencia** en el manejo de datos
-  ✅ **Manejo de errores** centralizado
-  ✅ **Funciones especializadas** para cada tarea

---

**Estado**: ✅ Completado - Esperando verificación
**Siguiente**: ⏳ Pendiente de confirmación
