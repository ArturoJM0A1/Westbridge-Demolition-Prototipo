/* ============================================================
   Icon — lucide-react icon wrapper.
   Preserves the app-wide API (name, size, strokeWidth, className).
   Usage: <Icon name="shield" />
   ============================================================ */

import { memo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Blocks,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Compass,
  Construction,
  Crosshair,
  Eye,
  Factory,
  Gem,
  Hammer,
  HardHat,
  Layers,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Play,
  Plus,
  Quote,
  Recycle,
  Route,
  Send,
  Settings,
  ShieldCheck,
  Star,
  Target,
  Truck,
  Users,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-left'
  | 'award'
  | 'badge'
  | 'book'
  | 'building'
  | 'calendar'
  | 'check'
  | 'check-circle'
  | 'chevron-down'
  | 'chevron-right'
  | 'clipboard'
  | 'clock'
  | 'close'
  | 'compass'
  | 'crane'
  | 'crosshair'
  | 'diamond'
  | 'eye'
  | 'factory'
  | 'gear'
  | 'hammer'
  | 'helmet'
  | 'instagram'
  | 'layers'
  | 'leaf'
  | 'linkedin'
  | 'mail'
  | 'map-pin'
  | 'menu'
  | 'minus'
  | 'phone'
  | 'plus'
  | 'quote'
  | 'recycle'
  | 'road'
  | 'send'
  | 'shield'
  | 'star'
  | 'strut'
  | 'target'
  | 'truck'
  | 'users'
  | 'youtube'
  | 'zap';

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

const ICONS: Record<IconName, LucideIcon> = {
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'arrow-left': ArrowLeft,
  award: Award,
  badge: BadgeCheck,
  book: BookOpen,
  building: Building2,
  calendar: CalendarDays,
  check: Check,
  'check-circle': CheckCircle2,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  clipboard: ClipboardList,
  clock: Clock,
  close: X,
  compass: Compass,
  crane: Construction,
  crosshair: Crosshair,
  diamond: Gem,
  eye: Eye,
  factory: Factory,
  gear: Settings,
  hammer: Hammer,
  helmet: HardHat,
  instagram: Camera,
  layers: Layers,
  leaf: Leaf,
  linkedin: Briefcase,
  mail: Mail,
  'map-pin': MapPin,
  menu: Menu,
  minus: Minus,
  phone: Phone,
  plus: Plus,
  quote: Quote,
  recycle: Recycle,
  road: Route,
  send: Send,
  shield: ShieldCheck,
  star: Star,
  strut: Blocks,
  target: Target,
  truck: Truck,
  users: Users,
  youtube: Play,
  zap: Zap,
};

export const Icon = memo(function Icon({
  name,
  size = 24,
  strokeWidth = 1.8,
  className,
  ...rest
}: IconProps) {
  const LucideIconComponent = ICONS[name];
  return (
    <LucideIconComponent
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      {...rest}
    />
  );
});
