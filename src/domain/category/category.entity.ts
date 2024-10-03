import { isDeepStrictEqual } from "util";
import { Entity } from "../../shared/domain/entity";
import { ErrorList } from "../../shared/domain/errorList";
import { ValueObject } from "../../shared/domain/value-object";
import { ID } from "../../shared/domain/value-objects/id.vo";
import { CategoryValidator } from "./category.validator";

interface CategoryConstructorProps {
    id?: ID;
    name: string;
    description?: string | null;
    is_active?: boolean;
    createdAt?: Date
}

interface CategoryCreateCommand {
    id?: ID;
    name: string,
    description?: string | null;
    is_active: boolean;
}

export class Category extends Entity <Category>{
    id: ID;
    name: string;
    description?: string | null;
    is_active: boolean;
    createdAt: Date;

    constructor(props: CategoryConstructorProps) {
        super();
        this.id = props.id ?? ID.generate()  ;
        this.name = props.name;
        this.description = props.description ?? null;
        this.is_active = props.is_active ?? true;
        this.createdAt = props.createdAt ?? new Date(); 
    }
    
    get_id(): ValueObject {
        return this.id.getValue();
    }

    static create(props: CategoryCreateCommand) {
        return new Category(props)
    }

    validate(): ErrorList | Category {
        const validator = new CategoryValidator();
        const result = validator.validate(this);
        if (result.isLeft()) return result.value;
        return this;
    }

    changeName(name: string): void {
        this.name = name;
    }

    changeDescription(description: string): void {
        this.description = description;
    }

    activate(): void {
        this.is_active = true;
    }

    deactivate(): void {
        this.is_active = false;
    }

    equals(entity: Category): boolean {
        if(!this.id.equals(entity.id)) return false;
        return isDeepStrictEqual(this, entity);
    }

    toJSON() : Object {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            is_active: this.is_active,
            createdAt: this.createdAt
        }
    }
}