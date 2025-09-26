# 🔐 GitHub Secrets Configuration
# Configura estos secrets en tu repositorio de GitHub:
# Settings > Secrets and variables > Actions > New repository secret

## 📋 Secrets Requeridos

### 🔑 SSH Configuration
- **SSH_PRIVATE_KEY**: Tu clave privada SSH para acceder al servidor
- **SSH_USER**: Usuario SSH del servidor (ej: root, ubuntu, etc.)
- **SSH_HOST**: IP o dominio de tu servidor (ej: 192.168.1.100, tu-servidor.com)
- **DEPLOY_PATH**: Ruta donde desplegar en el servidor (ej: /home/usuario/milena-englishstudio)

### 🌐 Environment Variables
- **MONGO_URI**: mongodb+srv://milenaDB:fwpjEE76G51zVOAF@cluster0.bbin0ju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
- **SMTP_HOST**: smtp.gmail.com
- **SMTP_USER**: capitansaltodev@gmail.com
- **SMTP_PASS**: puop hjnt usuz tfsp
- **ADMIN_PASS**: admin123
- **SITE_URL**: https://milena-englishstudio.com.ar
- **CONTACT_EMAIL**: capitansaltodev@gmail.com
- **PORT**: 3001
- **JWT_SECRET**: mp_english_studio_secret_key_2024

## 🚀 Cómo Configurar los Secrets

1. Ve a tu repositorio en GitHub: https://github.com/csluduena/Milena_Web
2. Click en "Settings" (Configuración)
3. En el menú lateral, click en "Secrets and variables" > "Actions"
4. Click en "New repository secret"
5. Agrega cada secret con su nombre y valor correspondiente

## 🔧 Configuración SSH

### Generar clave SSH (si no tienes una):
```bash
ssh-keygen -t rsa -b 4096 -C "deploy@milena-englishstudio.com.ar"
```

### Configurar en el servidor:
```bash
# En tu servidor, agregar la clave pública
echo "tu-clave-publica-aqui" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Probar conexión SSH:
```bash
ssh usuario@tu-servidor "echo 'Conexión SSH exitosa'"
```

## 📁 Estructura en el Servidor

El workflow creará esta estructura en tu servidor:
```
$DEPLOY_PATH/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── node_modules/
├── static/          # Archivos del frontend build
│   ├── index.html
│   ├── static/
│   └── ...
└── start.sh
```

## 🔄 Flujo de Deploy

1. **Push a main**: El workflow se ejecuta automáticamente
2. **Build**: Construye el frontend y prepara el backend
3. **Deploy**: Sube archivos al servidor via SSH
4. **Start**: Ejecuta el script de inicio con PM2
5. **Reload**: Recarga Nginx

## 🚨 Solución de Problemas

### Error de SSH:
- Verificar que la clave SSH esté correctamente configurada
- Comprobar que el usuario SSH tenga permisos
- Revisar que el servidor esté accesible

### Error de Permisos:
- Asegurar que el usuario SSH pueda escribir en DEPLOY_PATH
- Verificar permisos de ejecución del script start.sh

### Error de PM2:
- Instalar PM2 globalmente: `npm install -g pm2`
- Verificar que PM2 esté en el PATH del usuario SSH

### Error de Nginx:
- Verificar configuración de Nginx
- Comprobar que el proxy reverso esté configurado correctamente
