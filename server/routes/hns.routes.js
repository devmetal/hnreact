import { Router } from 'express';
import * as HnsController from '../controllers/hns.controller';

const router = new Router();

router.get('/topstories/:limit', HnsController.topstories);

router.get('/newstories/:limit', HnsController.newstories);

export default router;
