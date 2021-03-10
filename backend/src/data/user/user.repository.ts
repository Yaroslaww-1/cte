import { Injectable } from '@nestjs/common';
import { IDeleteOne, IFindAll, IFindOne, IUpdateOne, ICreateOne } from '@shared/abstraction';
import { UserEntity } from './user.entity';
import { KnexService } from '@data/knex/knex.service';
import { User } from '@data/user/user.interface';
import { CreateUserDto } from '@shared/dto';

@Injectable()
export class UserRepository implements IFindAll<UserEntity>, IFindOne<UserEntity>, ICreateOne<UserEntity>,
 IDeleteOne, IUpdateOne<UserEntity, UserEntity> {
  private readonly knex = new KnexService().getKnex();

  async findAll(): Promise<UserEntity[]> {
    const usersTable = await this.knex<User>('users')
      .select('*');
    return usersTable.map(
      user => new UserEntity({ id: user.id, name: user.name })
    );
  }

  async findOne(id: number): Promise<UserEntity> {
    const usersTable = await this.knex<User>('users')
      .select('*')
      .where('id', id);
    return new UserEntity({ id: usersTable[0].id, name: usersTable[0].name });
  }

  async createOne(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.knex<User>('users')
      .insert({ name: createUserDto.name })
      .returning('*');
    return new UserEntity({ id: newUser[0].id, name: newUser[0].name });
  }

  async deleteOne(id: number) {
    await this.knex<User>('users')
      .where('id', id)
      .del();
  }

  async updateOne(id: number, createUserDto: CreateUserDto): Promise<UserEntity> {
    await this.knex<User>('users')
      .where({ id: id })
      .update({ name: createUserDto.name });
    const usersTable = await this.knex<User>('users')
      .select('*')
      .where('id', id);
    return new UserEntity({ id: usersTable[0].id, name: usersTable[0].name });
  }
}
