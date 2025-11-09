

import {Router} from "express";
import {UserrController} from "../controller/user.controller";
import { UserSerivce } from "../services//userManagement";
import { authenticate } from "../middleware/auth.middlware";

const app = Router();
const userService = new UserSerivce();
const UsersController = new UserrController(userService);


app.get("/me", authenticate, UsersController.getCurrentUser.bind(UsersController));


app.route("/")
    .get(authenticate, UsersController.getUsers.bind(UsersController))
    .post(UsersController.createUser.bind(UsersController));


app.route("/:id")
    .get(authenticate, UsersController.getUserById.bind(UsersController))
    .put(authenticate, UsersController.updateUser.bind(UsersController))
    .delete(authenticate, UsersController.deleteuser.bind(UsersController))
export default app;