export class UserAlreadyExistsError extends Error{
    statuscode:number;
    constructor(message:string,statuscode:number) {
            super(message);
            this.statuscode=statuscode;
            this.name="UserAlreadyExistsError"
    }
}

export class GoogleTokenExchageError extends Error{
    statuscode:number;

    constructor(message:string,statusCode:number) {
        super(message);
        this.statuscode = statusCode
    }
}


export class UpstoxCodeExchangeFailed extends Error{
    statuscode:number;

    constructor(messsage:string,statusCode:number){
        super(messsage);
        this.statuscode = statusCode;
    }

}

