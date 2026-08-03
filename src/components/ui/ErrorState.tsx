/* ============================================================
   ErrorState — fallback shown when data fails to load.
   ============================================================ */

import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = memo(function ErrorState({
  message = 'No pudimos cargar esta información. Intenta nuevamente.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="error-state" role="alert">
      <span className="error-state__icon" aria-hidden="true">
        <Icon name="zap" size={28} />
      </span>
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} icon="arrow-right">
          Reintentar
        </Button>
      )}
    </div>
  );
});
