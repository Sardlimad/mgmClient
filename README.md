# 🌟 MGM Client

Este proyecto es una aplicación web de gestión de clientes desarrollada con **React** y **Material UI**, diseñada para ofrecer una experiencia moderna, segura y responsiva a los usuarios. La aplicación incluye funcionalidades avanzadas de manejo de sesiones y validación de formularios.

---

## 🚀 Características Principales

### 🔐 Autenticación

- **Inicio de Sesión y Registro**: Formularios con validaciones robustas utilizando **Formik** y **Yup**.

### 🎨 UI/UX

- **Estilo Responsivo**: Diseñado con **Material UI** para adaptarse a cualquier dispositivo.
- **Dark/Light Mode**: Cambia dinámicamente entre temas claro y oscuro.
- **Errores Personalizados**: Páginas de error con mensajes amigables y accesos rápidos a soluciones.

### ⚙️ Funcionalidades Adicionales

- **Navegación Protegida**: Implementación de rutas privadas con redirección automática.
- **Tooltip y Confirmaciones**: Mejora la usabilidad de botones clave, como el de cerrar sesión.

---

## 📂 Estructura del Proyecto

```
├── public
│   ├── index.html
│   ├── images
│   │   ├── 404.svg
│   │   └── protruding-squares.svg
├── src
│   ├── components
│   │   ├── LogoutBtn.jsx
│   ├── helpers
│   │   ├── AuthProvider.js
│   ├── layouts
│   │   ├── AuthLayout.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Page404.jsx
│   ├── validations
│   │   ├── registerValidation.js
│   ├── Configs
│   │   ├── Config.js
│   └── App.js
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React v17**: Biblioteca principal para la interfaz de usuario.
- **React Router Dom v6**: Manejo de rutas y navegación.
- **Formik**: Manejo de formularios con validaciones avanzadas.
- **Yup**: Esquemas de validación robustos.
- **Material UI**: Framework para diseño responsivo y estilizado.

---

## 🖥️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/sardlimad/your-repo.git
cd your-repo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configuración

En el archivo `src/Configs/Config.js`, configura las variables necesarias como el nombre de tu aplicación (`APP_NAME`) y la URL de la API.

### 4. Ejecutar la aplicación

```bash
npm start
```

La aplicación estará disponible en [https://mgm-client.vercel.app](https://mgm-client.vercel.app).

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 👥 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes sugerencias, abre un `issue` o envía un `pull request`.

---

## 📝 Autor

- **sardlimad**  
  Desarrollador Frontend apasionado por crear interfaces modernas y eficientes. Encuéntrame en [LinkedIn](https://www.linkedin.com/in/sardlimad/).
