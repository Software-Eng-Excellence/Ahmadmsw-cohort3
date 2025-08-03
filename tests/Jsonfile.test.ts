import path from "path";
import {readJsonFile ,writeJsonFile} from "../src/util/JsonParser"
// import {readXmlFile} from "../src/util/XMLParser"
// import {readCsvFile} from "../src/util/parser"
import fs from 'fs';




describe("readJsonFile", () => {

   
    
  const dummyFile = path.resolve(__dirname, "../src/data/dummy.json")
  const emptyFile = path.resolve(__dirname, "../src/data/empty.json")
  path.resolve(dummyFile,"utf-8")
    const newdata = {
   user1 :{
    name : "Ahmad",
    age : 14,
    country : "Lebanon"
   }
  }
  beforeEach(()=>{ 
    fs.writeFileSync(dummyFile,JSON.stringify(newdata));
    fs.writeFileSync(emptyFile, "{}", "utf-8");// initial set for files empty and dummy  
  }
      
)
  it("should correctly parse JSON data", async () => {
    const result = await readJsonFile(dummyFile)//send to the the parser the dummy file that contains newData
    expect(result).toEqual(newdata)
  })

  it("should return an object when JSON is empty", async () => {
    const result = await readJsonFile(emptyFile)
    expect(result).toStrictEqual({})
  })

  it("should write data to JSON file", async () => {
    const newData = { message: "Hello", value: 123 }
    await writeJsonFile(dummyFile, JSON.stringify(newData))
    const result = await readJsonFile(dummyFile)
    expect(result).toStrictEqual(newData)
  })

it("should return error", async ()=>{
  const newData = {name :"ahmad",age:13,};
  await writeJsonFile(dummyFile,JSON.stringify(newData))
  const result = await readJsonFile(dummyFile);
  expect(result).rejects;
})
})



    





    


