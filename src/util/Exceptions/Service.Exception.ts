export class ServiceException extends Error {
    constructor(message: string, error: Error) {
        super(`${message} : ${error.message}`);
        this.name = 'ServiceException';
        this.stack = error.stack;
        this.message = `${message} : ${error.message}`;
    }
}