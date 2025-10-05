import {Router} from "express";

import { AuthenticationService } from "../services/Authentication.service";
import {UserSerivce} from "../services/userManagement"
import {AuthenticationController} from "../controller/auth.controller"


const app = Router();


const userService = new UserSerivce();

const AuthService = new AuthenticationService();

const authController = new AuthenticationController(AuthService,userService)
app.route("/login")

    .post(authController.login.bind(authController));

    



export default app;