import { IUser } from '../interfaces/user';

export function saveUser(user: IUser) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): IUser | null {
  const user = localStorage.getItem('user');
  return user ? (JSON.parse(user) as IUser) : null;
}
