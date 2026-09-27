import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'InClaim — Motor Claim Evidence Investigation',
  description: 'Evidence-sufficiency investigation workstation for Indian motor claims.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#191919]">
        {children}
      </body>
    </html>
  );
}
