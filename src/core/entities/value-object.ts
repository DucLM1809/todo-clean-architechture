export abstract class ValueObject<Props> {
  protected data: Props;

  protected constructor(data: Props) {
    this.data = data;
  }
}
