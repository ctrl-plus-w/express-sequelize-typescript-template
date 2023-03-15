import database from '@database/index';
import seed from '@database/seed';

import configLogger from '@logger/config';

(async () => {
	await database.sync({ force: true });
	await seed();

	configLogger.info('Database setup and synced');
})();
