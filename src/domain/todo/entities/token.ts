import { Entity } from '@app/core/entities/entity';

export interface TokenProps {
  id?: number;
  value: string;
  userId: string;
}

export class Token extends Entity<TokenProps> {
  constructor(data: TokenProps) {
    super(data);
  }

  get id(): number {
    return this.data.id;
  }

  get value(): string {
    return this.data.value;
  }

  get userId(): string {
    return this.data.userId;
  }
}
