type FunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type WithoutFunctions<T> = Omit<T, FunctionPropertyNames<T>>;

export { WithoutFunctions };
