import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laboratório da ArthurLabs",
  description: "Projetos, notas e experimentos da ArthurLabs",
  icons: {
    icon: [
      {
        url: "/brand/lab-mark-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/brand/lab-mark-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="flex min-h-full flex-col bg-bg font-sans text-text antialiased">
        {children}
      </body>
    </html>
  );
}
