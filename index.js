import express from 'express';
import dotenv from 'dotenv'
import helmet from "helmet";
import database from './config/database.js';
import auth from './routes/auth.js';


const app = express();

// helmet
app.use(helmet());

// dotenv
dotenv.config();

// connection database
database();

// routing
app.use('/api', auth);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`port: ${PORT}`);
})