# MP English Studio - Backend API

Backend API para MP English Studio desarrollado con Node.js, Express y MongoDB.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno en `.env`:
```
MONGO_URI=mongodb+srv://...
SMTP_HOST=smtp.gmail.com
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicacion
ADMIN_PASS=admin123
SITE_URL=http://localhost:3000
CONTACT_EMAIL=tu-email@gmail.com
PORT=3001
JWT_SECRET=tu-secreto-jwt
```

3. Ejecutar servidor:
```bash
npm start
# o para desarrollo:
npm run dev
```

## Endpoints

### Productos
- `GET /api/products` - Obtener productos activos
- `GET /api/products/admin` - Obtener todos los productos (admin)
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear producto (admin)
- `PUT /api/products/:id` - Actualizar producto (admin)
- `DELETE /api/products/:id` - Eliminar producto (admin)

### Contacto
- `POST /api/contact` - Enviar mensaje de contacto

### Autenticación
- `POST /api/auth/login` - Login admin
- `GET /api/auth/verify` - Verificar token

### Salud
- `GET /api/health` - Estado de la API

## Modelo de Producto

```javascript
{
  title: String,        // Título del producto
  description: String,  // Descripción
  price: Number,       // Precio
  showPrice: Boolean,  // Mostrar precio (default: true)
  imageUrl: String,    // URL de imagen
  showImage: Boolean,  // Mostrar imagen (default: true)
  order: Number,       // Orden de visualización (default: 0)
  active: Boolean,     // Activo (default: true)
  createdAt: Date,     // Fecha de creación
  updatedAt: Date      // Fecha de actualización
}
```

## Autenticación

Para endpoints de admin, incluir header:
```
Authorization: Bearer <token>
```

El token se obtiene del endpoint `/api/auth/login`.
