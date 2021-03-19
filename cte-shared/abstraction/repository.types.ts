export interface IFindAll<E, F> {
	findAll(filter: F): Promise<E[]>;
}

export interface IFindOne<E, F> {
	findOne(filter: F): Promise<E | undefined>;
}

export interface ICreateOne<U, E> {
	createOne(updatingDto: U): Promise<E>;
}

export interface IUpdateOne<U, E> {
	updateOne(id: number, updatingDto: U): Promise<E>;
}

export interface IDeleteOne {
	deleteOne(id: number): Promise<void>;
}
