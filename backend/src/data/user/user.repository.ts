import { Injectable } from '@nestjs/common';
import { IFindAll } from '@shared/abstraction';
import { UserEntity } from './user.entity';
import { KnexService } from '@data/knex.service';

@Injectable()
export class UserRepository implements IFindAll<UserEntity> {
  private readonly knex = new KnexService().getKnex();
  async findAll(): Promise<UserEntity[]> {
    const usersTable = await this.knex.select('*').from('users');
    return usersTable.map(
      (user: { id: number; name: string; }) => new UserEntity({ id: user.id, name: user.name })
    );
  }
}