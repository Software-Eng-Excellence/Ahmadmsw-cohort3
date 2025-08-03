// import { Ordermanagement, validator, FinanceCalculator, Calc, validateItem, validateMaxPrice, validatePrice, Icalculator, order,Ivalidate } from "../src/app"

// // here i do Unit Test Unit test in test for small Pieases of code like test one method one function isolated


// //here for class Order Management i do every function inside this class isolated to others
// describe("OrderManagement", () => {
 
//     let validateP : Ivalidate;
//     let orderManage: Ordermanagement;
//     let vav: Ivalidate;
//     let calculator: Icalculator;
//     let rules : Ivalidate[]; // i use rules here to set the array of rules in the beforeAll and use it in all tests;
//      let basevalidator:(order: order) => void; // reset validator after mock
//     // i use let to declare the variables here so i can use them in all tests


//     //declare the variables here to use them in all tests
//     beforeAll(() => {
//              rules = [ // here the validator controls it's class extensions
//       new validateItem ,
//       new validatePrice,
//       new validateMaxPrice ] 
//       vav = new validator(rules);
//         validateP = new validatePrice();
        
        
//         calculator = new FinanceCalculator();
//         console.log("befoore all")



//     });


//     beforeEach(() => {
//          basevalidator = vav.validate; // Store the original validate method
//         //  vav.validate = jest.fn(); // Mock the validate method to set what i need set
//         orderManage = new Ordermanagement(vav, calculator);
     
        
//         console.log("before Each");

//     });
//     afterEach(() => {
//         //  vav.validate = basevalidator; // Reset the validate method after each test
//          vav = new validator(rules); // Reset the validator instance to avoid state carryover
//     });
//     it('should add an order', () => {
//         //Arrange
         


//         const item = "Sponge";
//         const price = 24;
//         //get an order
//         //Act
//          orderManage.addorder(item, price)

//         //Assert
//          expect(orderManage.getOrders()).toEqual([{ id: 1, item: item, price: price }]);
//         // expect(orderManage.addorder(item, price)).toThrow("[OrderManagement] Error adding order:");
//         //here i begin from id =1 bcz i test only app.ts index.ts does not run so orders[] is empty now and begin from id =1 
//     })



//     it('get spesific order', () => {
//         //Arrange



//         const item = "Sponge";
//         const price = 80;
//         orderManage.addorder(item, price)


//         //Act
//         orderManage.getorderByid(1)
//         //Assert
//         expect(orderManage.getorderByid(1)).toEqual({ id: 1, item: item, price: price })
//     })


//     //SPY :
//     it('should get total revenue', () => {// USE SPY HERE : 
//         //Arrange
//         const item1 = "Sponge";
//         const price1 = 15;
 
//         orderManage.addorder(item1, price1);
//         const spy = jest.spyOn(calculator, 'getRevenue');// Spy on the getRevenue method of the calculator
       
//         //Act
//          orderManage.gettotalRevenue();// Call the method to trigger the spy

//         //Assert
//         expect(spy).toHaveBeenCalled();// Check if the getRevenue method was called
//         expect(spy).toHaveBeenCalledWith([{id: 1, item: item1, price: price1}]); // Check if it was called with the correct argument
//         expect(spy).toHaveReturnedWith(15); // Check if it returned the expected value

//         //so spy is used to check if the method is called and with what arguments and what it returns
//         // in spy u can only talk from orderManagement class not from validator class so functions of  price validator can't be tested here

//         // i can only test the validate method in validator class by mocking it in the beforeEach block

//         //QESTION COPILOT :
//         // hey copilot asnwer me can i use price validator here in spy?
//         // No, you cannot directly spy on the price validator from the order management tests.

//         //i only test validate in validator class ?
//         // Yes, you can test the validate method in the validator class by mocking it in the beforeEach block.
//         /////////////////////////////////////////////////
//     });

//     it('should throw addition exception', () => {
//          vav.validate = jest.fn(); 
//         //Arrange
//         const item = "Sponge";
//         const price = 10; 
//         (vav.validate as jest.Mock).mockImplementation(() => {
//             throw new Error("Validation failed");
//         });
        
//        //U CAN ONLY TALK FROM ORDERMANAGEMENT CLASS NOT FROM VALIDATOR CLASS SO FUNCTIONS OF  PRICE VALIDATOR ICAN'T TESTED HERE

//         // ACT Assert
//         expect(() => orderManage.addorder(item, price)).toThrow("[OrderManagement] Error adding order:");// here what i do ? // tell me what i do here // i need to check if the error is thrown// that mean i in the except i need get this output ? 
//     });
// })


// describe("FinaniceCalculator", () => {
//     // i need set the methods only of Financial OR i LOSE THE BENEFITS ON UNIT TEST

//     let calculator : Icalculator ; 
//     let order : order[] ; // i use order here to set the array of orders in the beforeAll and use it in all tests;
//     //i use let to declare i can't use const bcz i don't need to set values here
//     // i need to set : order[] because i use in the getRevenue and getAveragebyPower methods the order array so i need to import the interface order
//     beforeAll(()=> {
//               calculator = new FinanceCalculator;
//          order = [
//             { id: 1, item: "Sponge", price: 15 },
//             { id: 2, item: "Chocolate", price: 20 },
//             { id: 3, item: "Fruit", price: 30 }

//         ] // don't set const before order and calculator bcz i declare them 

//     })
//     it("should get Revenue", () => {  
//         //Arrange

//         // i set the order array in the beforeAll so i can use it in all tests

//         //Act
//         calculator.getRevenue(order);
//         //Assert
//         expect(calculator.getRevenue(order)).toEqual(65);
//     })
//     it("should get Revenue By power", () => {  // SO I SET THE ARRAY OF ORDERS HERE
//         //Arrange

//         //Act
//         calculator.getAveragebyPower(order);
//         //Assert
//         expect(calculator.getAveragebyPower(order)).toEqual(21.666666666666668);
//     })
// })