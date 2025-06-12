

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { QueryClientContext } from "@/providers/queryclient";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApoiaDev - Apoie criadores de conteúdo",
  description: "Crie sua página de doações personalizada e receba apoio dos seus seguidores com segurança via Stripe.",
  keywords: ["doações", "criadores de conteúdo", "Stripe", "apoio", "pagamento", "plataforma", "ApoiaDev"],
  openGraph: {
    title: "ApoiaDev - Apoie criadores de conteúdo",
    description: "Uma plataforma para criadores receberem doações de forma fácil, segura e personalizada.",
    url: "https://apoia-dev-brown.vercel.app", // ajuste o domínio real
    siteName: "ApoiaDev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ApoiaDev - Apoie criadores de conteúdo",
    description: "Crie sua página de apoio personalizada e receba doações com Stripe.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <QueryClientContext>
            {children}
            <Toaster duration={3000} />
          </QueryClientContext>
        </SessionProvider>
      </body>
    </html>
  );
}
