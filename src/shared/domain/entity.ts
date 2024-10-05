import { ErrorList } from "./errorList";
import { ValueObject } from "./value-object";

export abstract class Entity {
    abstract toJSON(): Object;
    abstract get_id(): ValueObject;
    abstract equals(entity: any): boolean;
    abstract validate(): ErrorList | any;
}