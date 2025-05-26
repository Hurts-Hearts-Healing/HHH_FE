import { instance } from '../axios';
import { LoginRequest, MatchVerificationNumberRequest, SignUpRequest } from './type';

// 회원가입
export const signUp = async (data: SignUpRequest) => {
  return await instance.post('/api/auth/register', data);
};

// 인증번호 요청
export const requestVerificationNumber = async (email: string) => {
    return await instance.post('/mail', {email});
}

// 인증번호 매치
export const matchVerificationNumber = async (data: MatchVerificationNumberRequest) => {
    return await instance.post('/mail/verify', data);
}

// 로그인
export const login = async (data: LoginRequest) => {
  return await instance.post('/api/auth/login', data);
}