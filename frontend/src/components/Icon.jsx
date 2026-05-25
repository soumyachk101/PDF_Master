'use client';

import { memo, useMemo } from 'react';
import { getIcon } from '../utils/icons';

/**
 * Dynamic Icon Component
 * Renders a lucide-react icon by name with customizable props
 */
const DynamicIcon = memo(function DynamicIcon({ name, color, size = 24, className = "" }) {
  const Icon = useMemo(() => getIcon(name), [name]);
  if (!Icon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <Icon size={size} color={color} className={className} />;
});

export default DynamicIcon;
