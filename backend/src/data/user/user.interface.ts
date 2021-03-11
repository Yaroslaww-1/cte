import * as Knex from 'knex';

export interface IUserModel {
  id: number;
  name: string;
}

declare module 'knex/types/tables' {
  interface Tables {
    users_composite: Knex.CompositeTableType<
      IUserModel,
      Pick<IUserModel, 'name'>,
      Partial<Omit<IUserModel, 'id'>>
    >;
  }
}
