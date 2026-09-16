import axios from 'axios'
import { UpstoxCodeToAccessToken } from '../../../../utils';
import { UpstoxCodeExchangeFailed } from '../../../../errors';
import { UpstocxTokenExchangeResponse } from '../../../../types/types';
import { IBrokerProvider } from '../../../../provider/IBrokerProvider';

export default class UpstocxProvider implements IBrokerProvider{


    getAuthUrl():string {
        return process.env.UPSTOX_LOGIN_REDIRECT!+`?response_type=code&&client_id=${process.env.UPSTOX_API_KEY}&redirect_uri=http://localhost:4000/broker/upstocx/code-exchange`;
    }

    async exchangeCode(code:string): Promise<UpstocxTokenExchangeResponse | UpstoxCodeExchangeFailed> {
        const config ={
             headers:{
            'accept':'application/json',
            'Content-Type':'application/x-www-form-urlencoded',
        }};

        const payload = new URLSearchParams({
            code,
            client_id:process.env.UPSTOX_API_KEY!,
            client_secret:process.env.UPSTOX_API_SECRET!,
            redirect_uri:'http://localhost:4000/broker/upstocx/code-exchange',
            grant_type:'authorization_code'

        })
        const res = await axios.post(`${process.env.UPSTOX_API_EDNPOINT}${process.env.UPSTOX_TOKEN_EXCHANGE_ENDPOINT}`,payload,config);

        console.log("the res of upstocz ",res.data)
        if(res.status === 200){
            return UpstoxCodeToAccessToken(res.data);
        }

        throw new UpstoxCodeExchangeFailed("failed to exchange the access token with code",401);

    }


   async getHoldings(accesToken: string): Promise<any[]> {
        const res:any[] = [];
        const config = {
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Authorization':`Bearer ${accesToken}`
            }
        }

        const response = await axios.get(process.env.UPSTOX_GET_HOLDINGS_ENDPOINT!,config);

        console.log("the holding response ",await response.data)
        



        return new Promise(()=>{
            return []
        })

        
        
   }


   getPosition(): Promise<any[]> {
        return new Promise(()=>{
        return []
    })
   }

}