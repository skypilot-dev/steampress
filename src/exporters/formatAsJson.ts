/* TODO: Allow JSON format to be customized */

export type Json = string;

interface FormatterOptions {
  prettify?: boolean;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function formatAsJson(data: Record<string, any>, formatOptions: FormatterOptions = {}): Json {
  const {
    prettify = true,
  } = formatOptions;

  if (prettify) {
    return JSON.stringify(data, undefined, 2);
  }
  return JSON.stringify(data);
}
