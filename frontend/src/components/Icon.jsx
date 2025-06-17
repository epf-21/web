import * as Icons from 'lucide-react';

export default function Icon({ name, className = '' }) {
  const LucideIcon = Icons[name];

  return <LucideIcon className={`w-5 h-5 ${className}`} />
}