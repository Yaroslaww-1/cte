export interface IFindAll<E> {
	findAll(): Promise<E[]>;
}

export interface IFindOne<E> {
	findOne(id: number): Promise<E>;
}

export interface IUpdateOne<E, U> {
	updateOne(id: number, updatingDto: U): Promise<E>;
}

export interface IDeleteOne {
	deleteOne(id: number): Promise<void>;
}
