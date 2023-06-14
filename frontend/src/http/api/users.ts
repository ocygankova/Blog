import api from '@/http/axiosInstance';
import { IUser } from '@/models/user';

export async function getAuthenticatedUser() {
  const res = await api.get<IUser>('/users/me');
  return res.data;
}

export async function getUserByUsername(username: string) {
  const res = await api.get<IUser>(`/users/profile/${username}`);
  return res.data;
}

interface ISignUpValues {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
}

export async function signUp(credentials: ISignUpValues) {
  const res = await api.post<IUser>('/users/signup', credentials);
  return res.data;
}

export async function requestEmailVerificationCode(email: string) {
  await api.post('/users/verification-code', { email });
}

export async function requestPasswordResetCode(email: string) {
  await api.post('/users/reset-password-code', { email });
}

interface IResetPasswordValues {
  email: string;
  newPassword: string;
  verificationCode: string;
}

export async function resetPassword(credentials: IResetPasswordValues) {
  const res = await api.post<IUser>('/users/reset-password', credentials);
  return res.data;
}

interface ILoginValues {
  username: string;
  password: string;
}

export async function logIn(credentials: ILoginValues) {
  const res = await api.post<IUser>('/users/login', credentials);
  return res.data;
}

export async function logOut() {
  await api.post('/users/logout');
}

interface IUpdateUserValues {
  username?: string;
  displayName?: string;
  about?: string;
  profileImage?: File;
}

export async function updateUser(input: IUpdateUserValues) {
  const formData = new FormData();
  Object.entries(input).forEach(([key, value]) => {
    if (value !== undefined) formData.append(key, value);
  });

  const res = await api.patch<IUser>('/users/me', formData);
  return res.data;
}
