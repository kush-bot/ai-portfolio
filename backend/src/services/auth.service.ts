import { prisma } from "../db/prisma";
import { GoogleTokenExchageError, UserAlreadyExistsError } from "../errors";
import { User } from "../types/types";
import { mapGoogleUser } from "../utils";

export const exchangeToken = async (code: string) => {

    const response = await fetch(process.env.GOOGLE_TOKEN_EXCHANGE!, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_SECRET!,
            redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
            grant_type: "authorization_code"
        })
    });

    if (!response.ok) {
        throw new Error(`Google token exchage failed ${response.status}`)
    }
    return await response.json();
}


export const getUserInfo = async (access_token: string) => {
    const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    if (!response.ok) {
        throw new GoogleTokenExchageError("failed to exchange the token",400)
    }

    return await response.json();
}



export const createUser = async (user: User):Promise<User> => {


    try {
        const exist = await prisma.user.findUnique({
            where:{
                googleId:user.googleId,
                email:user.email
            }
        })

        if(exist){
            return mapGoogleUser(exist);
        }

        const response = await prisma.user.create({
            data: {
                ...user
            }
        })
        console.log("supa response",response)

        return mapGoogleUser(response);

    }catch (error){

        if(error instanceof UserAlreadyExistsError){
            throw error
        }
        throw new Error(`user creation failed err :- ${error} `)
    }

}