import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepisitory: IUserRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  
  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepisitory.findById(user_id);

    if(user.avatar){
      await this.storageProvider.delete(user.avatar, "avatar")
    }

    await this.storageProvider.save(avatarFile, "avatar")
    
    user.avatar = avatarFile;

    await this.usersRepisitory.create(user)
  }
}

export { UpdateUserAvatarUseCase }