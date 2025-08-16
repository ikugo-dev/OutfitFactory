import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

import cors from 'cors';
import { connectDB } from "./tools/db-connection.js";  //TODO nije .js

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://event-planner-d1df7.firebaseapp.com",
        process.env.VITE_FRONTEND_URL ??                    // TODO not sure what this does yet
            "https://event-planner-y62i.vercel.app",
        process.env.VITE_BACKEND_RUL ??
            "https://event-planner-brown.vercel.app",
    ],
    credentials: true,
}));
app.use(express.json());


(async function () {
    await connectDB();
})();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

