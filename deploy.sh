#!/bin/bash

# Script de despliegue para producción
# Para usar: chmod +x deploy.sh && ./deploy.sh

echo "🚀 Iniciando despliegue a producción..."

# 1. Build del frontend
echo "📦 Construyendo frontend..."
cd frontend
npm run build
echo "✅ Frontend construido"

# 2. Preparar archivos para Hostinger
echo "📁 Preparando archivos para Hostinger..."
cd ..

# Crear directorio de producción
mkdir -p production
cp -r frontend/build/* production/
cp -r backend production/

# Crear archivo de configuración de producción
cat > production/backend/.env << EOF
MONGO_URI=mongodb+srv://milenaDB:fwpjEE76G51zVOAF@cluster0.bbin0ju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SMTP_HOST=smtp.gmail.com
SMTP_USER=milenapaezenglishstudio@gmail.com
SMTP_PASS=puop hjnt usuz tfsp
ADMIN_PASS=admin123
SITE_URL=https://milena-englishstudio.com.ar
CONTACT_EMAIL=milenapaezenglishstudio@gmail.com
PORT=3001
JWT_SECRET=mp_english_studio_secret_key_2024
NODE_ENV=production
EOF

# Crear script de inicio para producción
cat > production/start.sh << 'EOF'
#!/bin/bash
echo "🚀 Iniciando servidor en producción..."

# Instalar dependencias si es necesario
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd backend && npm install && cd ..
fi

# Iniciar servidor
echo "🌐 Iniciando servidor backend en puerto 3001..."
cd backend && npm start &
BACKEND_PID=$!

echo "✅ Servidor iniciado con PID: $BACKEND_PID"
echo "🌍 Frontend disponible en: https://milena-englishstudio.com.ar"
echo "🔧 Backend API disponible en: https://milena-englishstudio.com.ar:3001"

# Mantener el script corriendo
wait $BACKEND_PID
EOF

chmod +x production/start.sh

echo "✅ Archivos preparados en el directorio 'production/'"
echo ""
echo "📋 Pasos para desplegar en Hostinger:"
echo "1. Subir el contenido de 'production/' al VPS"
echo "2. Configurar el dominio milena-englishstudio.com.ar"
echo "3. Ejecutar: chmod +x start.sh && ./start.sh"
echo "4. Configurar proxy reverso para el puerto 3001"
echo ""
echo "🎉 ¡Despliegue listo!"
