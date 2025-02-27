// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = Role;
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
