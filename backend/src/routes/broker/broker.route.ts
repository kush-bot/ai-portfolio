import upstocxRoutes from './upstox/upstox.route';
import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../../db/prisma';
import { BrokerFactory } from '../../provider/IBrokerFactory';

const router = Router();


router.use('/upstocx', upstocxRoutes);

router.get('/get-holding', async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(501).json({
            message: 'Not Authorixed'
        })
    }
    if (!req.user) {
        return res.status(401).json({
            message: "Not Authenticated"
        });
    }

    const userId = req.user.userId;

    

    const brokers = await prisma.brokerConnection.findMany({
        where: {
            userId,
            active:true,
        },

        select:{
            broker:true,
            accessToken:true
        }

    });

    const broker = brokers[0]?.broker;
    const accessToken = brokers[0]?.accessToken;

    const provider = BrokerFactory.getProvider(broker as string);

    provider.getHoldings(accessToken as string);

    



    



})



export default router;