import logger from "./util/logger"


import { BookRepository } from "./Repositoy/file/Book.model.repository";
import { ToyRepository } from "./Repositoy/file/Toy.model.repository";
import { OrderRepository } from "./Repositoy/file/order.repository";

import config from "./config";

import {open} from "sqlite";
import { Database } from "sqlite3";

async function main3() {
    const db = await open({
        filename: "src/data/orders.db",
        driver: Database
    });
    await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderId TEXT,
        itemCategory TEXT,
        itemDetails TEXT,
        quantity INTEGER,
        price REAL
    )
    `);
    const orders = [
        { orderId: "1", itemCategory: "Book", itemDetails: "The Great Gatsby by F. Scott Fitzgerald, Fiction, Hardcover, English, Scribner, First Edition, Standard", quantity: 2, price: 20.00 },
        { orderId: "2", itemCategory: "Toy", itemDetails: "Action Figure, 5-10, Hasbro, Plastic, Yes, Yes", quantity: 1, price: 15.50 },
        { orderId: "3", itemCategory: "Book", itemDetails: "1984 by George Orwell, Dystopian, Paperback, English, Houghton Mifflin Harcourt, Second Edition, Standard", quantity: 3, price: 12.00 }
    ];
    for (const order of orders) {
        await db.run(
            `INSERT INTO orders (orderId, itemCategory, itemDetails, quantity, price) VALUES (?, ?, ?, ?, ?)`,
            [order.orderId, order.itemCategory, order.itemDetails, order.quantity, order.price]
        );
    }
    const allorders = await db.all(`SELECT * FROM orders`);
    console.log(allorders);
    await db.close();

}
main3();