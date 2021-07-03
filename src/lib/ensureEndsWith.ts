export function ensureEndsWith(string: string) {
  if (string.endsWith('/')) {
    return string
  }

  return string + '/'
}
