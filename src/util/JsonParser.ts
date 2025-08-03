import { promises as fs } from 'fs';

export async function readJsonFile(filePath: string , includedHeader : boolean = true) {

        try {
    const fileContent = await fs.readFile(filePath, 'utf8');
   
    const data = JSON.parse(fileContent);


    return Promise.resolve(data); // what this return do ? //why here return object when i log it ? // what i need type in the index to show the products 
    } catch (error) {
        throw new Error ("bad structure")
    }
}




export async function writeJsonFile(filePath: string, data: string): Promise<string> {
    try {
    const csvContent = JSON.stringify(data);
    await fs.writeFile(filePath, data, 'utf8');
    return Promise.resolve(data); // i can here dont't use this ? 

} catch (error) {
        return Promise.reject(error); 
}
}