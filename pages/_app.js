import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import axios from 'axios'

import 'styles/tailwind.css'
import 'styles/global.scss'

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey[0])

  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CareerFinder</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
