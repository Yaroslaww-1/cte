import { Injectable } from '@nestjs/common';
import { IFindAll } from '@shared/abstraction';
import { UserEntity } from './user.entity';
import { KnexService } from '@data/knex.service';
import { User } from '@data/user/user.interface';
import { CreateUserEntity } from '@data/user/create-user.entity';

@Injectable()
export class UserRepository implements IFindAll<UserEntity> {
  private readonly knex = new KnexService().getKnex();

  async findAll(): Promise<UserEntity[]> {
    const usersTable = await this.knex<User>('users')
      .select('*');
    return usersTable.map(
      user => new UserEntity({ id: user.id, name: user.name })
    );
  }

  async findOne(id: number): Promise<UserEntity[]> {
    const usersTable = await this.knex<User>('users')
      .select('*')
      .where('id', id);
    return usersTable.map(
      user => new UserEntity({ id: user.id, name: user.name })
    );
  }

  async createOne(createUserEntity: CreateUserEntity): Promise<UserEntity[]> {
    const newUser = await this.knex<User>('users')
      .insert({ name: createUserEntity.name })
      .returning('*');
    return newUser.map(
      user => new UserEntity({ id: user.id, name: user.name })
    );
  }

  async deleteOne(id: number) {
    await this.knex<User>('users')
      .where('id', id)
      .del();
  }

  async updateOne(id: number, createUserEntity: CreateUserEntity): Promise<UserEntity[]> {
    await this.knex<User>('users')
      .where({ id: id })
      .update({ name: createUserEntity.name });
    const usersTable = await this.knex<User>('users')
      .select('*')
      .where('id', id);
    return usersTable.map(
      user => new UserEntity({ id: user.id, name: user.name })
    );
  }
}
