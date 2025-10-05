import {httpException} from "./httpException"

export class BadRequestException extends httpException {
    constructor(message: string = "Bad Request", details?: Record<string, unknown>) {
        super(400, message, details);
        this.name = "BadRequestException";
    }
}