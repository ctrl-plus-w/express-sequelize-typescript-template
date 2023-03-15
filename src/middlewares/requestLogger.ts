import { NextFunction, Request, Response } from 'express';

import mainLogger from '@logger/main';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
	const log = () => {
		mainLogger.debug(`[${req.method}] ${req.url} ${res.statusCode}`);
	};

	if (res.headersSent) log();
	else res.on('finish', log);

	next();
};

export default requestLogger;
