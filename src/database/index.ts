import { Sequelize } from 'sequelize';
import { join } from 'path';

import dotenv from 'dotenv';
import glob from 'glob';

dotenv.config();

// Get the database directory depending on the node environment
const isProduction = process.env.NODE_ENV === 'production';
const databaseFolder = isProduction ? 'dist/database' : 'src/database';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: join(databaseFolder, 'database.db'),
	define: { paranoid: true },
	logging: false,
});

const funcs = ['init', 'associate'];
const files = glob.sync(isProduction ? '*.js' : '*.ts', {
	cwd: join(databaseFolder, 'models'),
});

// Execute the `init` and `associate` functions of the models
for (const func of funcs) {
	for (const file of files) {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const model = require('./models/' + file);
		if (func in model) model[func](sequelize);
	}
}

export default sequelize;
