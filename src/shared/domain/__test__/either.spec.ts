import { right, left } from "../either";

describe("Either", () => {
    test("Should create a Right instance", () => {
        // Act
        const righty = right("Right value");

        // Assert
        expect(righty.isRight()).toBeTruthy();
        expect(righty.isLeft()).toBeFalsy();
        expect(righty.value).toBe("Right value");
    })

    test("Should create a Left instance", () => {
        // Act
        const lefty = left("Left value");

        // Assert
        expect(lefty.isRight()).toBeFalsy();
        expect(lefty.isLeft()).toBeTruthy();
        expect(lefty.value).toBe("Left value");
    });

});