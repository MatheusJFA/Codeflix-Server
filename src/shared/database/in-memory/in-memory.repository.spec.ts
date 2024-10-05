import { Entity } from "../../domain/entity";
import { ID } from "../../domain/value-objects/id.vo";
import { InMemoryRepository } from "./in-memory.repository";

class Stub extends Entity {
    private _id: ID;
    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
        super();
        this._id = ID.generate();
        this._name = name;
        this._age = age;
    }

    set_name(name: string) {
        this._name = name;
    }

    get_id(): ID {
        return this._id;
    }

    toJSON(): Object {
        return {
            id: this._id,
            name: this._name,
            age: this._age
        }
    }

    equals(entity: any): boolean {
        if(entity === null || entity === undefined) return false;
        if(this.constructor.name !== entity.constructor.name) return false;
        return this._id.equals(entity.get_id());
    }

    validate() {
        if(this._name.length < 3) throw new Error('Name must have at least 3 characters');
        if(this._age < 18) throw new Error('Age must be at least 18 years old');
    }

}

class StubInMemoryRepository extends InMemoryRepository<Stub, ID> {
    constructor() {
        super();
    }

    getEntity(): new (...args: any[]) => Stub {
        return Stub;
    }
}

describe('InMemoryRepository', () => {
    let repository: StubInMemoryRepository;
    beforeEach(() => {
        repository = new StubInMemoryRepository();
    });

    test('should insert an entity', async () => {
        // Arrange
        const entity = new Stub('John Doe', 25);

        // Act
        const result = await repository.insert(entity);

        // Assert
        expect(result).toEqual(entity);
        expect(repository['entities']).toContain(entity);
        expect(repository['entities']).toHaveLength(1);
    });

    test('should insert multiple entities', async () => {
        // Arrange
        const list = [
            new Stub('John Doe', 25),
            new Stub('Jane Doe', 23)
        ];

        // Act
        await repository.bulkInsert(list);

        // Assert
        expect(repository['entities']).toContain(list[0]);
        expect(repository['entities']).toContain(list[1]);
        expect(repository['entities']).toHaveLength(2);
    })

    test('should find an entity by id', async () => {
        // Arrange
        const entity = new Stub('John Doe', 25);
        await repository.insert(entity);

        // Act
        const result = await repository.findById(entity.get_id());

        // Assert
        expect(result).toEqual(entity);
    });

    test('should return null if the entity is not found', async () => {
        // Arrange
        const id = ID.generate();

        // Act
        const result = await repository.findById(id);

        // Assert
        expect(result).toBeNull();
    });

    test('should find all entities', async () => {
        // Arrange
        const entity1 = new Stub('John Doe', 25);
        const entity2 = new Stub('Jane Doe', 23);
        await repository.insert(entity1);
        await repository.insert(entity2);

        // Act
        const result = await repository.findAll();

        // Assert
        expect(result).toContain(entity1);
        expect(result).toContain(entity2);
        expect(result).toHaveLength(2);
    });

    test('should update an entity', async () => {
        // Arrange
        const entity = new Stub('John Doe', 25);
        await repository.insert(entity);

        // Act
        entity.set_name('Jane Doe');
        const result = await repository.update(entity);

        // Assert
        expect(result).toEqual(entity);
        expect(repository['entities']).toContain(entity);
        expect(repository['entities']).toHaveLength(1);
    });

    test('should throw an error if the entity is not found', async () => {
        // Arrange
        const entity = new Stub('John Doe', 25);

        // Act and Assert
        await expect(repository.update(entity)).rejects.toThrow();
    });

    test('should delete an entity', async () => {
        // Arrange
        const entity = new Stub('John Doe', 25);
        await repository.insert(entity);

        // Act
        await repository.delete(entity.get_id());

        // Assert
        expect(repository['entities']).not.toContain(entity);
        expect(repository['entities']).toHaveLength(0);
    });

    test('Should throw a error if the entity is not found', async () => {
        // Arrange
        const id = ID.generate();

        // Act and Assert
        await expect(repository.delete(id)).rejects.toThrow();
    });


});