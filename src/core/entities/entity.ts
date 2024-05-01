import { AggregateRoot } from '@nestjs/cqrs';

export abstract class Entity<Props> extends AggregateRoot<Props> {
  protected props: Props;

  protected constructor(props: Props) {
    super();
    this.props = props;
  }
}
