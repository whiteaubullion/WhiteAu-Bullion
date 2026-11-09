import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import SmoothScroll from '@/components/ui/SmoothScroll';
import PageLoader from '@/components/ui/PageLoader';
import BackgroundVideo from '@/components/ui/BackgroundVideo';

const playfair = Playfair_Display({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WhiteAu Bullion | Your Trusted Gold Partner",
  description: "Turn Your Gold Into Trusted Value with WhiteAu Bullion Pvt Ltd, a trusted gold-buying company in Kerala.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/gold-logo.webp', type: 'image/webp' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jost.variable}`}>
      <body>
        <BackgroundVideo />
        <PageLoader />
        {children}
        <SmoothScroll />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
