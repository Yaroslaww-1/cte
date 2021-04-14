interface IBaseMapper<M, E, D> {
  mapToEntity(model: M): Promise<E>;
  mapToEntityMultiple(models: M[]): Promise<E[]>;
  mapToDto(entity: E): Promise<D>;
  mapToDtoMultiple(entity: E[]): Promise<D[]>;
}

export { IBaseMapper };
