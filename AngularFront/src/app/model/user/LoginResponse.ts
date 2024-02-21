export interface LoginResponse {
  token?: string;
  type?: string;
  email?: string;
  name?: string;
  lastname?: string;
  roles?: string[];
}
