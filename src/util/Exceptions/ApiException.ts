

export class ApiException extends Error {
    public status : number
    message: string
    constructor(status: number, message: string,error : Error) {
        super(message);
        this.name = 'ApiException';
        this.status = status;
        this.stack = error.stack;
        this.message = `${message} : ${error.message}`;
    }
}