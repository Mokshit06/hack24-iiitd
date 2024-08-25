import { GeistSans } from 'geist/font/sans';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/styles/globals.css';
import { useState } from 'react';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div className={GeistSans.className + ' dark'}>
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
