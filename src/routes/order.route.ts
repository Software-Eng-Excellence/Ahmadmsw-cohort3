import {Router} from "express";
import {OrderController} from "../controller/order.controller";
import { OrderManagementService } from "../services/OrderManagement.service";

const app = Router();
const orderService = new OrderManagementService();
const orderController = new OrderController(orderService);

app.route("/")
    .get(orderController.getAllOrders.bind(orderController))
    .post(orderController.createOrder.bind(orderController));


app.route("/:id")
    .get(orderController.getOrderById.bind(orderController))
    .put(orderController.updateOrder.bind(orderController))
    .delete(orderController.deleteOrder.bind(orderController))
export default app;