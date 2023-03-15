export class CustomError {
	status: number;
	message: string;

	/**
	 * Custom express error class
	 * @param status The error status code
	 * @param message The error message
	 */
	constructor(status = 400, message = '') {
		this.status = status;
		this.message = message;
	}

	/**
	 * Get the stringified error
	 * @returns A string
	 */
	toString() {
		return `(${this.status}) ${this.message}`;
	}
}

/**
 * Express error for not implemented features
 */
export class NotImplementedError extends CustomError {
	constructor() {
		super(501, 'Not Implemented Error');
	}
}

/**
 * Express error for 404 route not found errors
 */
export class PageNotFoundError extends CustomError {
	constructor() {
		super(404, 'Route Not Found');
	}
}
