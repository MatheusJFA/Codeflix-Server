import { Category } from "../domain/category/category.entity";
import { ErrorList } from "../shared/domain/errorList";
import { ID } from "../shared/domain/value-objects/id.vo";

describe("Category Entity", () => {

    test("Should return the ID as a ValueObject", () => {
        // Act
        const category = Category.create({
            name: "Test Category 1",
            description: "Description 1",
            is_active: true
        });

        // Assert
        expect(category.id).toBeDefined();
        expect(category.get_id()).toStrictEqual(category.id.getValue());
    });
    
    test("Should create a Category using the Factory Method passing all parameters", () => {
        // Arrange
        const expectedName = "Test Category 1";
        const expectedDescription = "Description 1";
        const expectedIsActive = true;
        
        // Act
        const category = Category.create({
            name: "Test Category 1",
            description: "Description 1",
            is_active: true
        });

        // Assert
        expect(category.id).toBeDefined();
        expect(category.id).toBeInstanceOf(ID);
        expect(category).toBeInstanceOf(Category);
        expect(category.id).toBeDefined();
        expect(category.name).toBe(expectedName);
        expect(category.description).toBe(expectedDescription);
        expect(category.is_active).toBe(expectedIsActive);
        expect(category.createdAt).toBeDefined();
    });

    test("Should create a Category using the Factory Method without description", () => {
        // Arrange
        const expectedName = "Test Category 1";
        const expectedIsActive = true;

        // Act
        const category = Category.create({
            name: "Test Category 1",
            is_active: true
        });

        // Assert
        expect(category.id).toBeDefined();
        expect(category.id).toBeInstanceOf(ID);
        expect(category).toBeInstanceOf(Category);
        expect(category.id).toBeDefined();
        expect(category.name).toBe(expectedName);
        expect(category.description).toBe(null);
        expect(category.is_active).toBe(expectedIsActive);
        expect(category.createdAt).toBeDefined();
    });

    test("Should return the category if it is valid", () => {
        // Act
        const category = Category.create({
            name: "Test Category 1",
            description: "Description 1",
            is_active: true
        });

        // Assert
        expect(category.validate()).toBeInstanceOf(Category);
    });

    test("Should return an error if the name is not provided", () => {
        // Act
        const category = Category.create({
            name: "",
            description: "Description 1",
            is_active: true
        });

        const listErrors = ["Category name is required."];

        // Act
        const validation = category.validate();

        // Assert
        expect(validation).toBeInstanceOf(ErrorList);
        expect((validation as ErrorList).getErrors()).toMatchObject(listErrors);
    });

    test("Should return an error if the name is lower than 2 characters", () => {
        // Arrange
        const category = Category.create({
            name: "A",
            description: "Description 1",
            is_active: true
        });

        const listErrors = ["Category name must be at least 3 characters."];
       
        // Act
        const validation = category.validate();
        
        // Assert
        expect(validation).toBeInstanceOf(ErrorList);
        expect((validation as ErrorList).getErrors()).toMatchObject(listErrors);
    });

    test("Should return an error if the name is greater than 255 characters", () => {
        // Arrange
        const category = Category.create({
            name: "A".repeat(256),
            description: "Description 1",
            is_active: true
        });

        const listErrors = ["Category name must be at most 255 characters."];

        // Act
        const validation = category.validate();

        // Assert
        expect(validation).toBeInstanceOf(ErrorList);
        expect((validation as ErrorList).getErrors()).toMatchObject(listErrors);
    });

    test("Should change name", () => {
        // Arrange
        const expectedName = "Test Category 2";

        // Act
        const category = Category.create({
            name: "Test Category 1",
            description: "Description 1",
            is_active: true
        });

        category.changeName("Test Category 2");

        // Assert
        expect(category.name).toBe(expectedName);
    });

    test("Should change description", () => {
        // Arrange
        const expectedDescription = "Description 2";

        // Act
        const category = Category.create({
            name: "Test Category 1",
            description: "Description 1",
            is_active: true
        });

        category.changeDescription("Description 2");

        // Assert
        expect(category.description).toBe(expectedDescription);
    });

    test("Should activate", () => {
        // Arrange
        const expectedIsActive = true;

        //Act
        const category = Category.create({
            name: "Test Category 1",
            description: "Description 1",
            is_active: false
        });

        category.activate();

        // Assert
        expect(category.is_active).toBe(expectedIsActive);
    });

    test("Should deactivate", () => {
        // Arrange
        const expectedIsActive = false;

        // Act
        const category = Category.create({
            name: "Test Category 1",
            description: "Description 1",
            is_active: true
        });

        category.deactivate();

        // Assert
        expect(category.is_active).toBe(false);
    });

    test("Should return if two categories are equal", () => {
        // Arrange
        const category1 = Category.create({
            id: ID.generate(),
            name: "Test Category 1",
            description: "Description 1",
            is_active: true
        });

        const category2 = Category.create({
            id: category1.id,
            name: "Test Category 1",
            description: "Description 1",
            is_active: true
        });

        // Act
        const isEqual = category1.equals(category2);

        // Assert
        expect(isEqual).toBe(true);
    });

    test("Should return if two categories are not equal", () => {
        // Arrange
        const category1 = Category.create({
            name: "Test Category 1",
            description: "Description 1",
            is_active: true
        });

        const category2 = Category.create({
            name: "Test Category 2",
            description: "Description 2",
            is_active: false
        });

        // Act
        const isEqual = category1.equals(category2);

        // Assert
        expect(isEqual).toBe(false);
    });

    test("Should return a JSON", () => {
        // Arrange
        const expectedName = "Test Category 1";
        const expectedDescription = "Description 1";
        const expectedIsActive = true;

        // Act
        const category = Category.create({
            name: "Test Category 1",
            description: "Description 1",
            is_active: true
        });

        // Assert
        expect(category.id).toBeDefined();
        expect(category.toJSON()).toMatchObject({
            name: expectedName,
            description: expectedDescription,
            is_active: expectedIsActive
        });
    });
});