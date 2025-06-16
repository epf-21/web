import nodemailer from 'nodemailer'
import { SERVICE, EMAIL_USER, EMAIL_PASS } from './env.js'

const transport = nodemailer.createTransport({
  service: SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
})

export async function sendVerificationMail (email, verificationCode) {
  const mailOptions = {
    from: `"Editor de Preguntas" <${EMAIL_USER}>`,
    to: email,
    subject: 'Verificación de correo electrónico',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center;">Verificación de correo electrónico</h2>
        <p style="color: #666; font-size: 16px;">
          Gracias por registrarte en nuestro Editor de Preguntas Interactivas.
        </p>
        <p style="color: #666; font-size: 16px;">
          Para completar tu registro, por favor usa el siguiente código de verificación:
        </p>
        <div style="background-color: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #495057; margin: 0; font-size: 32px; letter-spacing: 5px;">${verificationCode}</h1>
        </div>
        <p style="color: #666; font-size: 14px;">
          Este código expirará en 10 minutos por seguridad.
        </p>
        <p style="color: #666; font-size: 14px;">
          Si no solicitaste este registro, puedes ignorar este correo.
        </p>
      </div>
    `
  }
  try {
    await transport.sendMail(mailOptions)
    return true
  } catch (error) {
    throw new Error('Error al enviar email de verificación')
  }
}

transport.verify((error, success) => {
  if (error) {
    console.log('Error en la consiguración de email: ', error)
  } else {
    console.log('Servidor de email listo para enviar mensajes')
  }
})

export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
