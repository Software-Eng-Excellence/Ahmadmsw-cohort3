import { readCsvFile, writeCsvFile } from "../src/util/parser"
import * as fs from "fs"
import * as path from "path"

describe("Csv Parser", () => {
  const dummyFile = path.resolve(__dirname, "../src/data/dummy.csv")
  const emptyFile = path.resolve(__dirname, "../src/data/empty.csv")


  const initialData: string[][] = [
    ["Name", "Age", "City", "Gender"],
    ["Hadi", "30", "South", "Male"],
    ["Sami", "25", "Beirut", "Male"],
    ["Ali", "28", "North", "Male"]
  ]

  beforeEach(() => {
    fs.writeFileSync(dummyFile, initialData.map(row => row.join(",")).join("\n"), "utf-8")
    fs.writeFileSync(emptyFile, "", "utf-8")
  })

  afterEach(() => {
  try {
    fs.unlinkSync(dummyFile)
  } catch {

  }

  try {
    fs.unlinkSync(emptyFile)
  } catch {

  }
  })

  it("should correctly parse CSV data (excluding header)", async () => {
    const result = await readCsvFile(dummyFile)
    expect(result).toEqual(initialData.slice(1))
  })

  it("should include the header if includeHeader = false", async () => {
    const result = await readCsvFile(dummyFile, false)
    expect(result[0]).toEqual(initialData[0])
    expect(result.length).toBe(initialData.length)
  })

  it("should return empty array for an empty CSV file", async () => {
    const result = await readCsvFile(emptyFile)
    expect(result).toEqual([])
  })

  it("should write data to a CSV file", async () => {
     const newData =   [
      ["Name", "Age", "City", "Gender"],
      ["Hadi", "30", "South", "Male"],
      ["Sami", "25", "Beirut", "Male"]
    ]
    await writeCsvFile(dummyFile,newData);
    const result = await readCsvFile(dummyFile);
    expect(result).toEqual(newData.slice(1));
  })

 

})