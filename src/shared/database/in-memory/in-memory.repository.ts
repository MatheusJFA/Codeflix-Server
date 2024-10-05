import { Entity } from "../../domain/entity";
import { RepositoryInterface } from "../../domain/repository/repository-interface";
import { ValueObject } from "../../domain/value-object";
import { NotFoundError } from "../../errors/notFound.error";

export abstract class InMemoryRepository<E extends Entity, EntityID extends ValueObject> implements RepositoryInterface<E, EntityID> {
    private entities: E[] = [];

    async insert(entity: E): Promise<E> {
        this.entities.push(entity);
        return Promise.resolve(entity);
    }

    async bulkInsert(entities: E[]): Promise<E[]> {
        this.entities.push(...entities);
        return Promise.resolve(entities);
    }
    
    async update(entity: E): Promise<E> {
        const index = this.entities.findIndex((e) => e.get_id().equals(entity.get_id()));
        if (index === -1) throw new NotFoundError(entity.get_id(), this.getEntity());
        this.entities[index] = entity;
        return Promise.resolve(entity);
    }
    
    async delete(id: EntityID): Promise<void> {
        const index = this.entities.findIndex((e) => e.get_id().equals(id));
        if (index === -1) throw new NotFoundError(id, this.getEntity());
        this.entities.splice(index, 1);
    }
    
    async findAll(): Promise<E[]> {
        return Promise.resolve(this.entities);
    }
    
    async findById(id: EntityID): Promise<E | null> {
        const item = this.entities.find((e) => e.get_id().equals(id));
        return Promise.resolve(item || null);
    }
    
    abstract getEntity(): new (...args: any[]) => E;
}