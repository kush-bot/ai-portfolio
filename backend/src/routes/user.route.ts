import { Router } from "express";
import {prisma} from '../db/prisma';
import type { Request,Response } from "express";

const router  = Router();

router.get("/",async(req:Request,res:Response)=>{
    const users = await prisma.user.findMany();

    res.json(users)
   
});



export default router;


