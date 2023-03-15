import type { NextFunction, Request, Response } from 'express';

import { CustomError } from '@class/CustomError';

import mainLogger from '@logger/main';

const errorHandler = (
	err: CustomError | Error,
	_req: Request,
	res: Response,
	_next: NextFunction
): void => {
	mainLogger.error(err.toString());

	if (err instanceof CustomError) {
		res.status(err.status);
		res.json({ error: err.message });
	} else {
		res.status(500);
		res.json({ error: 'Une erreur est survenue.' });
	}
};

export default errorHandler;
