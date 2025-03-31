import { Suspense } from 'react';
import type { Metadata } from 'next';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank You',
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <LoadingSpinner />
          </div>
        }
      >
        <main>{children}</main>
      </Suspense>
    </div>
  );
}
