import type { NextFunction, Request, Response } from 'express';

import { PageNotFoundError } from '@class/CustomError';

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
	next(new PageNotFoundError());
};

export default notFound;
