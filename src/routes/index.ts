import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({ message: "Welcome to Book Store API" });

});

export default routes;