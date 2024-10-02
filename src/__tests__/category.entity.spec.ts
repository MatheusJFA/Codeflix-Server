import { Category } from "../domain/category.entity";
import { ID } from "../shared/domain/value-objects/id.vo";

describe("Category Entity", () => {
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
    });

    test("Should return an error if the name is not provided", () => {
        // Assert
        expect(() => {
            // Act
            Category.create({
                name: "",
                description: "Description 1",
                is_active: true
            });
        }).toThrow("Name is required");
    });

    test("Should return an error if the name is lower than 2 characters", () => {
        // Assert
        expect(() => {
            // Act
            Category.create({
                name: "A",
                description: "Description 1",
                is_active: true
            });
        }
        ).toThrow("Name must be at least 2 characters");
    });

    test("Should return an error if the name is greater than 255 characters", () => {
        // Assert
        expect(() => {
            // Act
            Category.create({
                name: "A".repeat(256),
                description: "Description 1",
                is_active: true
            });
        }).toThrow("Name must be at most 255 characters");
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