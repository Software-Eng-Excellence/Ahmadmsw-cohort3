import { Toy,IdentifiableToy } from "../toy.model";

export class ToyBuilder {
    private orderID: string="";
    private type: string = "";
    private ageGroup: string="";
    private brand: string="";
    private material: string="";
    private batteryRequired: string="";
    private educational: string="";



    setType(type: string): ToyBuilder {
        this.type = type;
        return this;
    }
    setOrderID(orderID: string): ToyBuilder {
        this.orderID = orderID;
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
           
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryRequired,
            this.educational
 
        );
    }
}

export class IdentifiableToyBuilder extends ToyBuilder {
    private id: string="";
    private toy !: Toy;
    setId(id: string): IdentifiableToyBuilder {
        this.id = id;
        return this;
    }
    setToy(toy: Toy): IdentifiableToyBuilder {
        this.toy = toy;
        return this;
    }

    build(): IdentifiableToy {
        return new IdentifiableToy(
            this.id,
            this.toy.getType(),
            this.toy.getAgeGroup(),
            this.toy.getBrand(),
            this.toy.getMaterial(),
            this.toy.getBatteryRequired(),
            this.toy.getEducational()
        );
    }
}
