import { Rental } from "../infra/typeorm/entities/Rental";

interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  expect_return_date: Date;
  id?: string;
  end_date?: Date;
  total?: number;
}

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository, ICreateRentalDTO }