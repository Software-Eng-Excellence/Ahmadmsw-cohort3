import { IMapper } from "./Imapper";
import {Toy,IdentifiableToy} from "../models/toy.model"
import { ToyBuilder ,IdentifiableToyBuilder } from "../models/builder/toy.builder";





export class XMLToyMapper implements IMapper<{ [key: string]: string }, Toy> {
    map(data: { [key: string]: string }): Toy {
        const NewBuild = new ToyBuilder();
        return NewBuild
            
            .setType(data["Type"]??"")
            .setAgeGroup(data["AgeGroup"]??"")
            .setBrand(data["Brand"]??"")
            .setMaterial(data["Material"]??"")
            .setBatteryRequired(data["BatteryRequired"]??"")
            .setEducational(data["Educational"]??"")
            

            .build();
    }
    reverseMap(data: Toy): ({ [key: string]: string; }) {
        return {
            
            "Type": data.getType(),
            "AgeGroup": data.getAgeGroup(),
            "Brand": data.getBrand(),
            "Material": data.getMaterial(),
            "BatteryRequired": data.getBatteryRequired(),
            "Educational": data.getEducational()
        };
}
}

export interface ISQLITEToy {
    id: string,
    type: string,
    age_group: string,
    brand: string,
    material: string,
    battery_required: string,
    educational: string
}
export class SQLITEToyMapper implements IMapper<ISQLITEToy, IdentifiableToy> {
    map(data: ISQLITEToy): IdentifiableToy {
        const build = new IdentifiableToyBuilder();
        const toyBuild = new ToyBuilder();
        return build
        
            .setId(data.id)
            .setToy(
                toyBuild
                .setType(data.type)
                .setAgeGroup(data.age_group)
                .setBrand(data.brand)
                .setMaterial(data.material)
                .setBatteryRequired(data.battery_required)
                .setEducational(data.educational)
                .build())
            .build();
    }
    reverseMap(data: IdentifiableToy): ISQLITEToy {
        return {
            id: data.getId(),
            type: data.getType(),
            age_group: data.getAgeGroup(),
            brand: data.getBrand(),
            material: data.getMaterial(),
            battery_required: data.getBatteryRequired(),
            educational: data.getEducational()
        };
}
}