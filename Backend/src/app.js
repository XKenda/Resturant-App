import express from 'express';
import logger from "morgan";
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
import authRouter from './modules/auth/auth.routes';

let app = express()


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1/auth', authRouter)


app.use(errorHandler())

export default app;