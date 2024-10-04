import Head from 'next/head'; // next/document ではなく next/head を使用
import './globals.css'; // 他のグローバルCSS
import Header from './Header';
import Footer from './Footer';


export const metadata = {
  title: 'My Next.js App',
  description: 'Next.js App using App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      
      <body>
      <Header/>
      {children}
      {/* <Footer/> */}
      </body>
    </html>
  );
}