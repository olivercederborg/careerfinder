import { differenceInDays } from 'date-fns'

/**
 * Determine if a date is within the specified threshold in days.
 * @param isoDate - `string`
 * @param daysToBeNew - `number`
 * @returns `boolean`
 */
export function useIsNew(isoDate: string, daysToBeNew: number) {
  const difference = differenceInDays(new Date(), new Date(isoDate))
  return difference <= daysToBeNew
}
