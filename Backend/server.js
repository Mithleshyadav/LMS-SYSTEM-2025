require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/db.js');

import errorMiddleware from "./middlewares/error.middleware.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

connectToDb();
app.use(express.json());


const userRoutes = require('./routes/user.route');
app.use('/api/v1/auth', userRoutes);

app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
});

app.use(errorMiddleware);