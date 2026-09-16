import { Router } from "express";
import type { Request,Response } from "express";
import {exchangeToken, getUserInfo} from '../services/auth.service';
import {User} from '../types/types'; 
import {mapGoogleUser} from '../utils';
import {createUser} from '../services/auth.service'
import { UserAlreadyExistsError,GoogleTokenExchageError } from "../errors";
import { createJWT } from "../services/jwt.service";
import jwt from 'jsonwebtoken';


const router = Router();

router.get('/google',(req:Request,res:Response)=>{
    const params = new URLSearchParams({
        client_id:process.env.GOOGLE_CLIENT_ID!,
        redirect_uri : process.env.GOOGLE_CALLBACK_URL!,
        response_type :"code",
        scope:"openid email profile",
        access_type:"offline",
        prompt:"consent"
    });
    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    res.redirect(googleUrl);
})


router.get("/google/callback",async(req:Request,res:Response)=>{
    const code = req.query.code;

    if(typeof code != "string"){
        return res.json({
            message:"Authorization code missing"
        })
    };


    try{
        const tokenResponse = await exchangeToken(code);
        const userInfo = await getUserInfo(tokenResponse.access_token);
        const user:User = mapGoogleUser(userInfo);
        const createdUser = await createUser(user);
        
        console.log("creating token",createUser);

        const token = createJWT({userId:createdUser.id,email:createdUser.email});

        res.cookie("token",token,{
            secure:false,
            httpOnly:true,
            sameSite:"lax",
            maxAge:24*60*60*1000
        });
        return res.redirect("http://localhost:3000/connect-broker");


    }catch(error){
if (error instanceof UserAlreadyExistsError) {
            return res.status(error.statuscode).json({
                status: "failed",
                error: error.message
            });
        }

        if (error instanceof GoogleTokenExchageError) {
            return res.status(error.statuscode).json({
                status: "failed",
                error: error.message
            });
        }

        return res.status(500).json({
            status: "failed",
            error: "Internal server error"
        });
    }
        
})



router.get('/me',(req:Request,res:Response)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            authenticated:false
        });
    }


    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        return res.status(200).json({
            authenticated:true,
            user:payload
        })
    }catch{
        return res.status(401).json({
            Authenticated:false
        })
    }
})

export default router;