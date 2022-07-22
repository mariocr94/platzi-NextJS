interface IUser {
  avatar: string;
  email: string;
  id: number;
  name: string;
  password: string;
  role: string;
}
export const emptyUser: IUser = {
  avatar: '',
  email: '',
  id: 0,
  name: '',
  password: '',
  role: '',
};
export default IUser;
