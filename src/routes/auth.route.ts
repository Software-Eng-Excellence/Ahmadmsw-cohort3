import {Router} from "express";

import { AuthenticationService } from "../services/Authentication.service";
import {UserSerivce} from "../services/userManagement"
import {AuthenticationController} from "../controller/auth.controller"
import {authenticate} from "../middleware/auth.middlware"


const app = Router();


const userService = new UserSerivce();

const AuthService = new AuthenticationService();

const authController = new AuthenticationController(AuthService,userService)
app.route("/login")

    .post(authController.login.bind(authController));

app.route("/logout")
    .post(authenticate, authController.logout.bind(authController));



export default app;