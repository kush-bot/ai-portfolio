import {User} from './types/types'
import { UpstocxTokenExchangeResponse } from './types/types';

export function mapGoogleUser(userinfo:any):User{
    return {
        id:userinfo.id,
        googleId:userinfo.sub,
        name:userinfo.name,
        avatar:userinfo.avatar,
        email:userinfo.email,
    };
}


export function UpstoxCodeToAccessToken(upstocxResponse:any):UpstocxTokenExchangeResponse{
    return{
        BrokerEmail:upstocxResponse.email,
        Broker:upstocxResponse.broker,
        BrokerUserID:upstocxResponse.user_id,
        BrokerUserName:upstocxResponse.user_name,
        BrokerUserType:upstocxResponse.user_type,
        Access_token:upstocxResponse.access_token,
        Extended_token:upstocxResponse.extended_token
    }
}