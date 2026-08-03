/* ============================================================
   Button — polymorphic (button / router link / anchor) control.
   ============================================================ */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Icon, type IconName } from '@/components/ui/Icon';

type Variant = 'primary' | 'accent' | 'outline' | 'outline-light' | 'ghost' | 'ghost-light';
type Size = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

type ButtonNativeProps = {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = {
  as: 'link';
  to: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

type ButtonAnchorProps = {
  as: 'a';
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = ButtonBaseProps & (ButtonNativeProps | ButtonLinkProps | ButtonAnchorProps);

const baseStyles = 'btn';

export const Button = memo(function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [
    baseStyles,
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <Icon name={icon} size={18} />}
    </>
  );

  if (rest.as === 'link') {
    const { as: _as, to, ...linkProps } = rest;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  if (rest.as === 'a') {
    const { as: _as, href, ...anchorProps } = rest;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { as: _as, type = 'button', ...buttonProps } = rest;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
});
