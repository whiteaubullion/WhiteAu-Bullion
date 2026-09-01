import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const playfair = Playfair_Display({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
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
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            top: 0,
            left: 0,
            transform: "scale(1.05)"
          }}
        >
          <source src="/hero-bg-hq.mp4" type="video/mp4" />
        </video>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
