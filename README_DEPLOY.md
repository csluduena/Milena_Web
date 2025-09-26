# 🚀 MP English Studio - Deploy Automático con GitHub Actions

## 📋 Resumen del Proyecto
- **Dominio**: milena-englishstudio.com.ar
- **Frontend**: React (puerto 80/443)
- **Backend**: Node.js + Express (puerto 3001)
- **Base de datos**: MongoDB Atlas
- **Deploy**: GitHub Actions + SSH

## 🔧 Configuración Inicial del Servidor

### 1. Preparar el VPS
```bash
# Ejecutar en el servidor (Linux/Ubuntu)
chmod +x server-setup.sh
./server-setup.sh
```

### 2. Configurar SSL
```bash
# En el servidor
sudo certbot --nginx -d milena-englishstudio.com.ar -d www.milena-englishstudio.com.ar
```

## 🔐 Configurar GitHub Secrets

Ve a tu repositorio: https://github.com/csluduena/Milena_Web

1. **Settings** > **Secrets and variables** > **Actions**
2. **New repository secret** para cada uno:

### SSH Configuration
- `SSH_PRIVATE_KEY`: Tu clave privada SSH
- `SSH_USER`: Usuario del servidor (ej: root, ubuntu)
- `SSH_HOST`: IP o dominio del servidor
- `DEPLOY_PATH`: `/home/usuario/milena-englishstudio`

### Environment Variables
- `MONGO_URI`: `mongodb+srv://milenaDB:fwpjEE76G51zVOAF@cluster0.bbin0ju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
- `SMTP_HOST`: `smtp.gmail.com`
- `SMTP_USER`: `milenapaezenglishstudio@gmail.com`
- `SMTP_PASS`: `puop hjnt usuz tfsp`
- `ADMIN_PASS`: `admin123`
- `SITE_URL`: `https://milena-englishstudio.com.ar`
- `CONTACT_EMAIL`: `milenapaezenglishstudio@gmail.com`
- `PORT`: `3001`
- `JWT_SECRET`: `mp_english_studio_secret_key_2024`

## 🔑 Generar Clave SSH

### En tu máquina local (Windows):
```powershell
# Usar Git Bash o WSL
ssh-keygen -t rsa -b 4096 -C "deploy@milena-englishstudio.com.ar"
```

### En el servidor:
```bash
# Agregar la clave pública
echo "tu-clave-publica-aqui" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

## 🚀 Deploy Automático

### Activación
1. **Push a main**: El workflow se ejecuta automáticamente
2. **Manual**: Ve a **Actions** > **Deploy to Production** > **Run workflow**

### Proceso del Deploy
1. ✅ Build del frontend React
2. ✅ Instalación de dependencias del backend
3. ✅ Creación de archivos de producción
4. ✅ Deploy via SSH al servidor
5. ✅ Inicio automático con PM2
6. ✅ Recarga de Nginx

## 📁 Estructura en el Servidor

```
/home/usuario/milena-englishstudio/
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

## 🔧 Comandos Útiles en el Servidor

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

## 🚨 Solución de Problemas

### Error de SSH
- ✅ Verificar que la clave SSH esté en GitHub Secrets
- ✅ Comprobar conexión: `ssh usuario@servidor`
- ✅ Verificar permisos del usuario SSH

### Error de Deploy
- ✅ Revisar logs en GitHub Actions
- ✅ Verificar que todos los secrets estén configurados
- ✅ Comprobar que el servidor esté accesible

### Error de PM2
- ✅ Instalar PM2: `sudo npm install -g pm2`
- ✅ Verificar que PM2 esté en el PATH
- ✅ Revisar logs: `pm2 logs milena-backend`

### Error de Nginx
- ✅ Verificar configuración: `sudo nginx -t`
- ✅ Revisar logs: `sudo tail -f /var/log/nginx/error.log`
- ✅ Comprobar proxy reverso para /api/

## 🌐 URLs de Acceso
- **Sitio web**: https://milena-englishstudio.com.ar
- **Panel admin**: https://milena-englishstudio.com.ar/admin
- **API**: https://milena-englishstudio.com.ar/api/

## 📞 Soporte
Si tienes problemas:
1. Revisa los logs de GitHub Actions
2. Verifica los logs del servidor: `pm2 logs milena-backend`
3. Comprueba la configuración de Nginx
4. Asegúrate de que todos los secrets estén configurados

## 🎉 ¡Listo!
Una vez configurado todo, cada push a `main` desplegará automáticamente tu aplicación.
