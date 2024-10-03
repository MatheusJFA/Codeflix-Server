/**
 * Either type represents a value of one of two possible types (a disjoint union).
 * Represents the "left" side of the Either type, typically used for the error case.
 * If it is an instance of Left, it contains a value of type L.
 * If it is an instance of Right, it contains a value of type R.
 */
export type Either<L,R> = Left<L,R> | Right<L,R>;

// The Left class represents the error case of an Either type, containing a value of type L.
export class Left<L,R> {
    constructor(public readonly value: L) {}

    isLeft(): this is Left<L,R> {
        return true;
    }

    isRight(): this is Right<L,R> {
        return false;
    }
}
// The Right class represents the successful case of an Either type, containing a value of type R.
export class Right<L,R> {
    constructor(public readonly value: R) {}

    isRight(): this is Right<L,R> {
        return true;
    }

    isLeft(): this is Left<L,R> {
        return false;
    }
}

// Creates an instance of Left, representing an error value of type L.
export const left = <L,R>(l: L): Either<L,R> => {
    return new Left(l);
}

// Creates an instance of Right, representing a successful value of type R.
export const right = <L,R>(r: R): Either<L,R> => {
    return new Right(r);
}