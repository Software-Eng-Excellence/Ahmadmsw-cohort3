import {httpException} from "./httpException"


// After: NotFoundException
export class NotFoundException extends httpException {
    constructor(message: string = "Resource Not Found", details?: Record<string, unknown>) {
        super(404, message, details);
        this.name = "NotFoundException";
    }
}