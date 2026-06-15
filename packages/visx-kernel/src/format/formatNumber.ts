export type FormatNumberOptions = Intl.NumberFormatOptions & {
  locale?: Intl.LocalesArgument;
};

export default function formatNumber(value: number, options: FormatNumberOptions = {}) {
  const { locale, ...numberOptions } = options;
  return new Intl.NumberFormat(locale, numberOptions).format(value);
}
