export type CopyFunctionSignatureType<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>

export type Maybe<T> = T | null

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}
