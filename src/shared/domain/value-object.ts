import { isDeepStrictEqual } from "node:util";

export abstract class ValueObject {
    getValue() {
        return Object.assign({}, this);
    }

    equals(valueObject: ValueObject): boolean {
        if(valueObject === null || valueObject === undefined) return false;

        if(this.constructor.name !== valueObject.constructor.name) return false;

        return isDeepStrictEqual(this, valueObject);
    }
}

