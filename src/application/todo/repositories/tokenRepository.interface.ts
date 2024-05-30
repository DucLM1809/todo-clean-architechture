import { Token } from '@app/domain/todo/entities/token';

export abstract class ITokenRepository {
  abstract save(data: Token): Promise<Token>;
  abstract update(data: Token): Promise<Token>;
  abstract findFirstByUserId(userId: string): Promise<Token | null>;
}
