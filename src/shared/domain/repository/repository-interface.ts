import { Entity } from "../entity";
import { ValueObject } from "../value-object";

export interface RepositoryInterface<T extends Entity, EntityID extends ValueObject> {
    insert(entity: T): Promise<T>;
    bulkInsert(entities: T[]): Promise<T[]>;
    update(entity: T): Promise<T>;
    delete(id: EntityID): Promise<void>;
    findAll(): Promise<T[]>;
    findById(id: EntityID): Promise<T | null>;

    getEntity(): new (... args: any[]) => T;
}