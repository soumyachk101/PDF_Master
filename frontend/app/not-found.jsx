import NotFoundPage from '@/pages/NotFoundPage';

export const metadata = {
  title: 'Page Not Found – 404 | DocShift Free PDF Tools',
  description: "The page you're looking for doesn't exist. Return to DocShift's free PDF tools to merge, compress, convert and edit PDFs securely.",
  robots: 'noindex',
};

export default function NotFound() {
  return <NotFoundPage />;
}
