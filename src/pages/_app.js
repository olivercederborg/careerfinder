import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import { fetcher } from '../lib/fetcher'
import { usePageView } from '../hooks'
import { Layout as BackendLayout } from '../components/backend/Layout'

import 'styles/tailwind.css'
import 'styles/global.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: fetcher,
    },
  },
})

function MyApp({ Component, pageProps, router }) {
  usePageView()

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
        {router.pathname.startsWith('/backend') ? (
          <BackendLayout>
            <Component {...pageProps} />
          </BackendLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </QueryClientProvider>
    </>
  )
}

export default MyApp
