import { Router } from "express";

import authRoute from "./auth.route"
import UserRoutes from "./user.routes"
import ordersRoutes from "./order.route"
import {authenticate} from "../middleware/auth.middlware"
import { hasRole } from "../middleware/authorize.middlwate";
import { Role } from "../config/Permessions";




const routes = Router();

routes.get("/", (req, res) => {
  res.json({ message: "Welcome to Book Store API" });

});
routes.use("/orders",authenticate, ordersRoutes);
routes.use("/users",UserRoutes);
routes.use("/auth",authRoute)


export default routes;