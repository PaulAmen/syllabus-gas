# 📚 **API Documentation - Generador de Syllabus Académico**

Documentación completa de la API del sistema de generación de sílabos académicos.

## 🎯 **Descripción General**

La API del Generador de Syllabus Académico proporciona funciones para gestionar sílabos académicos, incluyendo creación, lectura, actualización y eliminación de datos. Todas las funciones están optimizadas para trabajar con Google Sheets como base de datos.

## 🔧 **Configuración Base**

### **Constantes Requeridas**

```javascript
// config/Constants.js
const SPREADSHEET_ID = "1byVwunHRmWbgf0XOeOkHQNW6eiTZ-n4NO_61pb0mYcc";
const TEMPLATE_DOC_ID = "19D3axgYKdKyf-C6O7yg2T8j3DLQjs8OyhEirmo3tXLk";
const FOLDER_ID = "1kqGZPLQCxnod_zk2GqPhk9y6d06jOYWo";
```

## 📋 **Funciones Principales**

### **1. getCarreras()**

Obtiene la lista de carreras disponibles en el sistema.

#### **Sintaxis**

```javascript
function getCarreras()
```

#### **Parámetros**

Ninguno

#### **Retorna**

```javascript
Array<string> // Array con nombres de las carreras
```

#### **Ejemplo**

```javascript
const carreras = getCarreras();
console.log(carreras);
// Output: ['CONTENIDOS', 'ASIGNATURAS']
```

#### **Códigos de Error**

-  Ninguno (siempre retorna array, puede estar vacío)

---

### **2. cargarDatosSyllabus(codigo)**

Carga los datos de un sílabo específico por su código.

#### **Sintaxis**

```javascript
function cargarDatosSyllabus(codigo)
```

#### **Parámetros**

| Parámetro | Tipo     | Requerido | Descripción                          |
| --------- | -------- | --------- | ------------------------------------ |
| `codigo`  | `string` | ✅        | Código de la asignatura (ej: "TI35") |

#### **Retorna**

```javascript
{
  success: boolean,
  data?: {
    codigo: string,
    nombreAsignatura: string,
    prerrequisito: string,
    correquisito: string,
    facultad: string,
    unidad: string,
    campoFormacion: string,
    modalidad: string,
    periodo: string,
    nivel: string,
    paralelos: string,
    horarioc: string,
    horariot: string,
    nombreDocente: string,
    perfilDocente: string,
    totalHoras: number,
    horasDocencia: number,
    horasPresencial: number,
    horass: number,
    horasPAE: number,
    horasTA: number,
    horasPPP: number,
    horasHVS: number,
    caracterizacion: string,
    aportePerfil: string,
    objetivos: string,
    competencias: string,
    cognitivos: string,
    procedimentales: string,
    contenidos: string,
    ut1: string,
    ut2: string,
    ut3: string,
    ut4: string,
    metodologia: string,
    evaluacion: string,
    basica: string,
    complementaria: string,
    // Campos de unidades temáticas
    unidadna: string,
    unidadga: string,
    subtemana: string,
    subtemaa: string,
    raprendizajea: string,
    metodologiaa: string,
    didacticosa: string,
    criteriosa: string,
    aprendizajea: string,
    biblioa: string,
    fechaa: string,
    // ... campos similares para unidades B, C, D
    planificacionData: string
  },
  message?: string
}
```

#### **Ejemplo**

```javascript
const resultado = cargarDatosSyllabus("TI35");
if (resultado.success) {
   console.log("Asignatura:", resultado.data.nombreAsignatura);
   console.log("Docente:", resultado.data.nombreDocente);
} else {
   console.log("Error:", resultado.message);
}
```

#### **Códigos de Error**

-  `"Código de sílabo no válido o no proporcionado"`
-  `"No se encontró la hoja de asignaturas"`
-  `"No se encontró el sílabo con código: [codigo]"`

---

### **3. actualizarCampoSyllabus(codigo, campo, valor)**

Actualiza un campo específico de un sílabo.

#### **Sintaxis**

```javascript
function actualizarCampoSyllabus(codigo, campo, valor)
```

#### **Parámetros**

| Parámetro | Tipo     | Requerido | Descripción                   |
| --------- | -------- | --------- | ----------------------------- |
| `codigo`  | `string` | ✅        | Código de la asignatura       |
| `campo`   | `string` | ✅        | Nombre del campo a actualizar |
| `valor`   | `*`      | ✅        | Nuevo valor para el campo     |

#### **Retorna**

