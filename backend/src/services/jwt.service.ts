import jwt from 'jsonwebtoken';
import { JwtData } from '../types/types';

export const createJWT=({userId,email}:JwtData)=>{
    const secret = process.env.JWT_SECRET;

    if(!secret){
        console.error("jwt secret not configured");
        return;
    }
    const token = jwt.sign({userId,email},secret as jwt.Secret,{expiresIn:"1d"})
    console.log("token ",token);
    return token;
}