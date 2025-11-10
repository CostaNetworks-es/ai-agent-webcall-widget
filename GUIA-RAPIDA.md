# Guía Rápida de Configuración (Español)

## 🔑 Configurar API Key

### Opción 1: Directamente en el código (desarrollo)
```html
<script>
  new AIWebcallWidget({
    callEndpoint: 'https://tu-api.ejemplo.com/iniciar-llamada',
    apiKey: 'tu-clave-api-aqui',
    agentName: 'Asistente IA'
  });
</script>
```

### Opción 2: Usando archivo de configuración (recomendado para producción)

1. Copia el archivo de ejemplo:
```bash
cp config.js.example config.js
```

2. Edita `config.js` con tus valores:
```javascript
window.AI_WIDGET_CONFIG = {
  callEndpoint: 'https://tu-api.ejemplo.com/iniciar-llamada',
  apiKey: 'tu-clave-api-aqui',
  agentName: 'Asistente IA',
  primaryColor: '#007bff'
};
```

3. Incluye el archivo antes del widget:
```html
<script src="config.js"></script>
<script src="widget.js"></script>
<script>
  new AIWebcallWidget(window.AI_WIDGET_CONFIG);
</script>
```

**Importante:** El archivo `config.js` está en `.gitignore` para proteger tu API key.

## 🌐 Opciones de Hosting

### Opción 1: GitHub Pages (Automático) ⭐ RECOMENDADO

El repositorio ya incluye un workflow de GitHub Actions que:
- Se ejecuta en tu runner `costa-runner`
- Despliega automáticamente a GitHub Pages cuando haces push a `main`
- No requiere configuración adicional

**Pasos:**
1. Ve a Settings → Pages en tu repositorio
2. En "Source", selecciona "GitHub Actions"
3. Haz push a la rama `main`
4. Tu widget estará disponible en: `https://tu-usuario.github.io/ai-agent-webcall-widget/`

### Opción 2: Hosting Estático Simple

Solo necesitas subir estos 3 archivos a cualquier servidor web:
- `widget.js`
- `widget.css`
- `index.html` (o `example.html`)

**Servicios donde puedes hostear gratis:**
- Netlify (arrastra y suelta)
- Vercel
- Cloudflare Pages
- Cualquier servidor web tradicional

### Opción 3: Servidor Local (para pruebas)

```bash
# Con Python
python3 -m http.server 8000

# Con Node.js
npx http-server

# Con npm script
npm run serve
```

Luego abre: `http://localhost:8000/index.html`

## 🔌 Integración en tu Sitio Web

Una vez que el widget esté hosteado, intégralo en tu sitio:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Mi Sitio</title>
  <!-- Incluir el widget -->
  <link rel="stylesheet" href="https://tu-dominio.com/widget.css">
</head>
<body>
  <h1>Mi Sitio Web</h1>
  
  <!-- Cargar el script del widget -->
  <script src="https://tu-dominio.com/widget.js"></script>
  
  <!-- Inicializar el widget -->
  <script>
    new AIWebcallWidget({
      position: 'bottom-right',
      primaryColor: '#667eea',
      agentName: 'Asistente',
      callEndpoint: 'https://tu-api.com/iniciar-llamada',
      apiKey: 'tu-clave-api'
    });
  </script>
</body>
</html>
```

## 🔒 Seguridad

1. **Nunca** subas tu `config.js` con la API key a Git
2. El archivo ya está en `.gitignore`
3. Para producción, considera usar variables de entorno
4. El API key se envía en el header: `Authorization: Bearer tu-clave`

## 📚 Documentación Completa

- `README.md` - Documentación general (inglés)
- `CONFIGURATION.md` - Guía detallada de configuración (inglés)
- `config.js.example` - Plantilla de configuración

## ❓ Preguntas Frecuentes

**P: ¿Dónde obtengo mi API key?**
R: Debes generarla en tu backend/API que maneja las llamadas con IA.

**P: ¿El widget funcionará sin API key?**
R: Sí, pero necesitas un `callEndpoint` para conectar las llamadas. El widget puede funcionar sin API key si tu backend no lo requiere.

**P: ¿Puedo personalizar los colores?**
R: Sí, usa la opción `primaryColor` para cambiar el color principal del widget.

**P: ¿Funciona en móviles?**
R: Sí, el widget es completamente responsive y funciona en todos los dispositivos.

## 🚀 Próximos Pasos

1. Configura tu API key en `config.js`
2. Habilita GitHub Pages para hosting automático
3. Integra el widget en tu sitio web
4. Personaliza la apariencia según tu marca
