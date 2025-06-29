# 📚 **Generador de Syllabus Académico**

Un sistema completo para la generación y gestión automatizada de sílabos académicos en Google Apps Script.

## 🎯 **Descripción**

Este proyecto automatiza la creación, edición y gestión de sílabos académicos, proporcionando una interfaz web intuitiva para docentes y administradores. El sistema está construido con una arquitectura modular que facilita el mantenimiento y la escalabilidad.

## ✨ **Características Principales**

-  🎓 **Gestión completa de sílabos** - Crear, editar y actualizar sílabos académicos
-  📊 **Interfaz web intuitiva** - Formularios dinámicos y responsivos
-  🔄 **Sincronización automática** - Integración directa con Google Sheets
-  📄 **Generación de documentos** - Crear documentos PDF automáticamente
-  🏗️ **Arquitectura modular** - Código organizado y mantenible
-  🧪 **Sistema de pruebas** - Pruebas automatizadas para cada componente

## 🏗️ **Arquitectura del Proyecto**

```
📁 syllabus-gas/
├── 📄 Main.js                     ← Coordinador principal
├── 📄 Index.html                  ← Interfaz de usuario
├── 📄 Código.js                   ← Funciones específicas
├── 📄 CargarDatosSyllabus.js      ← Carga de datos
├── 📄 ActualizarCampoSyllabus.js  ← Actualización de campos
├── 📄 GenerarDocumentoSyllabus.js ← Generación de documentos
├── 📁 config/
│   ├── 📄 Constants.js            ← Configuración centralizada
│   └── 📄 test-paso*.js           ← Pruebas de cada paso
├── 📁 utils/
│   ├── 📄 SpreadsheetUtils.js     ← Utilidades de hojas
│   ├── 📄 DataProcessor.js        ← Procesamiento de datos
│   └── 📄 HtmlUtils.js            ← Utilidades HTML
└── 📁 services/
    └── 📄 SyllabusService.js      ← Lógica de negocio
```

## 🚀 **Instalación y Configuración**

### **Prerrequisitos**

-  Cuenta de Google con acceso a Google Apps Script
-  Google Sheets con datos de asignaturas
-  Permisos para crear y editar documentos de Google

### **Pasos de Instalación**

1. **Clonar o descargar el proyecto**

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd syllabus-gas
   ```

2. **Configurar Google Apps Script**

   -  Abrir [Google Apps Script](https://script.google.com/)
   -  Crear un nuevo proyecto
   -  Copiar todos los archivos del proyecto

3. **Configurar constantes**

   -  Editar `config/Constants.js`
   -  Actualizar `SPREADSHEET_ID` con el ID de tu hoja de cálculo
   -  Configurar `TEMPLATE_DOC_ID` y `FOLDER_ID`

4. **Configurar permisos**

   -  Ejecutar la función `doGet()` para configurar permisos
   -  Aceptar los permisos solicitados

5. **Desplegar como aplicación web**
   -  Ir a "Deploy" > "New deployment"
   -  Seleccionar "Web app"
   -  Configurar acceso y permisos

## 📖 **Uso**

### **Funciones Principales**

#### **Obtener Carreras**

```javascript
const carreras = getCarreras();
// Retorna: ['CONTENIDOS', 'ASIGNATURAS']
```

#### **Cargar Datos de Syllabus**

```javascript
const datos = cargarDatosSyllabus("TI35");
if (datos.success) {
   console.log(datos.data.nombreAsignatura);
   // Retorna: "Administración de Servidores"
}
```

#### **Actualizar Campo**

```javascript
const resultado = actualizarCampoSyllabus("TI35", "Docente", "Nuevo Docente");
if (resultado.success) {
   console.log("Campo actualizado correctamente");
}
```

#### **Guardar Syllabus**

```javascript
const datosSyllabus = {
   codigo: "TI35",
   nombreAsignatura: "Administración de Servidores",
   // ... otros campos
};

const resultado = guardarSyllabus("ASIGNATURAS", datosSyllabus);
```

### **Interfaz Web**

1. **Acceder a la aplicación**

   -  Abrir la URL de la aplicación web desplegada
   -  La interfaz se cargará automáticamente

2. **Cargar datos existentes**

   -  Ingresar el código de la asignatura
   -  Hacer clic en "Cargar Datos"
   -  Los campos se llenarán automáticamente

3. **Editar información**

   -  Modificar los campos necesarios
   -  Los cambios se guardan automáticamente

4. **Generar documento**
   -  Hacer clic en "Generar Documento"
   -  Se creará un PDF del sílabo

## 🧪 **Pruebas**

### **Ejecutar Pruebas Completas**

```javascript
// Pruebas del Paso 1: Constantes
ejecutarPruebasPaso1();

// Pruebas del Paso 2: Utilidades
ejecutarPruebasPaso2();

// Pruebas del Paso 3: Servicios
ejecutarPruebasPaso3();

// Pruebas del Paso 4: Referencias
ejecutarPruebasPaso4();

// Pruebas del Paso 5: Limpieza
ejecutarPruebasPaso5();
```

### **Pruebas de Rendimiento**

```javascript
// Probar rendimiento de carga de datos
testRendimiento();

// Probar integración completa
testIntegracionCompleta();
```

## 🔧 **Configuración**

### **Constantes Principales**

```javascript
// config/Constants.js
const SPREADSHEET_ID = "tu_spreadsheet_id";
const TEMPLATE_DOC_ID = "tu_template_doc_id";
const FOLDER_ID = "tu_folder_id";
```

### **Estructura de Datos**

El sistema espera las siguientes hojas en Google Sheets:

-  **ASIGNATURAS**: Datos principales de las asignaturas
-  **CONTENIDOS**: Contenidos específicos por unidad

## 🚨 **Solución de Problemas**

### **Error: "Spreadsheet no encontrado"**

-  Verificar que `SPREADSHEET_ID` es correcto
-  Comprobar permisos de acceso al spreadsheet
-  Asegurar que el spreadsheet existe y es accesible

### **Error: "Función no definida"**

-  Verificar que todos los archivos están incluidos en el proyecto
-  Comprobar que no hay errores de sintaxis
-  Ejecutar las pruebas para identificar problemas

### **Error: "Permisos insuficientes"**

-  Revisar configuración de permisos en Google Apps Script
-  Verificar scopes del proyecto
-  Comprobar acceso a recursos externos

### **Rendimiento lento**

-  Implementar caché para datos frecuentes
-  Optimizar consultas a la base de datos
-  Reducir operaciones innecesarias

## 📚 **Documentación Adicional**

-  [API Documentation](API_DOCUMENTATION.md) - Documentación completa de la API
-  [Deployment Guide](DEPLOYMENT_GUIDE.md) - Guía de deployment
-  [Maintenance Guide](MAINTENANCE_GUIDE.md) - Guía de mantenimiento

## 🤝 **Contribución**

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 **Autores**

-  **Desarrollador Principal** - [Tu Nombre]
-  **Contribuidores** - [Lista de contribuidores]

## 🙏 **Agradecimientos**

-  Google Apps Script por la plataforma
-  Comunidad de desarrolladores por el soporte
-  Usuarios por el feedback y mejoras

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o contacta al equipo de desarrollo.

**¡Gracias por usar el Generador de Syllabus Académico!** 🎓
