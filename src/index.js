import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js'; 
import postRoutes from './routes/postRoutes.js';




dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(cors());


//Routes
app.use('/api/posts', postRoutes);


//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


//Testing the poatgres connection
app.get('/', async (req, res) => {
    console.log("Start");
    const result = await pool.query('SELECT current_database()');
    console.log("end");
    res.send('The database name is ' + result.rows[0].current_database);
});


//Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


