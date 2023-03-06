import { createTransport } from 'nodemailer';

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_EMAIL_FROM,
        pass: process.env.NODEMAILER_EMAIL_PASS
    }
});

export const sendMail = async (subject, data, extra = '') => {
    const content = JSON.stringify(data).replaceAll(',', '\n')
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL_FROM,
        to: process.env.NODEMAILER_EMAIL_TO,
        subject: subject,
        html: `<h2>Datos recibidos:</h2><pre>${content}</pre><p>${extra}</p>`
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (err) {
        console.log(err)
    }
}