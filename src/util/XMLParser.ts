import { parseStringPromise } from 'xml2js';

import { promises as fs } from 'fs';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

export async function readXmlFile<T>(filePath: string):Promise<T> {
    try {
        
        const fileContent = await fs.readFile(filePath, 'utf8');
        const parser = new XMLParser({ignoreAttributes : false , attributeNamePrefix: ''});
        const parsedXml  = parser.parse(fileContent);
        return Promise.resolve(parsedXml as T);
    } catch (error) {
        throw new Error('Failed to read or parse XML file: ' + error);
    }
}


export async function writeXmlFile<T>(filePath: string, data: T): Promise<void> {
    try {
        const builder = new XMLBuilder({ignoreAttributes : false , attributeNamePrefix: ''});
        const xmlContent = builder.build(data);
        await fs.writeFile(filePath, xmlContent, 'utf8');
    } catch (error) {
        throw new Error('Failed to write XML file: ' + error);
    }
}