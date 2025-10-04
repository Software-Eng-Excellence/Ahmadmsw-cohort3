

import {Router} from "express";
import {UserrController} from "../controller/user.controller";
import { UserSerivce } from "../services//userManagement";

const app = Router();
const userService = new UserSerivce();
const UsersController = new UserrController(userService);

app.route("/")
    .get(UsersController.getUsers.bind(UsersController))
    .post(UsersController.createUser.bind(UsersController));


app.route("/:id")
    .get(UsersController.getUserById.bind(UsersController))
    .put(UsersController.updateUser.bind(UsersController))
    .delete(UsersController.deleteuser.bind(UsersController))
export default app;