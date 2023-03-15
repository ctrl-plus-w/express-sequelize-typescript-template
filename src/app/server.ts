import { json } from 'express';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import requestLogger from '@middleware/requestLogger';
import errorHandler from '@middleware/errorHandler';
import notFound from '@middleware/notFound';

import mainRouter from '@route/index';

import mainLogger from '@logger/main';

import '@database/index';

dotenv.config();

const app = express();

app.use(json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(requestLogger);

app.use('/api', mainRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5500;

app.listen(port, () => {
	mainLogger.info(`Server started on port ${port}.`);
});
