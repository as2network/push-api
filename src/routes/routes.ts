/**
 * @file API Routes
 * @summary Basic API Routing
 * @param getEDItx - gets an EDI msg
 * @param addEDI - posts an EDI msg 
 * @param createShipments - creates a shipment
 */

import express from 'express';
import {getEDItx, addEDI, createShipments} from '../controllers/controller';
const router = express.Router();

router.get('/get/edi', getEDItx);

router.post('/post/edi', addEDI);

router.post('/shipment', createShipments);

export default router;