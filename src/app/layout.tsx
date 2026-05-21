import type { Metadata, Viewport } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import { NoiseOverlay } from '@/components/ui/noise-overlay';
import { LenisProvider } from '@/components/providers/lenis-provider';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NEXTIT Technologies — Next-Generation Digital Platforms',
    template: '%s | NEXTIT Technologies',
  },
  description:
    'Vyvíjíme prémiové webové platformy, mobilní aplikace a systémy poháněné AI. Building next-generation web platforms, mobile apps and AI-powered systems.',
  keywords: ['NEXTIT', 'technologies', 'web development', 'mobile apps', 'AI', 'SaaS', 'Praha', 'Czech Republic'],
  authors: [{ name: 'NEXTIT Technologies', url: 'https://nextit.tech' }],
  creator: 'NEXTIT Technologies',
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    alternateLocale: ['en_US', 'de_DE'],
    url: 'https://nextit.tech',
    siteName: 'NEXTIT Technologies',
    title: 'NEXTIT Technologies — Next-Generation Digital Platforms',
    description: 'Vyvíjíme prémiové webové platformy, mobilní aplikace a systémy poháněné umělou inteligencí.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NEXTIT Technologies' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXTIT Technologies',
    description: 'Next-generation digital platforms, mobile apps and AI-powered systems.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${dmSans.variable} ${dmMono.variable} font-sans bg-black text-white antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <NoiseOverlay />
            {children}
            <Toaster
              theme="dark"
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'rgba(15,15,15,0.95)',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  backdropFilter: 'blur(20px)',
                },
              }}
            />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
