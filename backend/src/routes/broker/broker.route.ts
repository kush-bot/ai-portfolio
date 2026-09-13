import upstocxRoutes from './upstox/upstox.route';
import { Router } from 'express';

const router = Router();


router.use('/upstocx',upstocxRoutes);



export default router;