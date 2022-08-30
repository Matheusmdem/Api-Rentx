import { expect } from '@jest/globals'
import { InMemoryCategoriesRepository } from "@modules/cars/repositories/in-memory/InMemoryCategoriesRepository";
import { AppError } from "@shared/erros/AppError";
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository

describe("Create Category", () => {

  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(inMemoryCategoriesRepository)
  })

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test"
    }
    
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    
    const categoryCreated = await inMemoryCategoriesRepository.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
  })
 
  it("should not be able to create a new category with name already exists", async () => {

    const category = {
      name: "Category Test",
      description: "Category description Test"
    }
    
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    await expect(createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })
    ).rejects.toEqual(new AppError("Category already exists!"))
  })
})