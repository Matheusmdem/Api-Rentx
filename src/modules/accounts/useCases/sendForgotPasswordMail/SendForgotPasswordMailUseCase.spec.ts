import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/erros/AppError";
import { SendForgotPasswordMailUseCase } from "./sendForgotPasswordMailUseCase"


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProvider
    )
  })

  it("should be able to send a forgot password mail to user", async () => {

    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "123456",
      email: "rentx@rentx.com.br",
      name: "Matheus",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.execute("rentx@rentx.com.br")

    expect(sendMail).toHaveBeenCalled();
  });

  it("should be not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("user@rentx.com.br")
    ).rejects.toEqual(new AppError("User does not exists!"))
  })

  it("should be able to create an user token", async () => {
    const tokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "654",
      email: "bla@rentx.com.br",
      name: "Bla",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.execute("bla@rentx.com.br")

    expect(tokenMail).toBeCalled()
  })
})