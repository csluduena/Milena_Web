#!/bin/bash

# 🚀 Script de Configuración Inicial del Servidor
# Para usar: chmod +x server-setup.sh && ./server-setup.sh

echo "🚀 Configurando servidor para MP English Studio..."

# 1. Actualizar sistema
echo "📦 Actualizando sistema..."
sudo apt update && sudo apt upgrade -y

# 2. Instalar Node.js
echo "📦 Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Instalar Nginx
echo "📦 Instalando Nginx..."
sudo apt install nginx -y

# 4. Instalar PM2 globalmente
echo "📦 Instalando PM2..."
sudo npm install -g pm2

# 5. Crear directorio del proyecto
echo "📁 Creando directorio del proyecto..."
sudo mkdir -p /home/usuario/milena-englishstudio
sudo chown -R $USER:$USER /home/usuario/milena-englishstudio

# 6. Configurar Nginx
echo "🔧 Configurando Nginx..."
sudo cp nginx-config.conf /etc/nginx/sites-available/milena-englishstudio.com.ar
sudo ln -sf /etc/nginx/sites-available/milena-englishstudio.com.ar /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# 7. Verificar configuración de Nginx
echo "🔍 Verificando configuración de Nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuración de Nginx válida"
    sudo systemctl restart nginx
    sudo systemctl enable nginx
else
    echo "❌ Error en configuración de Nginx"
    exit 1
fi

# 8. Configurar firewall
echo "🔥 Configurando firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw --force enable

# 9. Instalar Certbot para SSL
echo "🔒 Instalando Certbot para SSL..."
sudo apt install certbot python3-certbot-nginx -y

echo ""
echo "✅ Configuración inicial completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configurar SSL: sudo certbot --nginx -d milena-englishstudio.com.ar"
echo "2. Configurar secrets en GitHub Actions"
echo "3. Hacer push a main para activar el deploy automático"
echo ""
echo "🔧 Comandos útiles:"
echo "- Ver logs de Nginx: sudo tail -f /var/log/nginx/error.log"
echo "- Reiniciar Nginx: sudo systemctl restart nginx"
echo "- Estado de servicios: sudo systemctl status nginx"
echo ""
echo "🎉 ¡Servidor listo para recibir deploys!"
