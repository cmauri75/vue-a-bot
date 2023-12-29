export function toCurrency(amount) {
  if (!amount) return 'undefined';
  return `€ ${amount.toFixed(2)}`;
}

export function toShortDate(date) {
  return date;
}
