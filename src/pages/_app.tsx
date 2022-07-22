import '@styles/tailwind.css';
import type { AppProps } from 'next/app'
import MainLayout from '@layout/MainLayout';
import { ProviderAuth } from '../hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <ProviderAuth>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout> 
    </ProviderAuth>
    </>
  )
}

export default MyApp
