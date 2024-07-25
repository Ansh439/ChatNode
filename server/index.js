import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();


mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {
            console.log("mongoose Connected!");
        }
    )
    .catch((error) => {
        console.log(error);
    })

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server starts running at port ${PORT}`);
})