import logger from "./util/logger"; // i use logger to log the errors and info in the console
//WE SET SOLID PRINCIPLES 

//S : Single  Responsibility Principles  : SRP : every class have one work 
//O : Open Closed Princple : OCP : every change i dont't do in the worked class i do extesion of the base class
//Liskov Substitutuion  princple : LSP ; create sub class that do same promise work but i can do some modifications
// D : dependency inversion principle : DIP : i injected via constructor where the user can use many calsses implements same interface


// interface order i use it as global in many classes so i set it as global like here 
// here just identifier of order i can't give it a values 
export interface order {
    id : number ;
    price:number;
    item : string ;
} 
  
export class Ordermanagement {
  
    //get orders and set orders  and add Orders 
    private orders:order[] = [] ; // i can set an array of the interface order
    constructor(private validator :Ivalidate ,private calculator : Icalculator){
        //i use this construcor to use DIP
    }
    getOrders(){
        return this.orders ;
    }
    //BEFORE DIP : //
    // gettotalRevenue(){
    //   return FinanceCalculator.getRevenue(this.orders);
    // }
    // getttotalPowe(){
    //   return FinanceCalculator.getAveragebyPower(this.orders);
    // }
    // AFTER DIP ://
        gettotalRevenue(){
      return this.calculator.getRevenue(this.orders);
    }
    getttotalPowe(){
      return this.calculator.getAveragebyPower(this.orders);
    }
    //where them both can go to any class that implement this interface 

    //LSP// :

    addorder(item:string , price:number){
      ////////////////////
        // validator.validateItem(item); // here is also have the solid but i need to do that every time i need add
        // validator.validatePrice(price);// it is under the same functionality is add order bcz add order also needs validation
        //////////////
        ////after OCP/////
        //////////////
        try {
        const order:order ={id: this.orders.length+1 , item , price};
        
        this.validator.validate(order); // here i applicate the DIP also to switch between classes have same interface and OCP

        this.orders.push(order)
    } catch(error){
      throw new Error("[OrderManagement] Error adding order:");
    }
    }

    getorderByid(id:number){
      let o :order;
        // return this.getOrders().find(order => order.id = id)
        for(o of this.getOrders()){
          if(o.id === id){
            return o;
          }
        }
        
          logger.warn("Order not found");
        return undefined; // if not found return undefined
    }

}
export class PremiumOrderManagement extends Ordermanagement {
      getorderByid(id: number): order | undefined {//here is the modifcation but same idea LSP
        console.log("Alert here is the order :");
        return super.getorderByid(id);
      }
    }
export interface  Ivalidate {
   validate(order :order):void 
}

//here  i use the OCP where i never touch the valid code when i need set new functionality
//to this class like validator here 
// - where i add maxprice what i do ? 
// - i set the validator and set extensions for every one i need like validatePrice and ValidateItem
// and i add ValidateMaxPrice and all them cotrolled by Validator
export class validator implements Ivalidate {
  private rules: Ivalidate[];

  constructor(rules: Ivalidate[]) {
    this.rules = rules;
  }

  validate(order: order): void {
    this.rules.forEach(rule => rule.validate(order));
  }
}



 export class validatePrice implements Ivalidate { // i remove export bcz the validator will control it's extensions
   validate(order :order): void {
        if ( order.price <= 0) {
          logger.error("Price must be greater than zero");
   throw new Error("Price must be greater than zero"); // what new error do ? it throw an error with this message ok if i get a throw error from the classes it is return to the sub class to the method validate ? // answer: yes it is return to the sub class to the method validate and i can catch it in the addorder method // but i do not set throw in the validate sub class so how can i catch it in the addorder method ? // answer: i can catch it in the addorder method by using try and catch block // ok // but how in the validate base class returns throw error ? // answer: the throw statement immediately exits the current function and returns the error to the caller
}
  }
}
 export class validateItem implements Ivalidate {
      // validate order
    private static possibleItems = [ // i've changed from const bcz const is statement
  "Sponge",
  "Chocolate",
  "Fruit",
  "Red Velvet",
  "Birthday",
  "Carrot",
  "Marble",
  "Coffee",
];
  
  validate(order :order): void {
if (!validateItem.possibleItems.includes(order.item)) {
  throw new Error(`Invalid item. Must be one of: ${validateItem.possibleItems.join(", ")}`);
}
  }
}
export class validateMaxPrice implements Ivalidate {
  validate(order: order): void {
    if(order.price > 100){
        throw new Error(`Invalid price most be less than 100`);
     }
    }
  }

export interface Icalculator {
  getRevenue(orders:order[]) : number;
  getAveragebyPower(orders:order[]): number ;
}
export class FinanceCalculator implements Icalculator {
  public  getRevenue(orders:order[]) : number {
     return orders.reduce((total, order) => total + order.price, 0);
  }
  public  getAveragebyPower(orders:order[]) : number{
    return this.getRevenue(orders)/orders.length ;
  }
}
 export class Calc implements Icalculator {
  getRevenue(orders: order[]): number {
    return 3;
  }
  getAveragebyPower(orders: order[]): number {
    return 5.2 ;
  }
}