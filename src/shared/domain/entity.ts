import { ErrorList } from "./errorList";
import { ValueObject } from "./value-object";
import { Either } from "./either";

export abstract class Entity<T> {
    abstract toJSON(): Object;
    abstract get_id(): ValueObject;
    abstract equals(entity: T): boolean;
    abstract validate(): ErrorList | T;
}