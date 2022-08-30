import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list al avilable cars", async () => {
    
    const car = await carsRepositoryInMemory.create({
      name: "Polo",
      description: "Quebrado Car",
      daily_rate: 100,
      license_plate: "agd0233",
      fine_amount: 100,
      brand: "wolksvagen",
      category_id: "category id"
    })
    
    const cars = await listAvailableCarsUseCase.execute({});
    
    expect(cars).toEqual([car]);
  });

  it("it should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Polo2",
      description: "Quebrado Car",
      daily_rate: 100,
      license_plate: "agm0233",
      fine_amount: 100,
      brand: "Car_brand_test",
      category_id: "category id"
    })
    
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test"
    });

    
    expect(cars).toEqual([car]);
  });

  it("it should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Polo3",
      description: "Quebrado Car",
      daily_rate: 100,
      license_plate: "agn0233",
      fine_amount: 100,
      brand: "Car_brand_test",
      category_id: "category id"
    })
    
    const cars = await listAvailableCarsUseCase.execute({
      name: "Polo3"
    });

    
    expect(cars).toEqual([car]);
  });

  it("it should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Polo3",
      description: "Quebrado Car",
      daily_rate: 100,
      license_plate: "agn0233",
      fine_amount: 100,
      brand: "Car_brand_test",
      category_id: "category_id"
    })
    
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id"
    });

    
    expect(cars).toEqual([car]);
  });
});