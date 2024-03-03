import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ID } from 'src/common/types/type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: ID) {
    return await this.userService.findOneById(id);
  }

  @Put(':id')
  async update(@Param('id') id: ID, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: ID) {
    return await this.userService.delete(id);
  }
}
