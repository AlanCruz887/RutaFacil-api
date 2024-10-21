import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambia esto por tu proveedor de email (Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

export const sendWelcomeEmail = (userEmail, username, verificationLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: '¡Bienvenido a nuestra aplicación!',
    html: `
      <h1>Hola ${username},</h1>
      <p>Gracias por registrarte en nuestra aplicación.</p>
      <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
      <a href="${verificationLink}">Verificar cuenta</a>
      <p>Si no solicitaste esta verificación, por favor ignora este mensaje.</p>
      <p>Saludos,</p>
      <p>El equipo de la App</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
