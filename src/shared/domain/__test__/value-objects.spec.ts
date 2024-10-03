import { ValueObject } from "../value-object";

class TestValueObject extends ValueObject{
    constructor(readonly value: string) {
        super();
    }
}

class ComplexValueObject extends ValueObject {
    constructor(readonly value: { name: string, age: number }) {
        super();
    }
}

describe('ValueObject', () => {
    test('Should return the value', () => {
        // Arrange
        const value = 'test';
        const valueObject = new TestValueObject(value);

        // Act and Assert
        expect(valueObject.value).toBe(value);
    });

    test('Should return true if the value is the same', () => {
        // Arrange
        const value = 'test';
        const valueObject = new TestValueObject(value);
        const otherValueObject = new TestValueObject(value);
        // Act and Assert
        expect(valueObject.equals(otherValueObject)).toBe(true);
    });

    test('Should return false if the value is different', () => {
        // Arrange
        const value = 'test';
        const valueObject = new TestValueObject(value);
        const otherValueObject = new TestValueObject('other');
        
        // Act and Assert
        expect(valueObject.equals(otherValueObject)).toBe(false);
    });

    test('Should return false if comparing with null object', () => {
        // Arrange
        const value = 'test';
        const valueObject = new TestValueObject(value);

        // Act and Assert
        expect(valueObject.equals(null as any)).toBe(false);
    });

    test('Should return false if comparing with undefined object', () => {
        // Arrange
        const value = 'test';
        const valueObject = new TestValueObject(value);
        
        // Act and Assert
        expect(valueObject.equals(undefined as any)).toBe(false);
    });

    test("Should return the value of the complex value", () => {
        // Arrange
        const value = { name: 'test', age: 20 };
        const valueObject = new ComplexValueObject(value);

        // Act and Assert
        expect(valueObject.getValue().value.age).toBe(20);
        expect(valueObject.getValue().value.name).toBe('test');
    });

    test('Should return true if the complex value is the same', () => {
        // Arrange
        const valueObject = new ComplexValueObject({ name: 'test', age: 20 });
        const otherValueObject = new ComplexValueObject({ name: 'test', age: 20 });

        // Act and Assert
        expect(valueObject.equals(otherValueObject)).toBe(true);
    });

    test('Should return false if at least one value of the complex value is different', () => {
        // Arrange
        const valueObject = new ComplexValueObject({ name: 'test', age: 20 });
        const otherValueObject = new ComplexValueObject({ name: 'other', age: 20 });

        // Act and Assert
        expect(valueObject.equals(otherValueObject)).toBe(false);
    });
});