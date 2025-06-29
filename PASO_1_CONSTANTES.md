# 🔧 PASO 1: Refactorización de Constantes

## 📋 **Objetivo**

Mover las constantes del archivo `Código.js` a un archivo separado para mejorar la organización del código.

## ✅ **Cambios Realizados**

### **1. Creación de carpeta `config/`**

-  Se creó la carpeta `config/` para organizar archivos de configuración

### **2. Creación de `config/Constants.js`**

-  Se movieron las constantes principales:
   -  `SPREADSHEET_ID`
   -  `TEMPLATE_DOC_ID`
   -  `FOLDER_ID`
-  Se agregaron constantes adicionales para mejorar la organización:
   -  `APP_TITLE`
   -  `DEFAULT_FACULTAD`
   -  `UNIDADES_ACADEMICAS`
   -  `CAMPOS_FORMACION`
   -  `MODALIDADES`
   -  `SHEET_NAMES`

### **3. Archivo de prueba `config/test-constants.js`**

-  Se creó un archivo de prueba para verificar que todo funciona correctamente
-  Incluye funciones `testConstants()` y `testMainFunctions()`
-  **NUEVO**: Se agregaron funciones de análisis `analizarEstructuraSpreadsheet()` y `probarCargaEspecifica()`

## 🧪 **Pruebas a Realizar**

### **Antes de continuar, ejecuta estas pruebas en Google Apps Script:**

```javascript
// 1. Probar que las constantes están disponibles
testConstants();

// 2. Probar que las funciones principales siguen funcionando
testMainFunctions();

// 3. Analizar la estructura del Spreadsheet (NUEVO)
analizarEstructuraSpreadsheet();

// 4. Probar carga de datos (reemplaza "CODIGO_REAL" con un código que exista)
probarCargaEspecifica("CODIGO_REAL");

// 5. Probar obtención de carreras
getCarreras();
```

## 📊 **Análisis de Estructura Actual**

### **Hojas Detectadas:**

-  **ASIGNATURAS**: Hoja principal con 925 filas (datos de asignaturas)
-  **CONTENIDOS**: Hoja adicional (posiblemente para contenidos de referencia)

### **Función `getCarreras()`:**

Actualmente toma **todos los nombres de hojas** como "carreras", por eso detecta 2 carreras.

### **Plan del Usuario:**

-  Hacer **un programa por cada carrera**
-  Crear **copias** del programa para diferentes carreras
-  Cada carrera tendrá su propio Spreadsheet o estructura

## ⚠️ **Importante**

**NO se han modificado los archivos originales aún.** Las constantes siguen definidas en `Código.js` para mantener la compatibilidad.

## 📝 **Próximos Pasos**

Una vez que confirmes que todo funciona correctamente:

1. **Paso 2**: Crear carpeta `utils/` y mover funciones de utilidad
2. **Paso 3**: Crear carpeta `services/` y mover lógica de negocio
3. **Paso 4**: Actualizar referencias en archivos principales
4. **Paso 5**: Limpiar archivos originales
5. **Paso 6**: Adaptar para múltiples carreras (según tu plan)

## 🔍 **Verificación**

Si las pruebas pasan correctamente, verás:

-  ✅ Todas las constantes definidas
-  ✅ Acceso exitoso al Spreadsheet
-  ✅ Hoja ASIGNATURAS encontrada
-  ✅ Funciones principales disponibles
-  ✅ Carga de datos funcionando
-  ✅ Análisis de estructura completado

## 🚨 **Si hay problemas**

Si alguna prueba falla:

1. **NO continúes** con los siguientes pasos
2. **Revisa los logs** de error
3. **Verifica** que las constantes estén correctas
4. **Contacta** para resolver el problema antes de continuar

## 🎯 **Recomendaciones para Múltiples Carreras**

Basándote en tu plan de "un programa por carrera":

### **Opción 1: Múltiples Spreadsheets**

-  Cada carrera tiene su propio Spreadsheet
-  Copiar el programa completo para cada carrera
-  Cambiar solo el `SPREADSHEET_ID` en cada copia

### **Opción 2: Una hoja por carrera**

-  Mantener un solo Spreadsheet
-  Cada carrera tiene su propia hoja
-  Modificar `getCarreras()` para filtrar hojas de carreras

### **Opción 3: Campo "Carrera" en datos**

-  Mantener una sola hoja ASIGNATURAS
-  Agregar campo "Carrera" a los datos
-  Filtrar por carrera al cargar datos

---

**Estado**: ✅ Completado - Esperando verificación
**Siguiente**: ⏳ Pendiente de confirmación
