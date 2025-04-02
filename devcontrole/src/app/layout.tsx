import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { AuthProvider } from '@/providers/auth'

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de gerenciamento.",
  description: "Dev Controle é um sistema de gerenciamento de projetos e tarefas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
      </body>
    </html>
  );
}
