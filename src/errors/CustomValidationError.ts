class CustomValidationError {
  public readonly param: string;

  public readonly reason: string;

  public readonly message: string;

  public readonly statusCode: number;

  constructor(
    param: string,
    reason: string,
    message = 'Ocorreu um erro na validação dos dados',
  ) {
    this.param = param;
    this.reason = reason;
    this.message = message;
    this.statusCode = 400;
  }
}

export default CustomValidationError;
