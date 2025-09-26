const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// POST /api/contact - Enviar mensaje de contacto
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validaciones básicas
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y mensaje son requeridos'
      });
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email inválido'
      });
    }
    
    // Configurar el email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Nuevo mensaje de contacto - MP English Studio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6B4E31;">Nuevo mensaje de contacto</h2>
          <div style="background-color: #f3ece2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
            <p><strong>Mensaje:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto de MP English Studio.
          </p>
        </div>
      `
    };
    
    // Enviar email
    await transporter.sendMail(mailOptions);
    
    res.json({
      success: true,
      message: 'Mensaje enviado exitosamente. Te contactaremos pronto.'
    });
    
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar el mensaje. Por favor, intentá nuevamente.'
    });
  }
});

module.exports = router;
