export interface UserResponse {
  id?: string;
  email?: string;
  name?: string;
  lastname?: string;
  roles?: string[];
  enabled: boolean;
  ban: boolean;
}
