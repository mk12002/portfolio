// web/app/layout.tsx
import './globals.css';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';

export const metadata = { title: 'Mohit — ML Systems Lab' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main className="pt-20 min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
