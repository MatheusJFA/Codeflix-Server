import { Entity } from "../domain/entity";
import { ValueObject } from "../domain/value-object";

export class NotFoundError extends Error {
    
    constructor(id: ValueObject, entityClass: new (...args: any[]) => Entity) {
        super(`${entityClass.name} with id ${id} not found`);
        this.name = 'NotFoundError';
    }
}