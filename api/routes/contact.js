import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

router.post('/', async(req, res) => {
  const { name, email, message } = req.body;
  let transport = nodemailer.createTransport({
    service: 'hotmail',
    host: 'smtp.live.com',
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    }
  });
  const mailOptions = {
    from: `${name} <${process.env.USER}>`,
    to: process.env.RECEIVER,
    subject: message,
    text: `${message},\rEmail: ${email}`,
  }
  try {
    const info = await transport.sendMail(mailOptions);
    transport.close();
    res.send(`Message sent: ${info.messageId}`);
  } catch(error) {
    console.log(error);
    res.send(`Error: ${error}`);
  }
});

export default router;