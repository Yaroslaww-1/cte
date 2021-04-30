import { Inject, Injectable } from '@nestjs/common';
import { QueryBuilder, ModelClass } from 'objection';

import { NullablePartial } from '@shared/types';
import { IUserModel, UserModel } from '@src/data/dao/user/user.model';
import { BaseDao } from '@src/data/abstraction/base-dao';
import { UserEntity } from '@src/core/services/user/entities/user.entity';
import { UserMapper } from '@src/core/services/user/user.mapper';

// TODO: Reverse dependency
export type IUserFilter = Partial<IUserModel>;

@Injectable()
export class UserDao extends BaseDao<UserModel> {
  constructor(
    @Inject(UserModel) private readonly userModel: ModelClass<UserModel>,
    private readonly userMapper: UserMapper,
  ) {
    super(userModel);
  }

  private updateWhereWithFilters(
    { id, name, email }: IUserFilter,
    qb: QueryBuilder<UserModel, UserModel[]>,
  ): QueryBuilder<UserModel, UserModel[]> {
    if (id) {
      qb.where('id', id);
    }

    if (name) {
      qb.where('name', name);
    }

    if (email) {
      qb.where('email', email);
    }

    return qb;
  }

  async findAll(filter: IUserFilter): Promise<UserEntity[]> {
    const users = await this.userModel
      .query()
      .withGraphFetched({ documents: true })
      .where(qb => this.updateWhereWithFilters(filter, qb));
    return await this.userMapper.mapToEntityMultiple(users);
  }

  async findOne(filter: IUserFilter): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .withGraphFetched({ documents: true })
      .where(qb => this.updateWhereWithFilters(filter, qb))
      .first();
    if (!user) {
      return null;
    }
    return await this.userMapper.mapToEntity(user);
  }

  // TODO: investigate if Omit is the correct way to do it
  async createOne(createUser: IUserModel): Promise<UserEntity> {
    const user = await this.userModel.query().insert(createUser).returning('*');
    return await this.userMapper.mapToEntity(user);
  }

  async deleteOne(id: string): Promise<void> {
    await this.userModel.query().where('id', id);
  }

  async updateOne(id: string, updateUser: NullablePartial<IUserModel>): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .where({ id })
      .update(super.getUpdateObjectWithReplacedNulls(updateUser))
      .returning('*')
      .first();
    if (!user) {
      return null;
    }
    return await this.userMapper.mapToEntity(user);
  }
}
