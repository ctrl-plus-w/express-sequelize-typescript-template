import { Request, Response, NextFunction } from 'express';

export const defaultRoute = (
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	res.json({ message: '❤️ Welcome on the API !' });
};
