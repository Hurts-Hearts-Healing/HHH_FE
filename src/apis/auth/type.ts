export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
  birthday: string; // YYYY-MM-DD
  breakupDate: string; // YYYY-MM-DD
  emotionStatus: number;
};
