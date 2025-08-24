import { IMapper } from "./Imapper";
import {Toy} from "../models/toy.model"
import { ToyBuilder } from "../models/builder/toy.builder";





export class XMLToyMapper implements IMapper<{ [key: string]: string }, Toy> {
    map(data: { [key: string]: string }): Toy {
        const NewBuild = new ToyBuilder();
        return NewBuild
            .setOrderID(parseInt(data["OrderID"]))
            .setType(data["Type"]??"")
            .setAgeGroup(data["AgeGroup"]??"")
            .setBrand(data["Brand"])
            .setMaterial(data["Material"])
            .setBatteryRequired(data["BatteryRequired"])
            .setEducational(data["Educational"])

            .build();
    }
}

