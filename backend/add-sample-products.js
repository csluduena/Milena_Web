const mongoose = require('mongoose');
require('dotenv').config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    addSampleProducts();
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });

// Esquema de Producto
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  showPrice: { type: Boolean, default: true },
  imageUrl: { type: String, trim: true },
  showImage: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Productos de ejemplo
const sampleProducts = [
  {
    title: "Programa 1:1 - Fluidez Profesional",
    description: "Clases personalizadas de 60 minutos enfocadas en mejorar tu fluidez y confianza en el inglés profesional. Incluye material auténtico adaptado a tu área laboral y seguimiento estratégico.",
    price: 15000,
    showPrice: true,
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
    showImage: true,
    order: 1,
    active: true
  },
  {
    title: "Taller: Tarifas para Profes",
    description: "Aprendé a fijar tus tarifas sin miedo. Incluye fórmula práctica para calcular cuánto deberías cobrar, cómo responder cuando te dicen 'está caro' y tips para crear paquetes irresistibles.",
    price: 8000,
    showPrice: true,
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    showImage: true,
    order: 2,
    active: true
  },
  {
    title: "Curso Intensivo - Preparación IELTS",
    description: "Preparación completa para el examen IELTS con estrategias específicas para cada sección. Incluye simulacros de examen y feedback personalizado.",
    price: 25000,
    showPrice: true,
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    showImage: true,
    order: 3,
    active: true
  },
  {
    title: "Workshop: Inglés para Entrevistas",
    description: "Mejorá tu inglés para entrevistas de trabajo. Practicá respuestas comunes, aprendé vocabulario específico y ganá confianza para destacar en tus entrevistas.",
    price: 12000,
    showPrice: true,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    showImage: true,
    order: 4,
    active: true
  }
];

async function addSampleProducts() {
  try {
    // Limpiar productos existentes
    await Product.deleteMany({});
    console.log('Productos existentes eliminados');
    
    // Agregar productos de ejemplo
    const products = await Product.insertMany(sampleProducts);
    console.log(`${products.length} productos agregados exitosamente`);
    
    // Mostrar productos creados
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - $${product.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error agregando productos:', error);
    process.exit(1);
  }
}
