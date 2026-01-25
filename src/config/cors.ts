import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN || process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};