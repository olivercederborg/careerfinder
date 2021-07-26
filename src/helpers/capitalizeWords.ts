export const capitalizeWords = (str) =>
  str.replace(/(\b[a-z](?!\s))/g, (c) => c.toUpperCase())
