export class ResData<TData> {
  message: string;
  statusCode: number;
  data: TData | null;
  error: Error | null;
  login: string;
  full_name: any;
  constructor(
    message: string,
    statusCode: number,
    data: TData | null = null,
    error: Error | null = null,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
  }
}
