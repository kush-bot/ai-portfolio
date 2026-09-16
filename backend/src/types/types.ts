export interface User{
    id:string,
    googleId:string,
    name:string,
    avatar:string,
    email:string
    is_email_varified:boolean
};


export interface JwtData{
    userId:string,
    email:string
}

export interface BrokerConnectionUser{
    id:string,
    userId:string,
    broker:string,
    brokerUserId:string,
    accessToken:string,
    extendedToken?:string,    
}

export interface UpstocxTokenExchangeResponse{
    BrokerEmail:string,
    Broker:string,
    BrokerUserID:string,
    BrokerUserName:string,
    BrokerUserType:string,
    Access_token:string,
    Extended_token:string

}



export interface UnifiedHolding{
    
}