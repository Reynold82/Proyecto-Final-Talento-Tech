# Proyecto-Final-Talento-Tech 
_Diego González Ahumada - Comisión: 25024_

---

## *DOCUMENTACIÓN `products-api`*

Esta API REST fue desarrollada para administrar un catálogo de productos. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos de una tienda, garantizando la seguridad de los datos mediante un sistema de autenticación basado en JSON Web Tokens (JWT).

## Tecnologías Utilizadas

*   **Node.js:** Entorno de ejecución para JavaScript en el servidor.
*   **Express.js:** Framework minimalista para construir la API y gestionar rutas.
*   **Firebase (Firestore):** Base de datos NoSQL en la nube para el almacenamiento de los productos.
*   **JSON Web Token (JWT):** Estándar para la creación de tokens de acceso que permiten la autenticación segura de las rutas.

## Dependencias del Proyecto

*   `express`: El framework web.
*   `cors`: Para habilitar peticiones desde otros dominios (Cross-Origin Resource Sharing).
*   `dotenv`: Para manejar variables de entorno desde un archivo `.env`.
*   `firebase`: SDK de Firebase para conectar con Firestore.
*   `jsonwebtoken`: Para generar y verificar los tokens JWT.
*   `nodemon` (dependencia de desarrollo): Para reiniciar el servidor automáticamente durante el desarrollo.

## Configuración del Proyecto (Para ejecutar localmente)

Pasos para levantar el servidor en un entorno local:

#### 1. Clonar el repositorio
```bash
git clone https://github.com/Reynold82/Proyecto-Final-Talento-Tech.git
cd products-api
```
#### 2. Instalar dependencias
```bash
npm install
```
#### 3. Crear el archivo de variables de entorno
Crea un archivo llamado .env en la raíz del proyecto y configúralo con tus propias credenciales.

```bash
env
# Puerto en el que correrá el servidor
PORT=3000

# Clave secreta para firmar los tokens JWT. Debe ser una cadena larga y segura.
JWT_SECRET_KEY="cadena_de_texto_extensa_y_segura"

# Credenciales de tu proyecto de Firebase
FIREBASE_APIKEY="TU_API_KEY"
FIREBASE_AUTHDOMAIN="TU_AUTH_DOMAIN"
FIREBASE_PROJECTID="TU_PROJECT_ID"
FIREBASE_STORAGEBUCKET="TU_STORAGE_BUCKET"
FIREBASE_MESSAGINGSENDERID="TU_MESSAGING_SENDER_ID"
FIREBASE_APPID="TU_APP_ID"
````

#### 4. Ejecutar el servidor
   
Para desarrollo (con reinicio automático):
```bash
npm run dev
```
Para producción:
```bash
npm run start
```

El servidor estará corriendo en http://localhost:3000 (o el puerto que definas en .env).

---

## API Desplegada

La API también se encuentra desplegada en Vercel y está disponible para ser consumida desde la siguiente URL base:

`https://proyecto-final-talento-tech-one.vercel.app/`

Todos los *endpoints* documentados a continuación funcionan sobre esta URL. Por ejemplo, para obtener todos los productos, la petición sería a `https://proyecto-final-talento-tech-one.vercel.app/api/products`.

---

## Puntos de Acceso (Endpoints) de la API

### Autenticación
`POST /auth/login`
Autentica a un usuario y devuelve un token JWT si las credenciales son válidas.

- *Autenticación*: No requerida.
- *Request Body*:
```json
{
    "email": "user@login.com.ar",
    "password": "userlogin2025"
}
```
- Respuesta Exitosa (200 OK):
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- Respuesta de Error (401 Unauthorized):
```json
{
    "message": "Credenciales inválidas"
}
```

---

### Productos


_Nota: Todas las rutas de productos requieren autenticación. Debes incluir el token JWT en la cabecera de la petición._

- *`GET /api/products`*
Devuelve una lista de todos los productos.

    - Header: *`Authorization: Bearer <TU_TOKEN>`*
    - Respuesta Exitosa (200 OK):
```json
[
    {
        "id": "un-id-de-firestore",
        "name": "Laptop Pro",
        "price": 1200,
        "description": "Una laptop potente para profesionales."
    }
]
```
---
- *GET /api/products/:id*
Devuelve un producto específico por su ID.

    - Parámetros de URL: *`id (string)` - El ID del producto en Firestore.*
    - Respuesta Exitosa (200 OK):
```json
{
    "id": "un-id-de-firestore",
    "name": "Laptop Pro",
    "price": 1200,
    "description": "Una laptop potente para profesionales."
}
```
    - Respuesta de Error (404 Not Found):
```json
{
    "message": "Producto no encontrado"
}
```
---
- *`POST /api/products/create`*
Crea un nuevo producto en el catálogo.

    - Request Body:
```json
{
    "name": "Teclado Mecánico",
    "price": 150,
    "description": "Teclado con switches Cherry MX."
}
```
    - Respuesta Exitosa (201 Created):
```json
{
    "message": "Producto creado con éxito",
    "id": "nuevo-id-generado"
}
```
    - Respuesta de Error (400 Bad Request):
```json
{
    "message": "Error al crear el producto",
    "error": "El precio del producto no puede ser negativo."
}
```
---
- *`PUT /api/products/:id`*
Actualiza completamente un producto existente. Reemplaza toda la información del producto con la enviada en el body.

    - Parámetros de URL: *`id (string)` - El ID del producto a actualizar.*
    - Request Body:
```json
{
    "name": "Teclado Mecánico RGB",
    "price": 160,
    "description": "Teclado con switches Cherry MX y luces RGB."
}
```
    - Respuesta Exitosa (200 OK):
```json
{
    "message": "Producto actualizado con éxito"
}
```
---
- *`PATCH /api/products/:id`*
Actualiza parcialmente un producto existente. Solo modifica los campos enviados en el body.

    - Parámetros de URL:
    - *id (string) - El ID del producto a actualizar.*
    - Request Body:
```json
{
    "price": 155
}
```
    - Respuesta Exitosa (200 OK):
```json
{
    "message": "Producto actualizado con éxito"
}
```
---
- *`DELETE /api/products/:id`*
Elimina un producto del catálogo.

    - Parámetros de URL: *`id (string) - El ID del producto a eliminar.`*
    - Respuesta Exitosa (200 OK):
```json
{
    "message": "Producto eliminado exitosamente"
}
```
    - Respuesta de Error (404 Not Found):
```json
{
    "message": "Error al eliminar el producto",
    "error": "Producto no encontrado para eliminar."
}
```
---

## Pruebas de la API
Para facilitar la prueba y el uso de esta API, se adjunta una colección para un cliente de API (el archivo es "thunder-collection_postman_products-api-deployed-version.json" en la raíz del proyecto). Esta colección contiene todas las peticiones aquí documentadas, pre-configuradas para demostrar el correcto funcionamiento de cada endpoint.

Para usarla:

1. Importa la colección en tu cliente de API.
2. Realiza la petición de Login para obtener un token.
3. Configura el token obtenido como una variable de entorno en tu cliente de API para que se use automáticamente en las rutas protegidas.
4. Ejecuta las demás peticiones para interactuar con la API.
