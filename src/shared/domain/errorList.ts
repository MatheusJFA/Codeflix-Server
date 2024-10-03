export class ErrorList {
    private errors: string[];

    constructor() {
        this.errors = [];
    }

    add(error: string) {
        this.errors.push(error);
    }

    getErrors() {
        return this.errors;
    }

    hasErrors() {
        return this.errors.length > 0;
    }
}