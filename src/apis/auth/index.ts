import { instance } from "../axios";
import {
  GetUserInfoResponse,
  LoginRequest,
  MatchVerificationNumberRequest,
  SignUpRequest,
} from "./type";

// 회원가입
export const signUp = async (data: SignUpRequest) => {
  return await instance.post("/api/auth/register", data);
};

// 인증번호 요청
export const requestVerificationNumber = async (email: string) => {
  return await instance.post("/api/mail", { email });
};

// 인증번호 매치
export const matchVerificationNumber = async (
  data: MatchVerificationNumberRequest
) => {
  return await instance.post("/api/mail", data);
};

// 로그인
export const login = async (data: LoginRequest) => {
  return await instance.post("/api/auth/login", data);
};

// 회원 탈퇴
export const cancelMembership = async () => {
  return await instance.delete("/api/user/deactivate");
};

// 현재 유저 정보 가져오기
export const getUserInfo = async () => {
  return await instance.get<GetUserInfoResponse>("/api/user");
};
