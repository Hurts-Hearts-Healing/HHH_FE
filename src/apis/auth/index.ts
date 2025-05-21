import { instance } from '../axios';
import { SignUpRequest } from './type';

export const SignUp = async (data: SignUpRequest) => {
  return await instance.post('/api/auth/register', data);
};
