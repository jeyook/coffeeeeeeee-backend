export type UserSignUpDto = {
  providerName: string;
  socialId: string;
  nickname: string;
  email: string;
};

export type GoogleOAuthUserDto = {
  provider: string;
  providerId: string;
  name: string;
  email: string;
};
