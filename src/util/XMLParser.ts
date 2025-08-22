import { parseStringPromise } from 'xml2js';

import { promises as fs } from 'fs';
import { XMLParser } from 'fast-xml-parser';

export async function readXmlFile<T>(filePath: string):Promise<T> {
    try {
        
        const fileContent = await fs.readFile(filePath, 'utf8');
        const parser = new XMLParser({ignoreAttributes : false , attributeNamePrefix: ''});
        const parsedXml  = parser.parse(fileContent);
        return parsedXml;
    } catch (error) {
        throw new Error('Failed to read or parse XML file: ' + error);
    }
}


// export async function readXMLRows(filePath: string): Promise<string[]> {
//   const xml = await fs.readFile(filePath, "utf8");
//   const parsed = await parseStringPromise(xml, { explicitArray: true, trim: true });
//   // Expecting <data><row>...</row></data>
//   return parsed?.data?.row ?? [];
// }