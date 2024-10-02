import { randomUUID } from "node:crypto";
import { ID } from "../shared/domain/value-objects/id.vo";

interface CategoryConstructorProps {
    id?: ID;
    name: string;
    description?: string | null;
    is_active?: boolean;
    createdAt?: Date
}

interface CategoryCreateCommand {
    name: string,
    description?: string | null;
    is_active: boolean;
}

export class Category {
    id: ID;
    name: string;
    description?: string | null;
    is_active: boolean;
    createdAt: Date;

    private constructor(props: CategoryConstructorProps) {
        this.id = props.id ?? ID.generate()  ;
        this.name = props.name;
        this.description = props.description ?? null;
        this.is_active = props.is_active ?? true;
        this.createdAt = props.createdAt ?? new Date(); 
    }

    static create(props: CategoryCreateCommand) {
        return new Category(props)
    }

    changeName(name: string): void {
        this.name = name;
    }

    changeDescription(description: string): void {
        this.description = description;
    }

    activate() {
        this.is_active = true;
    }

    deactivate() {
        this.is_active = false;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            is_active: this.is_active,
            createdAt: this.createdAt
        }
    }
}