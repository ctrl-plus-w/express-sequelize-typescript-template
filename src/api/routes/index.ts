import { Router } from 'express';

import { defaultRoute } from '@controller/default';

const router = Router();

router.get('/', defaultRoute);

export default router;
