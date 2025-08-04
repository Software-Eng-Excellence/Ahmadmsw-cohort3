import { error } from 'console';
import { promises as fs } from 'fs';
import { parse as csvParse } from 'csv-parse/sync';
import { stringify as csvStringify } from 'csv-stringify';

// Reads a CSV file and returns a Promise of 2D array of strings
export async function readCsvFile(filePath: string , includedHeader : Boolean = true): Promise<string[][]> {
    try {
    const fileContent = await fs.readFile(filePath, 'utf8');
   
    const records: string[][] = csvParse(fileContent, {
        trim: true,
        skipEmptyLines: true,
    });
    if (includedHeader) {
         records.shift();
    }

    return Promise.resolve(records); // what this return do ? //
    } catch (error) {
        throw new Error("error");
    }
  
}

// Writes a 2D array of strings to a CSV file
// Writes a 2D array of strings to a CSV file
export async function writeCsvFile(filePath: string, data: string[][]): Promise<string[][]> {
    try {
    const csvContent = csvStringify(data); 
    await fs.writeFile(filePath, csvContent, 'utf8');
    return Promise.resolve(data); // i can here dont't use this ? 

} catch (error) {
        return Promise.reject(error); 
}
}// what this writeCsvFile do ? // this function writes a 2D array of strings to a CSV file// iput the data from user in the parameter and writing it in the csv file ? // yes ? // yes