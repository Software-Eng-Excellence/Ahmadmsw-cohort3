import { Router } from "express";

import UserRoutes from "./user.routes"

const routes = Router();

routes.get("/", (req, res) => {
  res.json({ message: "Welcome to Book Store API" });

});
routes.use("/orders", UserRoutes);
routes.use("/users",UserRoutes)

export default routes;