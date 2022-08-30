import { getRepository, Repository } from "typeorm";
import { User } from "../entities/user";
import { ICreateUserDTO, IUserRepository } from "../../../repositories/IUserRepository";


class UsersRepository implements IUserRepository {
  private repository: Repository<User>;
  
  constructor() {
    this.repository = getRepository(User)
  }
  
  async create({ name, email, password, driver_license, id, avatar }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      id,
      avatar
    })


    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository }