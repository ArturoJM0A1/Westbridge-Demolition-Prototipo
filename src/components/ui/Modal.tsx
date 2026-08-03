/* ============================================================
   Modal — accessible overlay dialog with focus + scroll lock.
   ============================================================ */

import { memo, useEffect, useRef } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: number;
}

export const Modal = memo(function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 720,
}: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(open);
  useEscapeKey(onClose, open);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal__backdrop" />
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ maxWidth }}
      >
        <header className="modal__header">
          <h3 id="modal-title" className="modal__title">
            {title}
          </h3>
          <button
            ref={closeButtonRef}
            className="modal__close"
            onClick={onClose}
            aria-label="Cerrar ventana"
          >
            <Icon name="close" size={22} />
          </button>
        </header>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
});