```javascript
{
  success: boolean,
  message: string
}
```

#### **Ejemplo**

```javascript
const resultado = actualizarCampoSyllabus("TI35", "Docente", "Dr. Juan Pérez");
if (resultado.success) {
   console.log("Campo actualizado correctamente");
} else {
   console.log("Error:", resultado.message);
}
```

#### **Códigos de Error**

-  `"Código y campo son requeridos"`
-  `"No se encontró la hoja de asignaturas"`
-  `"Campo '[campo]' no encontrado"`
-  `"Código '[codigo]' no encontrado"`

---

### **4. guardarSyllabus(carrera, datos)**

Guarda o actualiza un sílabo completo.

#### **Sintaxis**

```javascript
function guardarSyllabus(carrera, datos)
```

#### **Parámetros**

| Parámetro | Tipo     | Requerido | Descripción                           |
| --------- | -------- | --------- | ------------------------------------- |
| `carrera` | `string` | ✅        | Nombre de la carrera/hoja             |
| `datos`   | `object` | ✅        | Objeto con todos los datos del sílabo |

#### **Estructura de datos**

```javascript
{
  codigo: string,              // Requerido
  nombreAsignatura: string,    // Requerido
  prerrequisito: string,
  correquisito: string,
  facultad: string,
  unidad: string,
  campoFormacion: string,
  modalidad: string,
  periodo: string,
  nivel: string,
  paralelos: string,
  horarioc: string,
  horariot: string,
  nombreDocente: string,
  perfilDocente: string,
  totalHoras: number,
  horasDocencia: number,
  horasPresencial: number,
  horass: number,
  horasPAE: number,
  horasTA: number,
  horasPPP: number,
  horasHVS: number,
  caracterizacion: string,
  aportePerfil: string,
  objetivos: string,
  competencias: string,
  cognitivos: string,
  procedimentales: string,
  contenidos: string,
  ut1: string,
  ut2: string,
  ut3: string,
  ut4: string,
  metodologia: string,
  evaluacion: string,
  basica: string,
  complementaria: string,
  // Campos de unidades temáticas
  unidadna: string,
  unidadga: string,
  subtemana: string,
  subtemaa: string,
  raprendizajea: string,
  metodologiaa: string,
  didacticosa: string,
  criteriosa: string,
  aprendizajea: string,
  biblioa: string,
  fechaa: string,
  // ... campos similares para unidades B, C, D
  planificacionData: string
}
```

#### **Retorna**

```javascript
{
  success: boolean,
  message: string,
  data?: object // Datos del documento generado
}
```

#### **Ejemplo**

```javascript
const datosSyllabus = {
   codigo: "TI35",
   nombreAsignatura: "Administración de Servidores",
   nombreDocente: "Dr. Juan Pérez",
   totalHoras: 80,
   // ... otros campos
};

const resultado = guardarSyllabus("ASIGNATURAS", datosSyllabus);
if (resultado.success) {
   console.log("Syllabus guardado correctamente");
} else {
   console.log("Error:", resultado.message);
}
```

#### **Códigos de Error**

-  `"Campos requeridos faltantes: [campos]"`
-  `"Error al guardar syllabus: [error]"`

---

## 🛠️ **Funciones de Utilidad**

### **getSpreadsheet()**

Obtiene la instancia del spreadsheet principal.

#### **Sintaxis**

```javascript
function getSpreadsheet()
```

#### **Retorna**

```javascript
Spreadsheet; // Instancia de Google Sheets
```

---

### **getSheetData(sheetName)**

Obtiene todos los datos de una hoja específica.

#### **Sintaxis**

```javascript
function getSheetData(sheetName)
```

#### **Parámetros**

| Parámetro   | Tipo     | Requerido | Descripción       |
| ----------- | -------- | --------- | ----------------- |
| `sheetName` | `string` | ✅        | Nombre de la hoja |

#### **Retorna**

```javascript
Array<Array<any>> // Array de filas con datos
```

---

### **createSuccessResponse(message, data)**

Crea una respuesta de éxito estandarizada.

#### **Sintaxis**

```javascript
function createSuccessResponse(message, data)
```

#### **Parámetros**

| Parámetro | Tipo     | Requerido | Descripción       |
| --------- | -------- | --------- | ----------------- |
| `message` | `string` | ✅        | Mensaje de éxito  |
| `data`    | `*`      | ❌        | Datos adicionales |

#### **Retorna**

```javascript
{
  success: true,
  message: string,
  data?: *
}
```

