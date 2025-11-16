export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
    MANAGER = 'manager'
}

export enum Permession {
    ORDER_CREATE = 'order:create',
    ORDER_READ   = 'order:read',
    ORDER_UPDATE = 'order:update',
    ORDER_DELETE = 'order:delete',

    USER_CREATE  = 'user:create',
    USER_READ    = 'user:read',
    USER_UPDATE  = 'user:update',
    USER_DELETE  = 'user:delete',

    AUTH_LOGIN   = 'auth:login',
    AUTH_LOGOUT  = 'auth:logout'
}

type RolePermessions = {
    [Key in Role]: Permession[]
}

export const RolePermession: RolePermessions = {
    // 🔥 ADMIN HAS ALL PERMISSIONS
    [Role.ADMIN]: [
        ...Object.values(Permession)
    ],

    // 🔥 MANAGER → ONLY ORDER CRUD (no user CRUD)
    [Role.MANAGER]: [
        Permession.ORDER_CREATE,
        Permession.ORDER_READ,
        Permession.ORDER_UPDATE,
        Permession.ORDER_DELETE
    ],

    // 🔥 USER → ONLY ORDER CRUD + AUTH
    [Role.USER]: [
        Permession.AUTH_LOGIN,
        Permession.AUTH_LOGOUT,

        Permession.ORDER_CREATE,
        Permession.ORDER_READ,
        Permession.ORDER_UPDATE,
        Permession.ORDER_DELETE
        // ❌ Removed all 'user:*' permissions
    ],

    // 🔥 GUEST → Only login + register
    [Role.GUEST]: [
        Permession.USER_CREATE,  // register
        Permession.AUTH_LOGIN
    ]
}
