# 🚀 Guía de Despliegue a Producción - MP English Studio

## 📋 Información del Proyecto
- **Dominio**: milena-englishstudio.com.ar
- **Frontend**: React (puerto 80/443)
- **Backend**: Node.js + Express (puerto 3001)
- **Base de datos**: MongoDB Atlas
- **Hosting**: Hostinger VPS

## 🔧 Configuración del Servidor

### 1. **Preparar el VPS**
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (versión 18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Nginx
sudo apt install nginx -y

# Instalar PM2 para gestión de procesos
sudo npm install -g pm2
```

### 2. **Subir Archivos**
```bash
# Usar el script de despliegue local
chmod +x deploy.sh
./deploy.sh

# Subir el contenido de 'production/' al VPS
# Recomendado usar SCP o SFTP
scp -r production/* usuario@tu-vps:/home/usuario/milena-englishstudio/
```

### 3. **Configurar Nginx**
```bash
# Copiar configuración de Nginx
sudo cp nginx-config.conf /etc/nginx/sites-available/milena-englishstudio.com.ar

# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/milena-englishstudio.com.ar /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 4. **Configurar SSL (Certificado HTTPS)**
```bash
# Instalar Certbot para Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
sudo certbot --nginx -d milena-englishstudio.com.ar -d www.milena-englishstudio.com.ar

# Verificar renovación automática
sudo certbot renew --dry-run
```

### 5. **Iniciar la Aplicación**
```bash
# En el directorio del proyecto en el VPS
cd /home/usuario/milena-englishstudio

# Instalar dependencias del backend
cd backend && npm install && cd ..

# Iniciar con PM2
pm2 start backend/server.js --name "milena-backend"
pm2 startup
pm2 save
```

## 🔐 Variables de Entorno

### Backend (.env)
```env
MONGO_URI=mongodb+srv://milenaDB:fwpjEE76G51zVOAF@cluster0.bbin0ju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SMTP_HOST=smtp.gmail.com
SMTP_USER=capitansaltodev@gmail.com
SMTP_PASS=puop hjnt usuz tfsp
ADMIN_PASS=admin123
SITE_URL=https://milena-englishstudio.com.ar
CONTACT_EMAIL=capitansaltodev@gmail.com
PORT=3001
JWT_SECRET=mp_english_studio_secret_key_2024
NODE_ENV=production
```

## 📁 Estructura de Archivos en el VPS
```
/home/usuario/milena-englishstudio/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── ...
├── static/          # Archivos del frontend build
│   ├── index.html
│   ├── static/
│   └── ...
└── start.sh
```

## 🌐 URLs de Acceso
- **Sitio web**: https://milena-englishstudio.com.ar
- **Panel admin**: https://milena-englishstudio.com.ar/admin
- **API**: https://milena-englishstudio.com.ar/api/

## 🔧 Comandos Útiles

### Monitoreo
```bash
# Ver logs de PM2
pm2 logs milena-backend

# Estado de la aplicación
pm2 status

# Reiniciar aplicación
pm2 restart milena-backend
```

### Nginx
```bash
# Ver logs de Nginx
sudo tail -f /var/log/nginx/milena-englishstudio.com.ar.access.log
sudo tail -f /var/log/nginx/milena-englishstudio.com.ar.error.log

# Recargar configuración
sudo nginx -s reload
```

### Actualizaciones
```bash
# Para actualizar el código:
# 1. Hacer cambios localmente
# 2. Ejecutar: ./deploy.sh
# 3. Subir archivos al VPS
# 4. Reiniciar: pm2 restart milena-backend
```

## 🚨 Solución de Problemas

### Error de CORS
- Verificar que `SITE_URL` en .env sea `https://milena-englishstudio.com.ar`
- Revisar configuración de Nginx para proxy de API

### Error de SSL
- Verificar certificados SSL
- Comprobar configuración de Nginx

### Error de Base de Datos
- Verificar conexión a MongoDB Atlas
- Revisar IPs permitidas en MongoDB Atlas

## 📞 Soporte
Si tienes problemas con el despliegue, revisa:
1. Logs de PM2: `pm2 logs milena-backend`
2. Logs de Nginx: `sudo tail -f /var/log/nginx/error.log`
3. Estado de servicios: `sudo systemctl status nginx`
