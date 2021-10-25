import { differenceInDays } from 'date-fns'

export function useIsNew(isoDate: string, daysToBeNew: number) {
  const difference = differenceInDays(new Date(), new Date(isoDate))
  return difference <= daysToBeNew
}
