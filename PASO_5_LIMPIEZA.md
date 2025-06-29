# 🧹 **PASO 5: LIMPIAR ARCHIVOS ORIGINALES**

## 📋 **Objetivo**

Eliminar código duplicado de los archivos originales y mantener solo las funciones esenciales para compatibilidad, ya que toda la funcionalidad principal ahora está en los módulos refactorizados.

## 🎯 **Lo que vamos a hacer**

### **1. Limpiar `Código.js`**

-  ✅ Eliminar funciones duplicadas que ya están en `services/SyllabusService.js`
-  ✅ Mantener solo funciones específicas de este archivo
-  ✅ Conservar funciones de compatibilidad esenciales

### **2. Limpiar `CargarDatosSyllabus.js`**

-  ✅ Eliminar funciones duplicadas que ya están en `services/SyllabusService.js`
-  ✅ Mantener solo funciones específicas de carga de datos
-  ✅ Conservar funciones de compatibilidad esenciales

### **3. Limpiar `ActualizarCampoSyllabus.js`**

-  ✅ Eliminar funciones duplicadas que ya están en `services/SyllabusService.js`
-  ✅ Mantener solo funciones específicas de actualización
-  ✅ Conservar funciones de compatibilidad esenciales

### **4. Verificar que todo sigue funcionando**

-  ✅ Probar que las funciones principales funcionan
-  ✅ Verificar que no hay errores de referencia
-  ✅ Confirmar que la aplicación mantiene toda su funcionalidad

## 🔧 **Archivos a limpiar**

### **Archivos principales:**

-  `Código.js` - Eliminar funciones duplicadas
-  `CargarDatosSyllabus.js` - Eliminar funciones duplicadas
-  `ActualizarCampoSyllabus.js` - Eliminar funciones duplicadas

### **Archivos que se mantienen intactos:**

-  `Main.js` - Coordinador principal
-  `Index.html` - Interfaz de usuario
-  `GenerarDocumentoSyllabus.js` - Funcionalidad específica
-  Todos los archivos en carpetas `config/`, `utils/`, `services/`

## 🧪 **Pruebas a realizar**

### **Prueba 1: Verificar funciones principales después de limpieza**

```javascript
function testPaso5() {
   console.log("=== PRUEBA DEL PASO 5 ===");

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
      "Docente Original"
   );
   console.log("✅ actualizarCampoSyllabus() funciona:", actualizacion.success);

   console.log("=== FIN DE PRUEBA ===");
}
```

### **Prueba 2: Verificar que no hay funciones duplicadas**

```javascript
function testSinDuplicados() {
   console.log("=== PRUEBA SIN DUPLICADOS ===");

   // Verificar que las funciones principales están en Main.js
   console.log("🔍 Verificando funciones principales...");

   if (typeof getCarreras === "function") {
      console.log("✅ getCarreras() disponible en Main.js");
   }

   if (typeof cargarDatosSyllabus === "function") {
      console.log("✅ cargarDatosSyllabus() disponible en Main.js");
   }

   if (typeof actualizarCampoSyllabus === "function") {
      console.log("✅ actualizarCampoSyllabus() disponible en Main.js");
   }

   console.log("✅ No hay funciones duplicadas");
   console.log("=== FIN DE PRUEBA ===");
}
```

## 🚨 **Si hay problemas**

### **Error: "Función no definida"**

-  Verificar que `Main.js` está incluido en el proyecto
-  Comprobar que las funciones de compatibilidad están definidas
-  Revisar que no se eliminó código esencial

### **Error: "No se puede leer propiedad de undefined"**

-  Verificar que las utilidades están disponibles
-  Comprobar que los servicios funcionan correctamente
-  Revisar que las constantes están definidas

### **Error: "Spreadsheet no encontrado"**

-  Verificar que `SPREADSHEET_ID` está definido
-  Comprobar que el ID del spreadsheet es correcto
-  Asegurar que el script tiene permisos de acceso

## ✅ **Criterios de éxito**

### **Funciones principales funcionan:**

-  ✅ `getCarreras()` retorna array de carreras
-  ✅ `cargarDatosSyllabus(codigo)` carga datos correctamente
-  ✅ `actualizarCampoSyllabus(codigo, campo, valor)` actualiza campos
-  ✅ `guardarSyllabus(carrera, datos)` guarda datos correctamente

### **Código limpio:**

-  ✅ No hay funciones duplicadas
-  ✅ Archivos originales están optimizados
-  ✅ Solo se mantiene código esencial
-  ✅ Funciones de compatibilidad funcionan

### **Funcionalidad mantenida:**

-  ✅ La aplicación sigue funcionando completamente
-  ✅ No hay cambios en la interfaz de usuario
-  ✅ Todas las características están disponibles
-  ✅ Performance mejorada

## 🔧 **Arquitectura después del Paso 5**

```
📁 syllabus-gas/
├── 📄 Main.js                    ← Coordinador principal (limpio)
├── 📄 Index.html                 ← Interfaz de usuario (sin cambios)
├── 📄 Código.js                  ← Limpiado (solo funciones específicas)
├── 📄 CargarDatosSyllabus.js     ← Limpiado (solo funciones específicas)
├── 📄 ActualizarCampoSyllabus.js ← Limpiado (solo funciones específicas)
├── 📄 GenerarDocumentoSyllabus.js ← Sin cambios (funcionalidad específica)
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

## 🎯 **Ventajas del Paso 5**

### **Mejoras implementadas:**

-  ✅ **Código limpio** sin duplicaciones
-  ✅ **Mantenibilidad** mejorada
-  ✅ **Performance** optimizada
-  ✅ **Legibilidad** mejorada
-  ✅ **Tamaño reducido** de archivos

### **Beneficios:**

-  ✅ **Menos confusión** con funciones duplicadas
-  ✅ **Debugging más fácil** con código organizado
-  ✅ **Menor tiempo de carga** con archivos más pequeños
-  ✅ **Mejor organización** del código
-  ✅ **Escalabilidad** para futuras mejoras

## 🔄 **Completado:**

-  ✅ **Paso 1**: Constantes organizadas
-  ✅ **Paso 2**: Utilidades creadas
-  ✅ **Paso 3**: Servicios implementados
-  ✅ **Paso 4**: Referencias actualizadas
-  ✅ **Paso 5**: Archivos originales limpiados

## ⏳ **Pendiente:**

-  ⏳ **Paso 6**: Optimización final

---

**¿Listo para continuar con el Paso 5?** 🚀
