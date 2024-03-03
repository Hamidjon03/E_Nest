import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor() {
    super('Task not found', HttpStatus.NOT_FOUND);
  }
}

export class TaskAlreadyExist extends HttpException {
  constructor() {
    super('Task already exist', HttpStatus.BAD_REQUEST);
  }
}
