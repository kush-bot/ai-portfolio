import jwt from 'jsonwebtoken';
import { JwtData } from '../types/types';

export const createJWT=({userId,email}:JwtData)=>{
    console.log("create jwt paylaod",userId)
    const secret = process.env.JWT_SECRET;

    if(!secret){
        console.error("jwt secret not configured");
        return;
    }

    console.log("jwt info ",userId,email)
    const token = jwt.sign({userId,email},secret as jwt.Secret,{expiresIn:"1d"})
    console.log("token ",token);
    return token;
}