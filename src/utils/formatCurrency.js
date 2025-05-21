export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID").format(amount);
};
