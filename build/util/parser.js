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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCsvFile = readCsvFile;
exports.writeCsvFile = writeCsvFile;
const fs_1 = require("fs");
const sync_1 = require("csv-parse/sync");
const csv_stringify_1 = require("csv-stringify");
// Reads a CSV file and returns a Promise of 2D array of strings
function readCsvFile(filePath_1) {
    return __awaiter(this, arguments, void 0, function* (filePath, includedHeader = true) {
        try {
            const fileContent = yield fs_1.promises.readFile(filePath, 'utf8');
            const records = (0, sync_1.parse)(fileContent, {
                trim: true,
                skipEmptyLines: true,
            });
            if (includedHeader) {
                records.shift();
            }
            return Promise.resolve(records); // what this return do ? //
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
}
// Writes a 2D array of strings to a CSV file
// Writes a 2D array of strings to a CSV file
function writeCsvFile(filePath, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const csvContent = (0, csv_stringify_1.stringify)(data);
            yield fs_1.promises.writeFile(filePath, csvContent, 'utf8');
            return Promise.resolve(data); // i can here dont't use this ? 
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
}
//# sourceMappingURL=parser.js.map