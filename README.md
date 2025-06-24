# Editor de Preguntas Interactivas

## Descripción

Este proyecto permite a los profesores crear **preguntas interactivas** clasificadas en tres niveles de dificultad. La aplicación está diseñada para facilitar la construcción visual de preguntas mediante elementos arrastrables y configurables dentro de una imagen principal.

Los profesores podrán:

- Subir múltiples imágenes individuales como componentes visuales.
- Componer la imagen principal mediante posicionamiento manual.
- Las respuestas se armaran de acuerdo a su composicion de la imagen principal.
- Visualizar una **vista previa interactiva** para probar la pregunta antes de su publicación.
- Editar y eliminar preguntas ya creadas.
- Clasificar las preguntas por niveles ya definidos.
- Validar la solución ingresada por los estudiantes como correcta o incorrecta.

> Para poder **crear, editar o visualizar preguntas**, es necesario estar **registrado y autenticado** en la plataforma.  
> Durante el registro, se enviará un **código de verificación por correo electrónico** que el usuario deberá ingresar para completar el proceso de activación de su cuenta.

## Recomendaciones para las Imágenes

> Las imágenes que se suben deben tener **fondo transparente**, preferiblemente en formato `.png`.  
> Esto asegura una correcta visualización e integración con la imagen principal, evitando bloques blancos o recortes no deseados.

- **Formato recomendado**: `.png`
- **Fondo**: Transparente

## Sitios donde descargar imagenes con  fondo transparente

[Thiings.co: iconos e ideas en PNG transparente ](https://www.thiings.co/things)  
[pngimg.com: Banco de imágenes PNG transparente ](https://pngimg.com/)  
[pngtree.com: Banco de imágenes PNG transparente ](https://pngtree.com/)  
[cleanpng.com: Banco de imágenes PNG transparente ](https://www.cleanpng.com/)  
[pngegg.com: Banco de imágenes PNG transparente ](https://www.pngegg.com/)  

### ¿Qué sucede si no es transparente?

- El sistema aceptará la imagen, pero puede **afectar negativamente** la claridad del ejercicio.
- El fondo no deseado puede **ocultar otros elementos** o distorsionar la apariencia visual de la imagen principal.

---

## Requisitos Previos

| Herramienta | Versión Mínima | Enlace de Descarga                                               |
| ----------- | -------------- | ---------------------------------------------------------------- |
| Git         | 2.46.2         | [https://git-scm.com/downloads](https://git-scm.com/downloads)   |
| Node.js     | 22.14.0        | [https://nodejs.org/en/download](https://nodejs.org/en/download) |
| npm         | 10.9.2         | Incluido con Node.js                                             |

---

## Instalación y Ejecución

Para ejecutar correctamente este proyecto en un entorno local, consulte el archivo [install.txt](./install.txt), el cual contiene instrucciones detalladas sobre:

- Clonado del repositorio.
- Configuración de variables de entorno para frontend y backend.
- Instalación de dependencias.
- Ejecución de ambos entornos (cliente y servidor).

---

## Estructura General del Proyecto

- **Frontend** (`/frontend`): Aplicación construida con Vite + React, responsable de la interfaz de usuario y la experiencia interactiva.
- **Backend** (`/backend`): Servidor Express que maneja la autenticación, persistencia de datos y la lógica.

---

## Autenticación

El flujo de autenticación incluye:

1. Registro con nombre, correo electrónico y contraseña.
2. Envío de un código de verificación al correo proporcionado.
3. Validación del código para habilitar la cuenta.
4. Login con token JWT para autenticación de sesiones.
