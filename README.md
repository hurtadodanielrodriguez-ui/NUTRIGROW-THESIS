# 🌱 NutriGrow — Nutrición Inteligente, Autocultivo & Bienestar Integral

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Ionic](https://img.shields.io/badge/Ionic%20UI-Mobile%20Ready-3880FF?logo=ionic&logoColor=white)](https://ionicframework.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Database-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![GitHub](https://img.shields.io/badge/Version%20Control-GitHub-181717?logo=github&logoColor=white)](https://github.com/)

---

## 📋 Descripción del Proyecto

**NutriGrow** es una plataforma web y móvil progresiva diseñada para transformar la relación entre las personas, su nutrición y el origen de sus alimentos. Combina guías de alimentación saludable basadas en datos biométricos personalizados con el aprendizaje y seguimiento de proyectos de autocultivo casero (hidropónico, macetohuertos y germinados).

### 🎯 El Problema que Resuelve
1. **Desconexión entre nutrición y origen de los alimentos:** La mayoría de las aplicaciones se limitan a ser simples "contadores de calorías" impersonales y punitivos, sin enseñar hábitos sostenibles ni fomentar el acceso a alimentos frescos libres de pesticidas.
2. **Brecha en la adopción del autocultivo:** Muchas personas desean cosechar sus propios vegetales en casa pero carecen de guías claras de riego, luz, nutrición vegetal y recetas directas del huerto a la mesa.
3. **Falta de seguridad y validación en aplicaciones de salud:** Formularios sin validación defensiva, exposición involuntaria de credenciales y ausencia de protección en rutas privadas que comprometen la privacidad del usuario.

### 🛠️ Stack Tecnológico
- **Frontend / UI:** React 19, TypeScript, Ionic UI Components, Lucide Icons, Canvas Confetti.
- **Estilos & Diseño:** Tailwind CSS (v4) con soporte dinámico para Modo Claro y Modo Oscuro (*Calm Forest Palette*).
- **Backend / BaaS:** Supabase (Autenticación JWT, base de datos relacional PostgreSQL, sesiones en tiempo real).
- **Inteligencia Artificial:** Google Gemini API para sugerencias de recetas y asistencia agronómica.
- **Despliegue & CI/CD:** Vercel / Cloud Run con control de versiones en GitHub.

---

## 🧪 Tabla de Auditoría y Casos de Prueba (TC)

Todos los componentes de formulario y navegación fueron sometidos a pruebas exhaustivas de validación defensiva, asegurando que ninguna entrada maliciosa o incompleta comprometa la integridad de la aplicación:

| ID Caso | Módulo / Campo | Entrada de Prueba (Input) | Regla de Validación Aplicada | Comportamiento Esperado | Estado |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Formulario Login / Registro | `"   "` (solo espacios en blanco) | Sanitización obligatoria con `.trim()` antes de evaluar longitud. | Se detecta el campo como vacío. Bloquea el envío y muestra advertencia: *"Por favor completa todos los campos requeridos."* | **Aprobado** ✅ |
| **TC-02** | Registro / Email | `usuario@correo` / `sin-arroba.com` | Expresión regular RFC: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. | Bloquea la petición de red y notifica en pantalla: *"Ingresa un formato de correo electrónico válido."* | **Aprobado** ✅ |
| **TC-03** | Registro / Password | `12345` (5 caracteres) | Validación de longitud mínima `>= 6` caracteres. | Notifica: *"La contraseña debe tener al menos 6 caracteres."* El botón permanece protegido. | **Aprobado** ✅ |
| **TC-04** | Formulario / Nombre & Bio | `<script>alert('xss')</script><b>Nombre</b>` | Sanitización de cadenas, escape de caracteres y renderizado seguro de React. | La entrada se trata como texto plano inocuo; previene cualquier inyección de script o alteración del DOM. | **Aprobado** ✅ |
| **TC-05** | Login / Supabase Auth | `correo_inexistente@nutrigrow.com` | Captura con bloque `try...catch` de la respuesta de Supabase. | Traduce el código de error crudo a una alerta amigable: *"El correo o la contraseña son incorrectos."* | **Aprobado** ✅ |
| **TC-06** | Acceso a Rutas Privadas | Navegación forzada a `/inicio` o `/perfil` sin sesión | Envoltura estricta con `<ProtectedRoute>`. | Muestra spinner de validación; si no hay sesión activa en `supabase.auth`, intercepta y redirige a la vista de autenticación. | **Aprobado** ✅ |

---

## 🚀 Guía de Instalación y Despliegue Local

Sigue estos pasos para clonar, configurar y ejecutar NutriGrow en tu entorno de desarrollo local:

### 1. Prerrequisitos
- **Node.js**: Versión 18.0.0 o superior instalada (`node -v`).
- **npm**: Versión 9.0.0 o superior (`npm -v`) o **pnpm/yarn**.
- **Cuenta en Supabase**: Proyecto activo con URL y clave anónima (`anon key`).

### 2. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/nutrigrow.git
cd nutrigrow
```

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Configuración de Variables de Entorno
Copia el archivo de plantilla `.env.example` para crear tu `.env` local:

```bash
cp .env.example .env
```

Abre `.env` en tu editor de código y completa tus credenciales:
```env
# Variables Públicas de Supabase (Accesibles por el cliente Vite)
VITE_SUPABASE_URL="https://tu-proyecto-id.supabase.co"
VITE_SUPABASE_ANON_KEY="tu-anon-key-publica-aqui"

# Llave de API del Servidor (opcional para IA)
GEMINI_API_KEY="tu-gemini-api-key"
```

### 5. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### 6. Compilación para Producción (Build)
```bash
npm run build
```
Para probar la versión compilada localmente:
```bash
npm run preview
```

---

## 🔒 Sección de Seguridad y Buenas Prácticas

NutriGrow implementa una arquitectura de seguridad por capas que previene las vulnerabilidades más comunes en aplicaciones web modernas:

### 1. Aislamiento Estricto de Secretos (.env y .gitignore)
- El archivo `.env` que almacena tokens y configuraciones sensibles se encuentra registrado en `.gitignore`, impidiendo que credenciales privadas lleguen al repositorio público de GitHub.
- Solo se versiona `.env.example` con valores de muestra para guiar a otros desarrolladores sin exponer secretos.
- Se respeta la separación de privilegios: el cliente web únicamente utiliza la llave pública `anon`, mientras que las llaves con permisos administrativos (`service_role`) jamás se exponen en el navegador.

### 2. Control de Acceso con `ProtectedRoute`
- Todas las vistas privadas (`inicio`, `perfil`, `recetas`, `proyectos`, `ayuda_ia`, `configuracion`) están blindadas mediante el componente `<ProtectedRoute>`.
- El componente consulta de manera asíncrona `supabase.auth.getSession()` y escucha activamente el canal en tiempo real `supabase.auth.onAuthStateChange`.
- Mientras se valida la autenticidad del token JWT, se renderiza un spinner de carga sin exponer datos en pantalla.
- Si el usuario no cuenta con una sesión válida, el acceso es bloqueado de inmediato y se le redirige al flujo de inicio de sesión.

### 3. Validación Defensiva y Manejo de Errores con `try...catch`
- Toda llamada asíncrona hacia Supabase está encapsulada en bloques `try...catch...finally`.
- Los botones de envío se deshabilitan inmediatamente (`disabled={isLoading}`) para evitar ataques de repetición o envíos duplicados accidentales.
- Los errores devueltos por el motor de base de datos se procesan para entregar notificaciones visuales legibles al usuario final (*Toasts / Alertas*), previniendo fugas de información interna o volcados de excepciones en la consola.

---

## 🎤 Guión del Pitch de Sustentación (3 a 5 Minutos)

Estructura diseñada para presentar NutriGrow ante evaluadores, inversionistas o jurados técnicos de manera elocuente, concisa y persuasiva:

```
⏱️ TIEMPO TOTAL ESTIMADO: 4:30 minutos
🎯 OBJETIVO: Demostrar impacto social, solidez técnica, usabilidad y seguridad.
```

---

### 🟢 MINUTO 1: Introducción y Planteamiento del Problema (0:00 - 1:00)

> *"Estimado jurado y compañeros: ¿Alguna vez han intentado alimentarse mejor y se han topado con aplicaciones que solo los hacen sentir culpables por contar calorías, sin enseñarles realmente de dónde viene su comida ni cómo hacerla sostenible?*
>
> *Hoy en día, millones de personas enfrentan dos problemas simultáneos: una desconexión crítica con la procedencia de sus alimentos frescos y una falta de herramientas integrales que unan nutrición inteligente con hábitos sostenibles de autocultivo en casa.*
>
> *Para resolver esta brecha creamos **NutriGrow**: un ecosistema digital que democratiza la salud integral uniendo tres pilares fundamentales: diagnóstico nutricional personalizado, recetario inteligente del huerto a la mesa, y proyectos guiados de cultivo urbano e hidropónico para el hogar.*
>
> *Permítanme mostrarles NutriGrow funcionando en vivo desplegado en Vercel."*

---

### 🟢 MINUTOS 2 y 3: Demostración en Vivo en Vercel (1:00 - 3:00)

> *(Compartir pantalla mostrando la URL en Vercel con la Landing Page)*
>
> 1. **Página de Bienvenida (Landing Page) & Accesibilidad:**
>    *"Comenzamos en la Landing Page. Diseñada con una paleta natural basada en tonos esmeralda y salvia, permite alternar entre modo oscuro y modo claro con un solo clic. Desde el inicio, el usuario comprende la propuesta de valor y los testimonios de la comunidad."*
>
> 2. **Autenticación Defensiva & Selector de Cuentas de Google:**
>    *"Hacemos clic en 'Iniciar Sesión'. Noten la robustez del formulario: si intentamos ingresar espacios en blanco o un correo con sintaxis inválida, la validación local con `.trim()` y expresiones regulares detiene el envío al instante sin consumir peticiones innecesarias.*
>    *Si optamos por el acceso con Google, se despliega nuestro 'Google Account Chooser', permitiendo seleccionar la cuenta de trabajo o ingresar una personalizada de forma completamente transparente y sin valores forzados."*
>
> 3. **Onboarding Biométrico:**
>    *"Al ingresar, el sistema solicita de inmediato los datos biométricos esenciales: fecha de nacimiento, peso, estatura y nivel de actividad. Con base en esto, NutriGrow calcula las metas diarias de macronutrientes, hidratación y calorías óptimas."*
>
> 4. **Dashboard Principal & Cultivo en Casa:**
>    *"Dentro del portal privado, el usuario visualiza su progreso calórico, hidratación y racha de hábitos. En la sección 'Recetas', exploramos preparaciones vivas categorizadas, y en 'Proyectos de Cultivo', el usuario aprende paso a paso a cultivar desde albahaca hidropónica hasta tomates cherry en espacios reducidos."*
>
> 5. **Configuración de Cuenta & Cambio de Idioma:**
>    *"En los ajustes de cuenta (*Account Settings*), el usuario tiene el control total: cambio de idioma en tiempo real entre Español, Inglés y Francés, gestión de preferencias y almacenamiento de su plan nutricional."*

---

### 🟢 MINUTO 4: Arquitectura, Seguridad y Calidad Técnica (3:00 - 4:00)

> *"Detrás de esta interfaz fluida existe una arquitectura robusta pensada para escalar:*
>
> - **Frontend React 19 + TypeScript + Ionic:** *Garantiza tipado estricto, cero errores en tiempo de compilación y componentes móviles nativos de alta fidelidad.*
> - **Seguridad y Control de Acceso:** *Utilizamos Supabase Auth gestionado con nuestro componente central `<ProtectedRoute>`. Si un usuario intenta saltarse la autenticación escribiendo rutas directamente en el navegador, el sistema intercepta el token, muestra un spinner de validación y bloquea el acceso si no hay una sesión activa.*
> - **Manejo Defensivo y Resiliencia:** *Todas las transacciones asíncronas están blindadas con bloques `try...catch`. Los estados de carga deshabilitan los botones para evitar duplicados y los errores de base de datos se traducen a alertas comprensibles.*
> - **Aislamiento de Secretos:** *Las credenciales sensibles están aisladas en `.env` protegidas bajo `.gitignore` y sincronizadas en Vercel mediante variables de entorno seguras.*
> - **Despliegue Continuo:** *Cada cambio en la rama principal de GitHub ejecuta automáticamente los checks de TypeScript y realiza el despliegue automático a producción en Vercel."*

---

### 🟢 MINUTO 5: Conclusiones, Impacto Futuro y Cierre (4:00 - 4:45)

> *"En conclusión, NutriGrow no es solo un software; es una solución práctica a la necesidad urgente de soberanía alimentaria y salud preventiva en las ciudades modernas.*
>
> *En nuestras próximas iteraciones integraremos sensores IoT para monitorear la humedad de los huertos caseros vía telemetría y modelos de visión artificial para diagnosticar la salud de las hojas en tiempo real.*
>
> *NutriGrow demuestra que la tecnología de vanguardia, el diseño empático y la seguridad informática pueden converger para mejorar la calidad de vida de las personas.*
>
> *Muchas gracias. Quedamos a su entera disposición para preguntas."*
