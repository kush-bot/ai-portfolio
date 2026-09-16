import {Router} from 'express';
import type { Request,Response } from 'express';
import { UpstoxCodeExchangeFailed } from '../../../errors';
import upstocx from './services/upstocx';
import { UpstocxTokenExchangeResponse } from '../../../types/types';
import { SaveBrokerUserInfo } from '../../../services/upstocx.service';
import {getUpstocxAccessToken} from '../../../services/upstocx.service';



const router = Router();

router.get('/connect',async(req:Request,res:Response):Promise<void>=>{
    const redirect_url = upstocx.getAuthUrl();
    res.redirect(redirect_url);
})


router.get('/code-exchange',async(req:Request,res:Response)=>{
    const {code} = req.query;

    if(!code || typeof code != "string"){
        throw new UpstoxCodeExchangeFailed("Failed Exchange access token with code ",500);
    }

    const UpstocxResponse: UpstocxTokenExchangeResponse | UpstoxCodeExchangeFailed = await  upstocx.exchangeCode(code); 
    if(UpstocxResponse instanceof Error){
        throw new UpstoxCodeExchangeFailed("failed to echange the tokne",501);
    }

    
    await SaveBrokerUserInfo(UpstocxResponse,req.user?.userId as string);

    res.redirect('http://localhost:3000/dashboard')
    


})


router.get('/getuserholdingsinfo',async(req:Request,res:Response)=>{
    const {user}  = req;
    
    const access_token = getUpstocxAccessToken(user?.userId as string);
})


export default router;
