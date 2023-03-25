export interface TimestampAttributes {
	createdAt: Date;
	updatedAt: Date;
}

export type AvailableModelAttributes<T extends { [key: string]: any }> = (
	| keyof T
	| keyof TimestampAttributes
)[];
