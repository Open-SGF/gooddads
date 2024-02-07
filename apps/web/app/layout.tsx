import { GeistSans } from 'geist/font/sans';
import '@gooddads/ui/styles.css';
import { Theme } from '@radix-ui/themes';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Good Dads',
  description: 'A place for dads to be good',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <Theme>
          <main className='flex min-h-screen flex-col items-center'>
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}
