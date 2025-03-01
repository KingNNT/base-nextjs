export interface IResponse<TData, TError> {
  data: TData;
  errors?: TError;
  message?: string;
  status: number;
}

export interface IPagination<TResult> {
  count: number;
  next?: string;
  previous?: string;
  results: TResult[];
}

export interface IAuthToken {
  access_token: string;
  refresh_token: string;
}

export interface ISample {
  id: number;
  name: string;
}
