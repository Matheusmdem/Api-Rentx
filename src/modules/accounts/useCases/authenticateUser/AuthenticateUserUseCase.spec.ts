import { AppError } from "@shared/erros/AppError";
import { expect } from "@jest/globals"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in memory/UserRepositoryInMemory";
import { ICreateUserDTO } from "@modules/accounts/repositories/IUserRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, userTokenRepositoryInMemory, dayjsDateProvider);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "Matheus"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token")
  });

  it("should not be able to authenticate an noneexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
        email: "test@email.com",
        password: "1234"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "Matheus"
    }

    await createUserUseCase.execute(user);
    
    await expect(authenticateUserUseCase.execute({
        email: user.email,
        password: "12345"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })
});