---

### **createErrorResponse(message)**

Crea una respuesta de error estandarizada.

#### **Sintaxis**

```javascript
function createErrorResponse(message)
```

#### **Parámetros**

| Parámetro | Tipo     | Requerido | Descripción      |
| --------- | -------- | --------- | ---------------- |
| `message` | `string` | ✅        | Mensaje de error |

#### **Retorna**

```javascript
{
  success: false,
  message: string
}
```

---

### **validateRequiredFields(data, requiredFields)**

Valida que los campos requeridos estén presentes.

#### **Sintaxis**

```javascript
function validateRequiredFields(data, requiredFields)
```

#### **Parámetros**

| Parámetro        | Tipo            | Requerido | Descripción                |
| ---------------- | --------------- | --------- | -------------------------- |
| `data`           | `object`        | ✅        | Objeto con datos a validar |
| `requiredFields` | `Array<string>` | ✅        | Array de campos requeridos |

#### **Retorna**

```javascript
{
  isValid: boolean,
  missingFields: Array<string>
}
```

---

## 🔄 **Flujos de Trabajo Comunes**

### **Flujo 1: Cargar y Editar Syllabus**

```javascript
// 1. Cargar datos existentes
const datos = cargarDatosSyllabus("TI35");
if (!datos.success) {
   console.log("Error al cargar:", datos.message);
   return;
}

// 2. Modificar datos
datos.data.nombreDocente = "Nuevo Docente";
datos.data.totalHoras = 90;

// 3. Guardar cambios
const resultado = guardarSyllabus("ASIGNATURAS", datos.data);
if (resultado.success) {
   console.log("Cambios guardados correctamente");
}
```

### **Flujo 2: Actualizar Campo Específico**

```javascript
// Actualizar solo el docente
const resultado = actualizarCampoSyllabus(
   "TI35",
   "Docente",
   "Dr. María García"
);
if (resultado.success) {
   console.log("Docente actualizado");
}
```

### **Flujo 3: Crear Nuevo Syllabus**

```javascript
// Crear datos de nuevo syllabus
const nuevoSyllabus = {
   codigo: "TI40",
   nombreAsignatura: "Nueva Asignatura",
   nombreDocente: "Dr. Carlos López",
   totalHoras: 80,
   // ... otros campos requeridos
};

// Guardar nuevo syllabus
const resultado = guardarSyllabus("ASIGNATURAS", nuevoSyllabus);
if (resultado.success) {
   console.log("Nuevo syllabus creado");
}
```

## 🚨 **Manejo de Errores**

### **Patrón de Respuesta Estándar**

Todas las funciones siguen un patrón de respuesta consistente:

```javascript
// Respuesta de éxito
{
  success: true,
  message: "Operación exitosa",
  data: { /* datos adicionales */ }
}

// Respuesta de error
{
  success: false,
  message: "Descripción del error"
}
```

### **Validación de Respuestas**

```javascript
function procesarRespuesta(respuesta) {
   if (respuesta.success) {
      // Procesar datos exitosos
      console.log("Éxito:", respuesta.message);
      if (respuesta.data) {
         // Usar datos adicionales
         console.log("Datos:", respuesta.data);
      }
   } else {
      // Manejar error
      console.error("Error:", respuesta.message);
      // Implementar lógica de recuperación
   }
}
```

## 📊 **Límites y Consideraciones**

### **Límites de Google Apps Script**

-  **Tiempo de ejecución**: 6 minutos máximo
-  **Tamaño de respuesta**: 50MB máximo
-  **Llamadas a servicios**: 20,000 por día
-  **Escrituras a Sheets**: 300 por minuto

### **Optimizaciones Recomendadas**

-  Usar caché para datos frecuentes
-  Implementar paginación para grandes datasets
-  Reducir operaciones de escritura innecesarias
-  Usar batch operations cuando sea posible

## 🧪 **Pruebas de la API**

### **Ejecutar Pruebas Completas**

```javascript
// Probar todas las funciones de la API
ejecutarPruebasPaso1(); // Constantes
ejecutarPruebasPaso2(); // Utilidades
ejecutarPruebasPaso3(); // Servicios
ejecutarPruebasPaso4(); // Referencias
ejecutarPruebasPaso5(); // Limpieza
```

### **Pruebas de Rendimiento**

```javascript
// Probar rendimiento de la API
testRendimiento();
testIntegracionCompleta();
```

---

**¿Necesitas más información?** Consulta la documentación adicional o contacta al equipo de desarrollo.
