import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import coockieParser from 'cookie-parser';
import adminRouter from './routes/admin.routes.js';
import cors from 'cors';
import cartRouter from './routes/cart.routes.js';
import morgan from 'morgan';

const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(coockieParser());
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true,
}));


// routes
app.use('/api/users',userRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/cart', cartRouter);

// admin routes
app.use('/api/admin',adminRouter);

// Connect to DB first, then start server
const startServer = async () => {
    try {
        await connectDB();
        console.log('✅ MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1); // exit app on DB failure
    }
};

startServer();
