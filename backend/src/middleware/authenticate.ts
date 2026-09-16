import type { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { JwtData } from "../types/types";

export function Authenticate(
    req:Request,
    res:Response,
    next:NextFunction
){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Not Authenticated"
        })
    }

    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtData ;
        
        req.user = payload;

        next()
    }catch(error){
        return res.status(401).json({
            message:"Invalid token"
        })
    }


} 