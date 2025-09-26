const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// GET /api/products - Obtener todos los productos activos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ active: true })
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// GET /api/products/admin - Obtener todos los productos (admin)
router.get('/admin', auth, async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products for admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// POST /api/products - Crear nuevo producto (admin)
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      showPrice = true,
      imageUrl,
      showImage = true,
      order = 0,
      active = true
    } = req.body;
    
    // Validaciones básicas
    if (!title || !description || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Título, descripción y precio son requeridos'
      });
    }
    
    const product = new Product({
      title,
      description,
      price,
      showPrice,
      imageUrl,
      showImage,
      order,
      active
    });
    
    await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// PUT /api/products/:id - Actualizar producto (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      showPrice,
      imageUrl,
      showImage,
      order,
      active
    } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    // Actualizar campos
    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (showPrice !== undefined) product.showPrice = showPrice;
    if (imageUrl !== undefined) product.imageUrl = imageUrl;
    if (showImage !== undefined) product.showImage = showImage;
    if (order !== undefined) product.order = order;
    if (active !== undefined) product.active = active;
    
    await product.save();
    
    res.json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// DELETE /api/products/:id - Eliminar producto (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
