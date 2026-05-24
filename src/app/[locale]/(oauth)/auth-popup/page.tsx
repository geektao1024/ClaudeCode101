'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { signIn } from '@/core/auth/client';

function AuthPopupContent() {
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider') || '';
  const triggered = useRef(false);

  useEffect(() => {
    if (!provider || triggered.current) return;
    triggered.current = true;

    signIn.social({
      provider,
      callbackURL: '/auth-callback',
    });
  }, [provider]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
      <p className="text-muted-foreground text-sm">
        Redirecting to {provider}...
      </p>
    </div>
  );
}

export default function AuthPopupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      }
    >
      <AuthPopupContent />
    </Suspense>
  );
}
