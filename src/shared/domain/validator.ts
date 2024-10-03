import { Either } from "./either";
import { ErrorList } from "./errorList";

export interface Validator<T> {
    validate(obj: T): Either<ErrorList, T>;
}