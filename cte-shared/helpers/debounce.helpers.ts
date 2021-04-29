const debounce = <T = unknown>(inner: () => Promise<T>, ms = 0): (() => Promise<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timer: any | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let resolves: any[] = [];

  return function (): Promise<T> {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const result = inner();
      resolves.forEach(r => r(result));
      resolves = [];
    }, ms);

    return new Promise(resolve => resolves.push(resolve));
  };
};

export { debounce };
