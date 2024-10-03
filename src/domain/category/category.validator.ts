import { Either, left, right } from "../../shared/domain/either";
import { ErrorList } from "../../shared/domain/errorList";
import { Validator } from "../../shared/domain/validator";
import { Category } from "./category.entity";

export class CategoryValidator implements Validator<Category> {
    validate(category: Category): Either<ErrorList, Category> {
        const errorList = new ErrorList();
        const minimumNameLength = 3;
        const maximumNameLength = 255;

        if (!category.name) {
            errorList.add("Category name is required.");
        }

        if (category.name && category.name.length < minimumNameLength) {
            errorList.add(`Category name must be at least ${minimumNameLength} characters.`);
        }

        if (category.name && category.name.length > maximumNameLength) {
            errorList.add(`Category name must be at most ${maximumNameLength} characters.`);
        }

        if (errorList.hasErrors()) {
            return left(errorList);
        }

        return right(category)
    }
}