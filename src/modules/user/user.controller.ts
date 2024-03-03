import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Inject,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ID } from 'src/common/types/type';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from './entities/user.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { UserNotFoundException } from './exception/user.exception';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query, @CurrentUser() currentUser: UserEntity) {
    if (currentUser.role === 'superAdmin' && query.company_id) {
      return await this.userService.findByCompnayId(query.companyId);
    } else if (currentUser.role === 'superAdmin' && !query.company_id) {
      return await this.userService.findAll();
    } else {
      return await this.userService.findByCompnayId(currentUser.company_id);
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: ID) {
    return await this.userService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.SUPERADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: ID,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role === 'admin') {
      updateUserDto.companyId = currentUser.company_id;
    }
    return await this.userService.update(id, updateUserDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.SUPERADMIN)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: ID,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const { data: foundUser } = await this.userService.findOneById(id);
    if (currentUser.role === 'admin') {
      if (currentUser.company_id === foundUser.company_id) {
        return await this.userService.delete(id);
      } else {
        throw new UserNotFoundException();
      }
    }
    return await this.userService.delete(id);
  }
}
