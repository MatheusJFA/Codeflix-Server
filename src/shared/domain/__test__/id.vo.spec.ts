import { InvalidIDError } from "../../errors/invalidID.error";
import { ID } from "../value-objects/id.vo";

describe("ID", () => {
  const validateSpy = jest.spyOn(ID, "isValid");

  test("Should generate a valid UUID", () => {
    // Act
    const uuid = ID.generate();

    // Assert
    expect(ID.isValid(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalled();

    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("Should generate a valid UUID when a empty string is provided", () => {
    // Act
    const uuid = new ID("");

    // Assert
    expect(uuid.id).toBeDefined();
    expect(uuid.id).toBeTruthy();
  });

  test("Should generate a valid UUID when a null value is provided", () => {
    // Act
    const uuid = new ID();

    // Assert
    expect(uuid.id).toBeDefined();
    expect(uuid.id).toBeTruthy();
  });

  test("Should generate a valid UUID when a value is provided", () => {
    // Act
    const uuid = "d1b8a0e9-0b1e-4d7b-8f7b-7c1f2f7d1b4d";

    // Assert
    expect(ID.isValid(uuid)).toBe(true);
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("Should return a ID instance when the method 'from' it's called", () => {
    // Act
    const uuid = ID.from("d1b8a0e9-0b1e-4d7b-8f7b-7c1f2f7d1b4d");
    const validate = ID.isValid(uuid.id);
    // Assert
    expect(uuid).toBeInstanceOf(ID);
    expect(uuid.id).toBeDefined();
    expect(validate).toBe(true);
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("Should validate a valid UUID", () => {
    // Act
    const uuid = ID.generate();

    // Assert
    expect(ID.isValid(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalled();

    // First call is from the generate method and second is from the isValid method
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("Should not validate an invalid UUID", () => {
    //Act
    const uuid = "invalid-uuid";

    // Assert
    expect(() => ID.isValid(uuid)).toThrow(new InvalidIDError());
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
