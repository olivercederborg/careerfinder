export const formatCurrency = (input: number, countryCode: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: countryCode,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(input)
}
