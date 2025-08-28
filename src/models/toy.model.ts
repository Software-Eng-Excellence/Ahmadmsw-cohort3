import { Item, ItemCategoty } from "../models/item.model";

export class Toy implements Item {
    private orderID: number;
    private type: string;
    private ageGroup: string;
    private brand: string;
    private material: string;
    private batteryRequired: string; // Could be boolean, but kept string to match XML format
    private educational: string;     // Could be boolean, but kept string to match XML format


    constructor(
        orderID: number,
        type: string,
        ageGroup: string,
        brand: string,
        material: string,
        batteryRequired: string,
        educational: string,

    ) {
        this.orderID = orderID;
        this.type = type;
        this.ageGroup = ageGroup;
        this.brand = brand;
        this.material = material;
        this.batteryRequired = batteryRequired;
        this.educational = educational;

    }

    getCategory(): ItemCategoty {
        return ItemCategoty.TOY;
    }

    getOrderID(): number {
        return this.orderID;
    }

    getType(): string {
        return this.type;
    }

    getAgeGroup(): string {
        return this.ageGroup;
    }

    getBrand(): string {
        return this.brand;
    }

    getMaterial(): string {
        return this.material;
    }

    getBatteryRequired(): string {
        return this.batteryRequired;
    }

    getEducational(): string {
        return this.educational;
    }


}
