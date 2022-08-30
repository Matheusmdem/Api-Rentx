import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/erros/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ako2755",
      fine_amount: 100,
      brand: "kia",
      category_id: "category"
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Name1 Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ako2755",
      fine_amount: 100,
      brand: "kia",
      category_id: "category"
    });
    
    await expect(createCarUseCase.execute({
        name: "Name2 Car",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ako2755",
        fine_amount: 100,
        brand: "kia",
        category_id: "category"
      })
    ).rejects.toEqual(new AppError("Car already exists!"))
  });
  
  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name2 Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ako2755",
      fine_amount: 100,
      brand: "kia",
      category_id: "category"
    });

    expect(car.available).toBe(true);
  });
});