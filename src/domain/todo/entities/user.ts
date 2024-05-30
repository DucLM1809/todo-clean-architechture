import { Entity } from '@app/core/entities/entity';
import { Role } from '@prisma/client';

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  role?: Role;
  password: string;
}

export class User extends Entity<UserProps> {
  constructor(data: UserProps) {
    super(data);
  }

  get id(): string {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  get email(): string {
    return this.data.email;
  }

  get role(): Role {
    return this.data.role;
  }

  get password(): string {
    return this.data.password;
  }

  get currentState(): UserProps {
    return this.data;
  }
}
