import { Injectable } from '@nestjs/common';
import { IFindAll } from '@shared/abstraction';
import { UserEntity } from './user.entity';
import { KnexService } from '@data/knex.service';

@Injectable()
export class UserRepository implements IFindAll<UserEntity> {
  private readonly knex = new KnexService().getKnex();
  async findAll(): Promise<UserEntity[]> {
    const usersTable = await this.knex.select('*').from('users');
    const users: UserEntity[] = [];
    for (let i = 0; i < usersTable.length; i++) {
      users.push(new UserEntity({ id: usersTable[i].id, name: usersTable[i].name }));
    }
    return users;
  }
}