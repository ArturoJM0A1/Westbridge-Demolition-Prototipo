/* ============================================================
   Banner — dismissible/static callout for notices & errors.
   ============================================================ */

import { memo, useState } from 'react';
import { Icon, type IconName } from '@/components/ui/Icon';

type BannerTone = 'info' | 'success' | 'warning' | 'error';

interface BannerProps {
  tone?: BannerTone;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const TONE_ICON: Record<BannerTone, IconName> = {
  info: 'shield',
  success: 'check-circle',
  warning: 'zap',
  error: 'close',
};

export const Banner = memo(function Banner({
  tone = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className={`banner banner--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <span className="banner__icon" aria-hidden="true">
        <Icon name={TONE_ICON[tone]} size={20} />
      </span>
      <div className="banner__content">
        {title && <p className="banner__title">{title}</p>}
        <div className="banner__body">{children}</div>
      </div>
      {dismissible && (
        <button className="banner__dismiss" onClick={dismiss} aria-label="Descartar aviso">
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  );
});
