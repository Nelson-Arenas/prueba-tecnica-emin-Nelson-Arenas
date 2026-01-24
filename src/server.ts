import express from 'express'
import 'dotenv/config';
import router from './router';
import { connectToDatabase } from './config/db';

const app = express();

connectToDatabase();
app.use(express.json());

app.use('/' , router);

export default app;