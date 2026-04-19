import dotenv from "dotenv";
dotenv.config();

import app from "../server/app.ts";
import connectDB from "../server/configs/db.ts";

export default async (req: any, res: any) => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from Vercel Environment Variables. Please add it in the Vercel Dashboard.");
        }
        await connectDB();
        return app(req, res);
    } catch (error: any) {
        console.error("Vercel Backend Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error in Vercel API", 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            hint: "Check if MONGODB_URI is correctly set in Vercel Environment Variables and Atlas IP Whitelist allows 0.0.0.0/0"
        });
    }
};
