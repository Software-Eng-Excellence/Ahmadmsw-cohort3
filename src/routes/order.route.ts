import {Router} from "express";
import {OrderController} from "../controller/order.controller";
import { OrderManagementService } from "../services/OrderManagement.service";
import {hasPermession} from "../middleware/authorize.middlwate"
import { Permession } from "../config/Permessions";

const app = Router();
const orderService = new OrderManagementService();
const orderController = new OrderController(orderService);

app.route("/")
    .get(hasPermession(Permession.ORDER_READ),orderController.getAllOrders.bind(orderController))
    .post(hasPermession(Permession.ORDER_CREATE),orderController.createOrder.bind(orderController));


app.route("/:id")
    .get(hasPermession(Permession.ORDER_READ),orderController.getOrderById.bind(orderController))
    .put(hasPermession(Permession.ORDER_UPDATE),orderController.updateOrder.bind(orderController))
    .delete(hasPermession(Permession.ORDER_DELETE),orderController.deleteOrder.bind(orderController))
export default app;