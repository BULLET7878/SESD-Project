import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute';
import sellerRouter from './routes/sellerRoute';
import productRouter from './routes/productRoute';
import cartRouter from './routes/cartRoute';
import addressRouter from './routes/addressRoute';
import orderRouter from './routes/orderRoute';
import { stripeWebhooks } from './controllers/orderController';

const app = express();

app.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhooks
);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || process.env.NODE_ENV !== "production" || allowedOrigins.includes(origin) || origin.includes("vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

app.get('/', (req, res) => res.send("API is Working"));
app.get('/api/health', (req, res) => res.json({ status: "OK", timestamp: new Date().toISOString() }));

app.use("/api/user", userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

export default app;
