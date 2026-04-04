import app from "../server/app.js";
import connectDB from "../server/configs/db.js";

export default async (req, res) => {
    await connectDB();
    return app(req, res);
};
