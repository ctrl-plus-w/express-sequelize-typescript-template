import { Sequelize, Optional, UUIDV4, Model, UUID } from 'sequelize';

import { AvailableModelAttributes } from '@type/model';

export const userTableName = 'User';
export const userModelName = 'user';

export type AvailableUserAttributes = AvailableModelAttributes<UserAttributes>;

export interface UserAttributes {
	id: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
	declare id: string;
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
		},
		{
			sequelize: database,
			tableName: userTableName,
			modelName: userModelName,
		}
	);
};

export const associate = (_sequelize: Sequelize) => null;

export default User;
