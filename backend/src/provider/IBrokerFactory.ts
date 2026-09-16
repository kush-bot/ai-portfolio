import { IBrokerProvider } from "./IBrokerProvider";
import UpstocxProvider from "../routes/broker/upstox/services/Upstox";
import Upstocx from "../routes/broker/upstox/services/Upstox";

export class BrokerFactory{
    static getProvider(broker:string):IBrokerProvider{
        switch(broker.toLocaleLowerCase()){
            case 'upstox' : return new UpstocxProvider();

            default: throw new Error(`unsupported broker provider ${broker}`)
        }
    }
}