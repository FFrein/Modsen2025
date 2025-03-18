import { Role } from '@prisma/client';

export class User {
  id!: number;
  role!: Role;
  username!: string;
  password!: string;
}
