import { Toy } from "../toy.model";

export class ToyBuilder {
    private orderID: number = 1;
    private type: string = "";
    private ageGroup: string="";
    private brand: string="";
    private material: string="";
    private batteryRequired: string="";
    private educational: string="";
    private price: number=0;
    private quantity: number=0;

    setOrderID(orderID: number): ToyBuilder {
        this.orderID = orderID;
        return this;
    }

    setType(type: string): ToyBuilder {
        this.type = type;
        return this;
    }

    setAgeGroup(ageGroup: string): ToyBuilder {
        this.ageGroup = ageGroup;
        return this;
    }

    setBrand(brand: string): ToyBuilder {
        this.brand = brand;
        return this;
    }

    setMaterial(material: string): ToyBuilder {
        this.material = material;
        return this;
    }

    setBatteryRequired(batteryRequired: string): ToyBuilder {
        this.batteryRequired = batteryRequired;
        return this;
    }

    setEducational(educational: string): ToyBuilder {
        this.educational = educational;
        return this;
    }



    build(): Toy {
       
        return new Toy(
            this.orderID,
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryRequired,
            this.educational,

        );
    }
}
