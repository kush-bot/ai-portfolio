import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request:NextRequest){
    console.log("proxy hit ",request.nextUrl.pathname);

    const pathname = request.nextUrl.pathname;

    const isPublicRoute  = pathname === '/login';

    if(isPublicRoute){
        return NextResponse.next();
    }

    const token = request.cookies.get('token');

    if(!token){
        return NextResponse.redirect(
            new URL("/login",request.url)
        );

    }

    return NextResponse.next();
}



export const config={
    matcher:[
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ]
}