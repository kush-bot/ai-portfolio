export interface User{
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