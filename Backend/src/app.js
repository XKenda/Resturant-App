import express from 'express';
import logger from "morgan";
import cookieParser from 'cookie-parser';

let app = express()


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export default app;