import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service';
import { IUserRepository } from './interfaces/user.repository';
import { UserEntity } from './entities/user.entity';
import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/type';
import { UserNotFoundException } from './exception/user.exception';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResData<UserEntity>> {
    const newUserEntity = new UserEntity(createUserDto);

    const newUser = await this.userRepository.insert(newUserEntity);

    return new ResData<UserEntity>(
      'user was created successfully',
      201,
      newUser,
    );
  }

  async findAll(): Promise<ResData<Array<UserEntity>>> {
    const foundUsers = await this.userRepository.findAll();

    return new ResData<Array<UserEntity>>('success', 200, foundUsers);
  }

  async findOneById(id: ID): Promise<ResData<UserEntity | undefined>> {
    const foundUsers = await this.userRepository.getOneById(id);

    if (!foundUsers) {
      throw new UserNotFoundException();
    }

    return new ResData<UserEntity>('success', 200, foundUsers);
  }

  async update(
    id: ID,
    updateUserDto: UpdateUserDto,
  ): Promise<ResData<UserEntity>> {
    const { data: foundUsers } = await this.findOneById(id);

    console.log(foundUsers);
    foundUsers.login = updateUserDto.login;
    foundUsers.password = updateUserDto.password;
    foundUsers.full_name = updateUserDto.fullName;
    foundUsers.company_id = updateUserDto.companyId;
    foundUsers.created_by = updateUserDto.createdBy;
    foundUsers.last_updated_by = updateUserDto.lastUpdatedBy;
    foundUsers.role = updateUserDto.role;

    const updatedUser = await this.userRepository.update(id, foundUsers);

    return new ResData<UserEntity>(
      'User was updated successfully',
      200,
      updatedUser,
    );
  }
  async delete(id: ID): Promise<ResData<UserEntity>> {
    await this.findOneById(id);
    const deletedUser = await this.userRepository.delete(id);

    return new ResData<UserEntity>('User was deleted', 200, deletedUser);
  }
  async findByLogin(login: string): Promise<ResData<UserEntity | undefined>> {
    const foundUser = await this.userRepository.findByLogin(login);

    const response = new ResData('success', 200, foundUser);

    if (!foundUser) {
      response.message = 'User not found';
      response.statusCode = HttpStatus.NOT_FOUND;
    }

    return response;
  }
}
