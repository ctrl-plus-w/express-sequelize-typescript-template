# Express Sequelize Typescript Template

This repository is a template for an ExpressJS Typescript back-end with Sequelize as the database ORM. The project should be used for a REST API with a SQL database.

## Run the project

The project's env variable need by default is the `CLIENT_URL` variable which is used by the cors middleware to allow only this URL. An other env variable is available : the `PORT` variable which sets the server listening port for requests (5500 by default).

The project includes eight scripts. Three for the development stage and four for the production stage.
- `build` : Compile and build the `/src` folder and files into the `/dist` folder.
- `start` : Run the server on the port specified on the `.env` file (if the port isn't specified, the 5500 port is used).
- `db:setup` : Setup the database, synchronise the tables and seeds from the `database/seed.ts` file. (Warning: every table is dropped and re-created, so all the content will be erased)
- `db:update` : Update the database tables, create or update the modified tables
- `dev` : Starts the development server with nodemon (listen for files updates) on the port specified on the `.env` file (if the port isn't specified, the 5500 port is used).
- `dev:db:setup` : Like the `db:setup` command without having to build the sources
- `dev:db:update` : Like the `db:update` command without having to build the sources
- `link` : Check for eslint linting errors

Three additional scripts are provided :
- `clean` : Remove the `/dist` folder
- `compile` : Compile the Typescript into Javascript
- `postcompile` : Changes the Typescript aliases path to relative paths 

## Project Structure

```
+- dist
+- src
   +- api
   |  +- controllers
   |  |  +- ...
   |  +- routes
   |     +- index.ts
   |     +- ...
   |
   +- app
   |  +- server.ts
   | 
   +- classes
   |  +- CustomError.ts
   |  +- ...
   |
   +- database
   |  +- models
   |  |  +- ...
   |  +- index.ts
   |  +- seed.ts
   |  +- setup.ts
   |  +- update.ts
   |
   +- helpers
   |  +- ...
   |
   +- loggers
   |  +- main.ts
   |
   +- middlewares
      +- errorHandler.ts
      +- notFound.ts
      +- requestLogger.ts

```

The project structure is composed of two folders, the `dist` and `src` folders. The src folder is the main part of the project, used for development, when pushed in production, the code will be compiled and put in the `dist` folder.  

First, the `api` folder, for the express api, routes are stored in the `routes` folder, every route level should be in a file. The `routes/index.ts` file is the main router which is used in the server file, this router represent the `/api` route. The `controllers` folder should store the controllers for the api. A file should contains every controllers for a route level (e.g. every `/api/users` routes controllers).

The `app` folder contains the main server file containing the api middlewares and the main `/api` route. This file shouldn't be modified unless you add some middlewares or change the configuration.  

The classes folder contains all the utility classes. By default there is only one class : the `CustomError` class which is used to return the errors of the api.

This template use sequelize as an ORM. The default database used is sqlite and the models loading and database initialization is made on the `database/index.ts` file. If you need to change the database dialect and/or credentials you can edit the `Sequelize` instance. The `models` folder contains all the database models (see more at the [Database](#database) section). The `database/update.ts` and `database/setup.ts` files are used for the `npm run` commands to sync the database (theses files shouldn't be updated). The `database/seed.ts` file is used to seed the database, this file is run when running the setup command (`npm run db:setup`).

Helpers files should be stored in the `helpers` folder. Utility functions related to strings, arrays, dates and more should be in this directory.

The `loggers` folder contains the application logger. By default it contains two files the `loggers/main.ts` for the application logs (server start, errors and requests) and the `config.ts` file that logs the setup and config messages.

Finally, the `middlewares` folder contains the express middlewares. Three files are stored by default. The `middlewares/errorHandler.ts` handles the error returned by the express controllers. The `middlewares/notFound.ts` handles the 404 requests. And finally the `middlewares/requestLogger.ts` logs the requests url, method and status code.

## Database

As said before, the database should be in SQL and uses Sequelize as an ORM. The models are imported automatically from the `database/models` folder. Models are classes and files should be formed like this (example use a table named `User`) :
```typescript
import {
	HasOneCreateAssociationMixin,
	HasOneSetAssociationMixin,
	HasOneGetAssociationMixin,
	Sequelize,
	DataTypes,
	Optional,
	UUIDV4,
	Model,
	UUID,
} from 'sequelize';

import Role from '@model/Role';

import { AvailableModelAttributes } from '@type/model';

export const userTableName = 'User';
export const userModelName = 'user';

export type AvailableUserAttributes = AvailableModelAttributes<UserAttributes>;

export interface UserAttributes {
	id: string;
	name: string;
	email: string;
	password: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
	declare id: string;
	declare name: string;
	declare email: string;
	declare password: string;

	declare getRole: HasOneGetAssociationMixin<Role>;
	declare setRole: HasOneSetAssociationMixin<Role, typeof UUID>;
	declare createRole: HasOneCreateAssociationMixin<Role>;
}

export const init = (database: Sequelize) => {
	User.init(
		{
			id: {
				type: UUID,
				defaultValue: UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
			},
			password: {
				type: DataTypes.TEXT,
			},
		},
		{
			sequelize: database,
			tableName: userTableName,
			modelName: userModelName,
		}
	);
};

export const associate = (_sequelize: Sequelize) => {
	User.hasOne(Role);
};

export default User;
```

This model file should contains some things:
- The model class with the uppercase model and its types definition the model attributes and creation attributes. The attributes type interface name should be `<UppercaseModel>Attributes` and the the creation attributes type interface name should be `<UppercaseModel>CreationAttributes`.
- The `<model>TableName` and `<model>ModelName` that respectively are the database table name and the model table name in the sequelize models object.
- The `init` exported function which should run the `Model.init()` function with the models attributes, the sequelize instance, the databse table name and the model table name.
- The optional `associate` exported function which define the relations between models.

The project includes a snippet that you can call with the `Sequelize Model`, `sequelize-model` and `sm` keywors. You only needs to enter the model name as lowercase and it fill the model template. Others models are available for declaring associations between models. You can check the `.vscode/model.code-snippets` file.
