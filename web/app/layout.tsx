import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PDFForge – Online PDF Tools',
  description: 'Merge, split, compress and convert PDFs securely in your browser.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-semibold">
                  PF
                </div>
                <span className="text-lg font-semibold tracking-tight">PDFForge</span>
              </div>
              <nav className="flex gap-4 text-sm text-slate-600">
                <a href="/" className="hover:text-slate-900">
                  Home
                </a>
                <a href="/tools/merge-pdf" className="hover:text-slate-900">
                  Merge PDF
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-500">
              <span>© {new Date().getFullYear()} PDFForge. All rights reserved.</span>
              <span>Files are deleted automatically after processing.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

