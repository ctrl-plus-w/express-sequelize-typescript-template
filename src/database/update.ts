import database from '@database/index';

import configLogger from '@logger/config';

(async () => {
	await database.sync();

	configLogger.info('Database synced');
})();
