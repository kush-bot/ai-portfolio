import {Router} from 'express';
import type { Request,Response } from 'express';
import Upstox from './services/Upstox';
import { UpstoxCodeExchangeFailed } from '../../../errors';
import upstocx from './services/upstocx';
const router = Router();



router.get('/connect',(req:Request,res:Response):void=>{
    const redirect_url = upstocx.getAuthrizationRedirectUrl();
    res.redirect(redirect_url);
})


router.get('/code-exchange',(req:Request,res:Response)=>{
    const {code} = req.query;

    if(!code || typeof code != "string"){
        throw new UpstoxCodeExchangeFailed("Failed Exchange access token with code ",500);
    }

    upstocx.exchangeCode(code);


})


export default router;
