import { useQueryClient } from 'react-query'

export const useHandleMutation = (queryKey: string) => {
  const queryClient = useQueryClient()

  return {
    onMutate: async (newItem) => {
      await queryClient.cancelQueries(queryKey)

      const previousItems = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: unknown[]) => [...old, newItem])

      return { previousItems }
    },
    onError: (err, newItem, context: any) => {
      console.log({ err })
      queryClient.setQueryData(queryKey, context.previousItems)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  }
}
