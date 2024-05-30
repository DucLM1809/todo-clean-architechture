import { AggregateRoot } from '@nestjs/cqrs';

export abstract class Entity<Props> extends AggregateRoot<Props> {
  protected data: Props;

  protected constructor(data: Props) {
    super();
    this.data = data;
  }
}
