import { instance } from '../axios';
import { LoginRequest, MatchVerificationNumberRequest, SignUpRequest } from './type';

export const signUp = async (data: SignUpRequest) => {
  return await instance.post('/api/auth/register', data);
};

export const requestVerificationNumber = async (email: string) => {
    return await instance.post('/mail', {email});
}

export const matchVerificationNumber = async (data: MatchVerificationNumberRequest) => {
    return await instance.post('/mail/verify', data);
}

export const login = async (data: LoginRequest) => {
  return await instance.post('/api/auth/login', data);
}