"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./util/parser");
const Cake_mapper_1 = require("./mappers/Cake.mapper");
const CSVorder_mapper_1 = require("./mappers/CSVorder.mapper");
const CSVorder_mapper_2 = require("./mappers/CSVorder.mapper");
const CSVorder_mapper_3 = require("./mappers/CSVorder.mapper");
const XMLParser_1 = require("./util/XMLParser");
const Toy_mapper_1 = require("./mappers/Toy.mapper");
// import {readXMLRows} from "./util/XMLParser"
const JsonParser_1 = require("./util/JsonParser");
const Book_mapper_1 = require("./mappers/Book.mapper");
const logger_1 = __importDefault(require("./util/logger"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, parser_1.readCsvFile)("./src/data/cake orders.csv");
        const Cakemapper = new Cake_mapper_1.CSVCakeMapper();
        const orderMapper = new CSVorder_mapper_1.CSVOrderMapper(Cakemapper);
        const orders = data.map(row => orderMapper.map(row));
        logger_1.default.info("list of cakes %o", orders);
    });
}
function main2() {
    return __awaiter(this, void 0, void 0, function* () {
        const toydata = yield (0, XMLParser_1.readXmlFile)("src/data/toy orders.xml");
        const rows = toydata.data.row;
        const toyMapper = new Toy_mapper_1.XMLToyMapper();
        const orderMapper = new CSVorder_mapper_3.XMLOrderMapper(toyMapper);
        const xmlOrders = rows.map(row => orderMapper.map(row));
        logger_1.default.info("XML orders mapped successfully:\n %o", xmlOrders);
    });
}
main2();
function main3() {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = yield (0, JsonParser_1.readJsonFile)("./src/data/book orders.json");
        const bookMapper = new Book_mapper_1.JSONBookMapper();
        const orderMapper = new CSVorder_mapper_2.JSONOrderMapper(bookMapper);
        const rows = jsonData.map(row => orderMapper.map(row));
        console.log(rows);
    });
}
// main3();
//# sourceMappingURL=index.js.map