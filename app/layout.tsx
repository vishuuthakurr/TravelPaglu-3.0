import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: 'TravelPaglu — Real First-Hand Indian Travel Itineraries',
  description:
    'A travel platform built on authentic personal itineraries with real bus routes, verified stays, honest food recommendations, and itemized student budgets.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#fbf8f3] text-[#1f4237] antialiased selection:bg-forest-200 selection:text-forest-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
