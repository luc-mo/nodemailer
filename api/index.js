import "core-js/stable";
import "regenerator-runtime/runtime";
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import contact from './routes/contact';
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log('App creada en el puerto:', PORT);
});

app.use('/api/contact', contact);

module.exports = app;