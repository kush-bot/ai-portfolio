export interface IBrokerProvider{
    getHoldings(accesToken:string):Promise<any[]>;
    getAuthUrl():string;
    getPosition():Promise<any[]>
}