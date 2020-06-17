export default class IError extends Error {
  public status: number;
  public errors!: any[];
  public err_code: number;

  constructor(msg: string, err_code: number, status?: number) {
    super(msg.toString());
    this.status = status || 400;
    this.err_code = err_code;
  }
}
