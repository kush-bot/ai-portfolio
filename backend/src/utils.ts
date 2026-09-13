import {User} from './types/types'

export function mapGoogleUser(userinfo:any):User{
    return {
        googleId:userinfo.sub,
        name:userinfo.name,
        avatar:userinfo.avatar,
        email:userinfo.avatar,
        is_email_varified:userinfo.email_verified
    };
}