import * as qs from 'qs';

export const stringifyParams = (params: unknown): string =>
  qs.stringify(params, { arrayFormat: 'comma', encodeValuesOnly: true, encode: false });

export const parseUrlParams = <T>(params: string): T => {
  const parsed = qs.parse(params, {
    comma: true,
    ignoreQueryPrefix: true,
    decoder(value) {
      const keywords = {
        true: true,
        false: false,
        null: null,
        undefined: undefined,
      };
      if (value in keywords) {
        return keywords[value as keyof typeof keywords];
      }

      return value;
    },
  });
  return (parsed as unknown) as T;
};

export const updateQuerystringParams = (params: unknown): void => {
  const newUrlParams = stringifyParams(params);
  window.history.replaceState(null, '', `?${newUrlParams}`);
};

export const updateQuerystringParam = (key: string, value: unknown): void => {
  const oldParams = parseUrlParams<Record<string, unknown>>(window.location.search);
  const newUrlParams = stringifyParams({ ...oldParams, [key]: value });
  window.history.replaceState(null, '', `?${newUrlParams}`);
};
