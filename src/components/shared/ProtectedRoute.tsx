import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../api/client';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'denied'>('loading');

  useEffect(() => {
    verifyToken().then(valid => setStatus(valid ? 'ok' : 'denied'));
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === 'denied') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
