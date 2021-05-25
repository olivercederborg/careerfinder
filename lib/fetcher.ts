import { useQuery } from 'react-query'
import { CopyFunctionSignatureType } from 'types'

type ArgsType<T> = T extends (...args: infer U) => any ? U : never

type Context = ArgsType<typeof useQuery>[1]

export const fetcher = async <T>({ queryKey }: Context): T => {
  const json = await fetch(queryKey).then((r) => r.json())

  return json
}
