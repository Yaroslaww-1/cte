export interface IFindAll<E> {
	findAll(): Promise<E[]>;
}

export interface IFindOne<E> {
	findOne(id: number): Promise<E>;
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
