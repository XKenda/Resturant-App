import express from 'express';
import logger from "morgan";
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './modules/auth/auth.routes.js';
import { connectToDatabase } from './config/db.js';

let app = express()


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1/auth', authRouter)


app.use(errorHandler)

connectToDatabase()

export default app;