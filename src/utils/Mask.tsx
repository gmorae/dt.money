
export function formatDate(date: Date, separator = '/') {
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); //months from 1-12
  const day = date.getUTCDate().toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  return day + separator + month + separator + year;
}

export const maskCurrency = (
  value: any,
  hasFractionDigits = false,
  showCurrency = true,
) => {
  let options = {};
  if (!value) value = 0;

  if (!hasFractionDigits) value = parseInt(value);

  if (showCurrency)
    options = {
      style: 'currency',
      currency: 'BRL',
    };
  else {
    options = { minimumFractionDigits: 2 };
  }

  var formatter = new Intl.NumberFormat('pt-BR', options);

  return formatter.format(value);
};
