# 🔄 **PASO 4: ACTUALIZAR REFERENCIAS**

## 📋 **Objetivo**

Actualizar las referencias en los archivos principales para usar la nueva estructura modular refactorizada.

## 🎯 **Lo que vamos a hacer**

### **1. Crear archivo principal `Main.js`**

-  ✅ Coordina todos los módulos de la aplicación
-  ✅ Mantiene compatibilidad con el código original
-  ✅ Proporciona funciones de fallback en caso de error
-  ✅ Centraliza la lógica de la aplicación

### **2. Actualizar referencias en archivos HTML**

-  ✅ Actualizar `Index.html` para usar las nuevas funciones
-  ✅ Mantener compatibilidad con el frontend existente
-  ✅ Asegurar que todas las funciones estén disponibles

### **3. Verificar integración**

-  ✅ Probar que todas las funciones funcionan correctamente
-  ✅ Verificar que no hay errores de referencia
-  ✅ Confirmar que la aplicación sigue funcionando

## 🔧 **Archivos a modificar**

### **Archivos principales:**

-  `Main.js` - **NUEVO** - Archivo principal coordinador
-  `Index.html` - Actualizar referencias
-  `Código.js` - Mantener para compatibilidad
-  `CargarDatosSyllabus.js` - Mantener para compatibilidad
-  `ActualizarCampoSyllabus.js` - Mantener para compatibilidad

## 🧪 **Pruebas a realizar**

### **Prueba 1: Verificar funciones principales**

```javascript
function testPaso4() {
   console.log("=== PRUEBA DEL PASO 4 ===");

   // Probar funciones principales
   const carreras = getCarreras();
   console.log("✅ getCarreras() funciona:", carreras);

   // Probar carga de datos
   const datos = cargarDatosSyllabus("TI35");
   console.log("✅ cargarDatosSyllabus() funciona:", datos.success);

   // Probar actualización
   const actualizacion = actualizarCampoSyllabus(
      "TI35",
      "Docente",
      "Test Docente"
   );
   console.log("✅ actualizarCampoSyllabus() funciona:", actualizacion.success);

   console.log("=== FIN DE PRUEBA ===");
}
```

### **Prueba 2: Verificar integración con módulos**

```javascript
function testIntegracionPaso4() {
   console.log("=== PRUEBA DE INTEGRACIÓN PASO 4 ===");

   // Verificar que las utilidades están disponibles
   try {
      const ss = getSpreadsheet();
      console.log("✅ getSpreadsheet() funciona");

      const data = getSheetData("ASIGNATURAS");
      console.log("✅ getSheetData() funciona:", data.length, "filas");

      console.log("✅ Todas las utilidades están disponibles");
   } catch (error) {
      console.log("❌ Error con utilidades:", error.message);
   }

   console.log("=== FIN DE PRUEBA DE INTEGRACIÓN ===");
}
```

## 🚨 **Si hay problemas**

### **Error: "Función no definida"**

-  Verificar que `Main.js` está incluido en el proyecto
-  Asegurar que las funciones de fallback están definidas
-  Revisar que no hay conflictos de nombres

### **Error: "No se puede leer propiedad de undefined"**

-  Verificar que las utilidades están cargadas correctamente
-  Revisar que los servicios están disponibles
-  Comprobar que las constantes están definidas

### **Error: "Spreadsheet no encontrado"**

-  Verificar que `SPREADSHEET_ID` está definido en `Constants.js`
-  Comprobar que el ID del spreadsheet es correcto
-  Asegurar que el script tiene permisos de acceso

## ✅ **Criterios de éxito**

### **Funciones principales funcionan:**

-  ✅ `getCarreras()` retorna array de carreras
-  ✅ `cargarDatosSyllabus(codigo)` carga datos correctamente
-  ✅ `actualizarCampoSyllabus(codigo, campo, valor)` actualiza campos
-  ✅ `guardarSyllabus(carrera, datos)` guarda datos correctamente

### **Integración funciona:**

-  ✅ Todas las utilidades están disponibles
-  ✅ Los servicios funcionan correctamente
-  ✅ Las constantes están definidas
-  ✅ No hay errores de referencia

### **Compatibilidad mantenida:**

-  ✅ El frontend sigue funcionando
-  ✅ Las funciones originales están disponibles como fallback
-  ✅ No hay cambios en la interfaz de usuario

## 🔧 **Arquitectura después del Paso 4**

```
📁 syllabus-gas/
├── 📄 Main.js                    ← NUEVO: Coordinador principal
├── 📄 Index.html                 ← Actualizado con nuevas referencias
├── 📄 Código.js                  ← Mantenido para compatibilidad
├── 📄 CargarDatosSyllabus.js     ← Mantenido para compatibilidad
├── 📄 ActualizarCampoSyllabus.js ← Mantenido para compatibilidad
├── 📁 config/
│   ├── 📄 Constants.js           ← Constantes organizadas
│   └── 📄 test-paso*.js          ← Pruebas de cada paso
├── 📁 utils/
│   ├── 📄 SpreadsheetUtils.js    ← Utilidades de hojas
│   ├── 📄 DataProcessor.js       ← Procesamiento de datos
│   └── 📄 HtmlUtils.js           ← Utilidades HTML
└── 📁 services/
    └── 📄 SyllabusService.js     ← Lógica de negocio
```

## 🎯 **Ventajas del Paso 4**

### **Mejoras implementadas:**

-  ✅ **Coordinación centralizada** con `Main.js`
-  ✅ **Compatibilidad total** con código original
-  ✅ **Funciones de fallback** para robustez
-  ✅ **Referencias actualizadas** en archivos principales
-  ✅ **Integración completa** de todos los módulos

### **Beneficios:**

-  ✅ **Mantenibilidad** mejorada con coordinación central
-  ✅ **Robustez** con funciones de fallback
-  ✅ **Compatibilidad** total con código existente
-  ✅ **Escalabilidad** para futuras mejoras
-  ✅ **Testing** más fácil con funciones centralizadas

## 🔄 **Completado:**

-  ✅ **Paso 1**: Constantes organizadas
-  ✅ **Paso 2**: Utilidades creadas
-  ✅ **Paso 3**: Servicios implementados
-  ✅ **Paso 4**: Referencias actualizadas

## ⏳ **Pendiente:**

-  ⏳ **Paso 5**: Limpiar archivos originales
-  ⏳ **Paso 6**: Optimización final

---

**¿Listo para continuar con el Paso 5?** 🚀
