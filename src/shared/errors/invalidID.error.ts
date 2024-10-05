export class InvalidIDError extends Error {
    constructor() {
        super("The provided ID is invalid");
    }
}
