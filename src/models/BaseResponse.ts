export interface BaseResponse<T> {
  responseCode: number;
  responseMessage: string;
  data: T;
}
export interface Status {
  name: string;
}
export interface Country{
  name:string;
}
