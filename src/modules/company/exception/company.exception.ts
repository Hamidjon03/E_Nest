import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyNotFoundException extends HttpException {
  constructor() {
    super('Company not found', HttpStatus.NOT_FOUND);
  }
}

export class CompanyALreadyExistException extends HttpException {
  constructor() {
    super('Company already exist', HttpStatus.BAD_REQUEST);
  }
}
