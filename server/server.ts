import app from './app';
import connectDB from './configs/db';
import connectCloudinary from './configs/cloudinary';

const port = process.env.PORT || 4000;

// Initialize critical server connections
await connectDB();
await connectCloudinary();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});