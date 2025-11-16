

import {Router} from "express";
import {UserrController} from "../controller/user.controller";
import { UserSerivce } from "../services//userManagement";
import { authenticate } from "../middleware/auth.middlware";
import { hasRole } from "../middleware/authorize.middlwate";
import { Role } from "../config/Permessions";

const app = Router();
const userService = new UserSerivce();
const UsersController = new UserrController(userService);


app.get("/me", authenticate, UsersController.getCurrentUser.bind(UsersController));


app.route("/")
    .get(authenticate,hasRole([Role.ADMIN]), UsersController.getUsers.bind(UsersController))
    .post(UsersController.createUser.bind(UsersController));


app.route("/:id")
    .get(authenticate,hasRole([Role.ADMIN]), UsersController.getUserById.bind(UsersController))
    .put(authenticate,hasRole([Role.ADMIN]), UsersController.updateUser.bind(UsersController))
    .delete(authenticate,hasRole([Role.ADMIN]), UsersController.deleteuser.bind(UsersController))
export default app;