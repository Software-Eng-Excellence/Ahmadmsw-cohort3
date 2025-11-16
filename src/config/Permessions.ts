
export  enum Role {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
    MANAGER = 'manager'
}
export  enum Permession {
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
    [Key in Role] : Permession[]
}

export   const RolePermession : RolePermessions = {
    [Role.ADMIN]:[
        ...Object.values(Permession)
    ],
    [Role.MANAGER]:[
        Permession.ORDER_CREATE,
        Permession.ORDER_READ,
        Permession.ORDER_UPDATE,
        Permession.ORDER_DELETE,],
        
    [Role.USER]:[
        Permession.AUTH_LOGIN,
        Permession.AUTH_LOGOUT,
        Permession.ORDER_CREATE,
        Permession.ORDER_READ,
        Permession.ORDER_UPDATE,
        Permession.ORDER_DELETE,
        Permession.USER_CREATE,
        Permession.USER_READ,
        Permession.USER_UPDATE,
        Permession.USER_DELETE
    ],
    [Role.GUEST]:[
        Permession.USER_CREATE,
        Permession.AUTH_LOGIN
    ]
    
}