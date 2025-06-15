import "./globals.css";
import { Inter, Pacifico } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
  display: "swap",
});

export const metadata = {
  title: "AcePilot",
  description: "Your AI-powered study companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pacifico.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
