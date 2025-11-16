import { ApiException } from "../../util/Exceptions/ApiException"

export class AuthorizationException extends ApiException {
    constructor(error: Error, message : string) {
        super(403, message, error);
        this.name = 'Unothorized';
    }
}

export class InvalidRoleException extends AuthorizationException {
    constructor(error: Error, role :string) {
        super(   error,"Invalid Role" +role);
        this.name = 'InvalidRoleException';
    }
}

export class InsuffientPermissionException extends AuthorizationException {
    constructor(error: Error, permission: string) {
        super(error, "Insufficient Permission: " + permission);
        this.name = 'InsuffientPermissionException';
    }
}