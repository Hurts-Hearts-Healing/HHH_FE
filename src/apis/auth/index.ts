import { instance } from '../axios';
import { MatchVerificationNumberRequest, SignUpRequest } from './type';

export const SignUp = async (data: SignUpRequest) => {
  return await instance.post('/api/auth/register', data);
};


export const RequestVerificationNumber = async (email: string) => {
    return await instance.post('/mail', {email});
}

export const MatchVerificationNumber = async (data: MatchVerificationNumberRequest) => {
    return await instance.post('/mail/verify', data);
}