import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import NextNProgress from 'nextjs-progressbar';
import basicTheme from '@/styles/theme';
import createEmotionCache from '@/styles/createEmotionCache';
import { AuthModalsProvider, Footer, Header } from '@/components';
import { Container } from '@mui/material';
import { useOnboardingRedirect } from '@/hooks';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  useOnboardingRedirect();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Blog - Share your ideas</title>
        <meta name="description" content="A blog to share your ideas" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={basicTheme}>
        <AuthModalsProvider>
          <CssBaseline />
          <NextNProgress
            color="#21fa90"
            height={5}
            options={{
              showSpinner: false,
            }}
          />

          <Header />

          <main>
            <Container sx={{ pb: 4, pt: 12 }}>
              <Component {...pageProps} />
            </Container>
          </main>
          <Footer />
        </AuthModalsProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
