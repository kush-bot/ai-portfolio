import axios from 'axios'
export default class Upstox{
    constructor(){

    }

    getAuthrizationRedirectUrl():string {
        return process.env.UPSTOX_LOGIN_REDIRECT!+`?response_type=code&&client_id=${process.env.UPSTOX_API_KEY}&redirect_uri=http://localhost:4000/broker/upstocx/code-exchange`;
    }

    async exchangeCode(code:string){
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
        console.log("the res ",res);



    }

}