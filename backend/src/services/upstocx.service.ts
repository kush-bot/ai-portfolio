import { prisma } from "../db/prisma";
import { UpstocxTokenExchangeResponse } from "../types/types";

export async function SaveBrokerUserInfo(userinfo:UpstocxTokenExchangeResponse,userId:string){
    return await prisma.$transaction(async(tx)=>{
        
        await tx.brokerConnection.updateMany({
            where:{
                userId:userId
            },
            data:{
                active:false
            }
        });
    
    const response = await tx.brokerConnection.upsert({
        where:{
            userId_broker:{
                userId:userId,
                broker:userinfo.Broker
            }
        },

        create:{
            userId:userId,
            broker:userinfo.Broker,
            accessToken:userinfo.Access_token,
            brokerUserId:userinfo.BrokerUserID,
            extendedToken:userinfo.Extended_token,
            active:true
        },

        update:{
            brokerUserId:userinfo.BrokerUserID,
            accessToken:userinfo.Access_token,
            extendedToken:userinfo.Extended_token,
            active:true
        }
    });

    return response;
})}


export async function getUpstocxAccessToken(userid:string) {
    console.log("the user id",userid);
    const access_token = await prisma.brokerConnection.findFirst({
        where:{
            userId:userid
        }
    })

    console.log("the upstocx ",access_token);
}