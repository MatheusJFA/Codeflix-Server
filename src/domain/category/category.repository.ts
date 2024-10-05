import { RepositoryInterface } from "../../shared/domain/repository/repository-interface";
import { ID } from "../../shared/domain/value-objects/id.vo";
import { Category } from "./category.entity";

export interface CategoryInterface extends RepositoryInterface<Category, ID> {}