import { readXmlFile, writeXMLFile } from "../src/util/XMLParser"
import * as fs from "fs"
import * as path from "path"

describe("XML Parser", () => {
  const dummyFile = path.resolve(__dirname, "../src/data/dummy.xml")
  const emptyFile = path.resolve(__dirname, "../src/data/empty.xml")

  const sampleObject = {
    users: {
      user: [
        { name: "Hadi", age: 30 },
        { name: "Sami", age: 25 },
        { name: "Ali", age: 22 }
      ]
    }
  }

  const emptyXMLContent = `<root></root>`

  beforeEach(async () => {
    await writeXMLFile(dummyFile, sampleObject)
    fs.writeFileSync(emptyFile, emptyXMLContent, "utf-8")
  })

  afterEach(() => {
  try {
    fs.unlinkSync(dummyFile)
  } catch {
  // ignore error
  }

  try {
    fs.unlinkSync(emptyFile)
  } catch {
  // ignore error
  }
  })

  it("should correctly parse XML data", async () => {
    const result = await readXmlFile(dummyFile)
    expect(result).toEqual(sampleObject)
  })

  it("should return empty object when XML is empty", async () => {
    const result = await readXmlFile(emptyFile)
    expect(result).toEqual({ root: '' })
  })

  it("should write data to XML file", async () => {
    const newData =  { text: "Hello", value: 123 } 
    await writeXMLFile(dummyFile, newData)
    const result = await readXmlFile(dummyFile)
    expect(result).toEqual(newData)
  })




})