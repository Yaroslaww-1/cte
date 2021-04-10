import { Inject, Injectable } from '@nestjs/common';
import { QueryBuilder, ModelClass } from 'objection';

import { NullablePartial } from '@shared/types';
import { IUserModel, UserModel } from '@src/data/dao/user/user.model';
import { BaseDao } from '@src/data/abstraction/base-dao';

// TODO: Reverse dependency
export type IUserFilter = Partial<IUserModel>;

@Injectable()
export class UserDao extends BaseDao<UserModel> {
  constructor(@Inject(UserModel) private readonly userModel: ModelClass<UserModel>) {
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

  async findAll(filter: IUserFilter): Promise<IUserModel[]> {
    return await this.userModel
      .query()
      .withGraphFetched({ documents: true })
      .where(qb => this.updateWhereWithFilters(filter, qb));
  }

  async findOne(filter: IUserFilter): Promise<IUserModel | undefined> {
    return await this.userModel
      .query()
      .withGraphFetched({ documents: true })
      .where(qb => this.updateWhereWithFilters(filter, qb))
      .first();
  }

  // TODO: investigate if Omit is the correct way to do it
  async createOne(createUser: Omit<IUserModel, 'id'>): Promise<IUserModel> {
    return await this.userModel.query().insert(createUser).returning('*');
  }

  async deleteOne(id: number): Promise<void> {
    await this.userModel.query().where('id', id);
  }

  async updateOne(id: number, updateUser: NullablePartial<IUserModel>): Promise<IUserModel> {
    return await this.userModel
      .query()
      .where({ id })
      .update(super.getUpdateObjectWithReplacedNulls(updateUser))
      .returning('*')
      .first();
  }
}
