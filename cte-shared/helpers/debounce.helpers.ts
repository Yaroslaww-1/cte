const debounce = <T = unknown>(inner: () => Promise<T>, ms = 0): (() => Promise<T>) => {
  let timer: NodeJS.Timeout | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let resolves: any[] = [];

  return function (): Promise<T> {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      const result = inner();
      resolves.forEach(r => r(result));
      resolves = [];
    }, ms);

    return new Promise(resolve => resolves.push(resolve));
  };
};

export { debounce };
