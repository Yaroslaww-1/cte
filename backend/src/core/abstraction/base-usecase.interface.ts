interface IBaseUsecase<In, Out> {
  execute(input: In): Promise<Out>;
}

export { IBaseUsecase };
