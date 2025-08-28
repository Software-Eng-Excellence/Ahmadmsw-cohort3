"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc = exports.FinanceCalculator = exports.validateMaxPrice = exports.validateItem = exports.validatePrice = exports.validator = exports.PremiumOrderManagement = exports.Ordermanagement = void 0;
const logger_1 = __importDefault(require("./util/logger")); // i use logger to log the errors and info in the console
class Ordermanagement {
    constructor(validator, calculator) {
        this.validator = validator;
        this.calculator = calculator;
        //get orders and set orders  and add Orders 
        this.orders = []; // i can set an array of the interface order
        //i use this construcor to use DIP
    }
    getOrders() {
        return this.orders;
    }
    //BEFORE DIP : //
    // gettotalRevenue(){
    //   return FinanceCalculator.getRevenue(this.orders);
    // }
    // getttotalPowe(){
    //   return FinanceCalculator.getAveragebyPower(this.orders);
    // }
    // AFTER DIP ://
    gettotalRevenue() {
        return this.calculator.getRevenue(this.orders);
    }
    getttotalPowe() {
        return this.calculator.getAveragebyPower(this.orders);
    }
    //where them both can go to any class that implement this interface 
    //LSP// :
    addorder(item, price) {
        ////////////////////
        // validator.validateItem(item); // here is also have the solid but i need to do that every time i need add
        // validator.validatePrice(price);// it is under the same functionality is add order bcz add order also needs validation
        //////////////
        ////after OCP/////
        //////////////
        try {
            const order = { id: this.orders.length + 1, item, price };
            this.validator.validate(order); // here i applicate the DIP also to switch between classes have same interface and OCP
            this.orders.push(order);
        }
        catch (error) {
            throw new Error("[OrderManagement] Error adding order:");
        }
    }
    getorderByid(id) {
        let o;
        // return this.getOrders().find(order => order.id = id)
        for (o of this.getOrders()) {
            if (o.id === id) {
                return o;
            }
        }
        logger_1.default.warn("Order not found");
        return undefined; // if not found return undefined
    }
}
exports.Ordermanagement = Ordermanagement;
class PremiumOrderManagement extends Ordermanagement {
    getorderByid(id) {
        console.log("Alert here is the order :");
        return super.getorderByid(id);
    }
}
exports.PremiumOrderManagement = PremiumOrderManagement;
//here  i use the OCP where i never touch the valid code when i need set new functionality
//to this class like validator here 
// - where i add maxprice what i do ? 
// - i set the validator and set extensions for every one i need like validatePrice and ValidateItem
// and i add ValidateMaxPrice and all them cotrolled by Validator
class validator {
    constructor(rules) {
        this.rules = rules;
    }
    validate(order) {
        this.rules.forEach(rule => rule.validate(order));
    }
}
exports.validator = validator;
class validatePrice {
    validate(order) {
        if (order.price <= 0) {
            logger_1.default.error("Price must be greater than zero");
            throw new Error("Price must be greater than zero"); // what new error do ? it throw an error with this message ok if i get a throw error from the classes it is return to the sub class to the method validate ? // answer: yes it is return to the sub class to the method validate and i can catch it in the addorder method // but i do not set throw in the validate sub class so how can i catch it in the addorder method ? // answer: i can catch it in the addorder method by using try and catch block // ok // but how in the validate base class returns throw error ? // answer: the throw statement immediately exits the current function and returns the error to the caller
        }
    }
}
exports.validatePrice = validatePrice;
class validateItem {
    validate(order) {
        if (!validateItem.possibleItems.includes(order.item)) {
            throw new Error(`Invalid item. Must be one of: ${validateItem.possibleItems.join(", ")}`);
        }
    }
}
exports.validateItem = validateItem;
// validate order
validateItem.possibleItems = [
    "Sponge",
    "Chocolate",
    "Fruit",
    "Red Velvet",
    "Birthday",
    "Carrot",
    "Marble",
    "Coffee",
];
class validateMaxPrice {
    validate(order) {
        if (order.price > 100) {
            throw new Error(`Invalid price most be less than 100`);
        }
    }
}
exports.validateMaxPrice = validateMaxPrice;
class FinanceCalculator {
    getRevenue(orders) {
        return orders.reduce((total, order) => total + order.price, 0);
    }
    getAveragebyPower(orders) {
        return this.getRevenue(orders) / orders.length;
    }
}
exports.FinanceCalculator = FinanceCalculator;
class Calc {
    getRevenue(orders) {
        return 3;
    }
    getAveragebyPower(orders) {
        return 5.2;
    }
}
exports.Calc = Calc;
//# sourceMappingURL=app.js.map