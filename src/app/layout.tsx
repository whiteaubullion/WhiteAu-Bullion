import type { Metadata } from "next";
import { Libre_Baskerville, Montserrat } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${libreBaskerville.variable} ${montserrat.variable}`}>
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
            left: 0
          }}
        >
          <source src="/hero-bg-hq.mp4" type="video/mp4" />
        </video>
        {children}
      </body>
    </html>
  );
}
