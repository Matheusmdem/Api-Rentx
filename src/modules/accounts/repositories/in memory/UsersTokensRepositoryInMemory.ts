import { UserTokens } from "@modules/accounts/infra/typeorm/entities/userTokens";
import { ICreateUserTokenDTO, IUsersTokensRepository } from "../IUsersTokensRepository";


class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    })

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const usersToken = this.usersTokens.find(
      (usertoken) => usertoken.user_id === user_id && usertoken.refresh_token && refresh_token
    );
    return usersToken;
  }

   async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(
      (ut) => ut.id === id
    );

    this.usersTokens.indexOf(userToken)
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (ut) => ut.refresh_token === refresh_token
    );
    return userToken;
  }
}

export { UsersTokensRepositoryInMemory }