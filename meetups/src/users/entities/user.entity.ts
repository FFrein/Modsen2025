export enum UserRole {
  USER = 'USER',
  ORGANIZER = 'ORGANIZER',
}
export class User {
  id: number;
  role: UserRole;
  username: string;
  password: string;
}
