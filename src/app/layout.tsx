import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import SmoothScroll from '@/components/ui/SmoothScroll';
import PageLoader from '@/components/ui/PageLoader';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jost.variable}`}>
      <body>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            top: 0,
            left: 0,
            transform: "scale(1.05) translateZ(0)",
            willChange: "transform",
            pointerEvents: "none",
          }}
        >
          <source src="/hero-bg-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
          <source src="/hero-bg-1080p.mp4" type="video/mp4" />
        </video>
        <PageLoader />
        {children}
        <SmoothScroll />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
