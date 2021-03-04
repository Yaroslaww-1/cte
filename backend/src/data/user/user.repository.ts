import { Injectable } from '@nestjs/common';
import { IFindAll } from '@shared/abstraction';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository implements IFindAll<UserEntity> {
	async findAll(): Promise<UserEntity[]> {
		return [new UserEntity({ id: 1, name: 'Kappa' })];
	}
}
