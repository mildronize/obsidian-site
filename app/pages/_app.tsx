import '@thadaw.com/styles/index.css';
import '@thadaw.com/styles/prism-template.css';
import ClientReload from '@thadaw.com/components/PageLayout/ClientReload';
import { ThemeProvider } from 'next-themes';
import siteMetadata from '@thadaw.com/data/siteMetadata';

const isDevelopment = process.env.NODE_ENV === 'development';
const isSocket = process.env.SOCKET;

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        {isDevelopment && isSocket && <ClientReload />}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
