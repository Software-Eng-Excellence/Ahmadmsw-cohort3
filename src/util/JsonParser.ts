import { promises as fs } from 'fs';

export async function readJsonFile<T>(filePath: string , includedHeader : boolean = true): Promise<T> {

        try {
    const fileContent = await fs.readFile(filePath, 'utf8');
   
    const data = JSON.parse(fileContent);


    return Promise.resolve(data); // what this return do ? //why here return object when i log it ? // what i need type in the index to show the products 
    } catch (error) {
        throw new Error ("bad structure")
    }
}




export async function writeJsonFile(filePath: string, data: { [key: string]: string }[]): Promise<void> {
    try {
 
    const JsonContent = JSON.stringify(data, null, 2); // pretty print with 2 spaces

    await fs.writeFile(filePath, JsonContent, 'utf8');
   

} catch (error) {
        return Promise.reject(error); 
}
}