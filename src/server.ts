import express from 'express'
import 'dotenv/config';
import cors from 'cors';
import router from './router';
import { connectToDatabase } from './config/db';
import { corsOptions } from './config/cors';

const app = express();

connectToDatabase();

//cors
app.use(cors(corsOptions));


//APP
app.use(express.json());

app.use('/' , router);

export default app;