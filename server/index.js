import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server starts running at port ${PORT}`);
})