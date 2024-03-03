import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class UserAlreadyExist extends HttpException {
  constructor() {
    super('User already exist', HttpStatus.BAD_REQUEST);
  }
}
