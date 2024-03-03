import { HttpException, HttpStatus } from '@nestjs/common';

export class UserTaskNotFoundException extends HttpException {
  constructor() {
    super('UserTask not found', HttpStatus.NOT_FOUND);
  }
}

export class UserTaskAlreadyExist extends HttpException {
  constructor() {
    super('UserTask already exist', HttpStatus.BAD_REQUEST);
  }
}
