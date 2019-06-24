/* TODO: Allow JSON format to be customized */

export type Json = string;

interface FormatterOptions {
  prettify?: boolean;
}

export function formatAsJson(data: object, formatOptions: FormatterOptions = {}): Json {
  const {
    prettify = true,
  } = formatOptions;

  if (prettify) {
    return JSON.stringify(data, undefined, 2);
  }
  return JSON.stringify(data);
}
