require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/db.js');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

connectToDb();
app.use(express.json());

app.use((err, req, res, next)=> {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong'
  })
})

app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
});

