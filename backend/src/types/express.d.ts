import { JwtData } from "./types";

declare global{
    namespace Express{
        interface Request{
            user?:JwtData
        }
    }
}

export {};