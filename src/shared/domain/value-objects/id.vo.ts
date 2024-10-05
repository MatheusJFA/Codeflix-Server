import { randomUUID } from "node:crypto";
import { ValueObject } from "../value-object";
import { InvalidIDError } from "../../errors/invalidID.error";

export class ID extends ValueObject {
    readonly id: string
    
    constructor(value?: string) {
        super();
        this.id = value || randomUUID().toString();
    }

    static from(value: string): ID {
        return new ID(value);
    }

    static generate(): ID {
        return new ID(randomUUID().toString());
    }

    static isValid(uuid: string): boolean {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if(!regex.test(uuid)) throw new InvalidIDError();
        return true;
    }
}
