// eslint-disable-next-line import/prefer-default-export
export function convertToInternationalCurrencySystem(labelValue: any) {
  /* eslint-disable no-nested-ternary */
  return Math.abs(Number(labelValue)) >= 1.0e+9
    ? `${(Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2)}B`
    : Math.abs(Number(labelValue)) >= 1.0e+6
      ? `${(Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2)}M`
      : Math.abs(Number(labelValue)) >= 1.0e+3
        ? `${(Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2)}K`
        : Math.abs(Number(labelValue));
}
