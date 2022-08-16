import express from 'express';
import dotenv from 'dotenv'
import database from './config/database.js';


const app = express();

// dotenv
dotenv.config();

// connection database
database();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`port: ${PORT}`);
})