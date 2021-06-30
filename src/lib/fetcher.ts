import { QueryFunctionContext, QueryKey } from 'react-query'

export async function fetcher(context: QueryFunctionContext<QueryKey, any>) {
  const json = await fetch(context.queryKey.join('/'), {
    method: 'GET',
  }).then((response) => response.json())

  return json
}
