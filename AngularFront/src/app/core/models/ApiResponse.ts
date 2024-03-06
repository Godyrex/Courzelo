export class ApiResponse<T> {

  public static fromJson(json: any): any {

    return (json['status'], json['message'], json['data']);
  }

  constructor(
    public status: string,
    public message: string,
    public data: any,
    public totalPages:any,
  ) {}
}
