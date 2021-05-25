import { CopyFunctionSignatureType } from 'types'

export const fetcher: CopyFunctionSignatureType<typeof fetch> = async (
  ...args
) => {
  const res = await fetch(...args)

  return res.json()
}
