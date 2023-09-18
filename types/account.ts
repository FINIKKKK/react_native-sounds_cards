import { TBase } from './base';

export interface TUser extends TBase {
  first_name: string;
  email: string;
  password: string;
  token: string;
}
