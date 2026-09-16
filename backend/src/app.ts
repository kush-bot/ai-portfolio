import express from 'express';
import type { Request,Response } from 'express';
import {logger} from './logger';
import { pinoHttp } from 'pino-http';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import brokerRoutes from './routes/broker/broker.route';
import cookieParser from 'cookie-parser';
import {Authenticate} from './middleware/authenticate'

import cors from 'cors';


const app = express();

app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.json());
app.use(cookieParser());
// app.use(
//     pinoHttp({logger})
// )




app.use('/user',Authenticate,userRoutes);
app.use('/auth',authRoutes);
app.use('/broker',Authenticate,brokerRoutes)


app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        message:"server is running "
    })
})



export default app; 

