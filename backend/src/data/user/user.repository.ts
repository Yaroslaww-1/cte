import { Injectable } from '@nestjs/common';
import { IDeleteOne, IFindAll, IFindOne, IUpdateOne, ICreateOne } from '@shared/abstraction';
import { KnexService } from '@data/knex/knex.service';
import { IUserModel } from '@data/user/user.interface';
import { CreateUserDto } from '@shared/dto';

@Injectable()
export class UserRepository implements IFindAll<IUserModel>, IFindOne<IUserModel>, ICreateOne<IUserModel>,
 IDeleteOne, IUpdateOne<IUserModel, IUserModel> {
  private readonly knex = new KnexService().getKnex();

  async findAll(): Promise<IUserModel[]> {
    const usersTable = await this.knex<IUserModel>('users')
      .select('id', 'name');
    return usersTable.map(
      user => <IUserModel>{ id: user.id, name: user.name }
    );
  }

  async findOne(id: number): Promise<IUserModel> {
    const usersTable = await this.knex<IUserModel>('users')
      .select('id', 'name')
      .where('id', id);
    return <IUserModel>{ id: usersTable[0].id, name: usersTable[0].name };
  }

  async createOne(createUserDto: CreateUserDto): Promise<IUserModel> {
    const newUser = await this.knex<IUserModel>('users')
      .insert({ name: createUserDto.name })
      .returning('*');
    return <IUserModel>{ id: newUser[0].id, name: newUser[0].name };
  }

  async deleteOne(id: number) {
    await this.knex<IUserModel>('users')
      .where('id', id)
      .del();
  }

  async updateOne(id: number, createUserDto: CreateUserDto): Promise<IUserModel> {
    await this.knex<IUserModel>('users')
      .where({ id: id })
      .update({ name: createUserDto.name });
    const usersTable = await this.knex<IUserModel>('users')
      .select('id', 'name')
      .where('id', id);
    return <IUserModel>{ id: usersTable[0].id, name: usersTable[0].name };
  }
}
