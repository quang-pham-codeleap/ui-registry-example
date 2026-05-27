import React from 'react';
import IJTLDropdownMenuIconProps from './IJTLDropdownMenuIconProps';
import { IconExtend } from '../../../icon/components';

/**
 * Renders an icon based on the provided icon prop
 * @param icon - Icon name or emoji
 * @returns Rendered icon component or null
 */
const JTLDropdownMenuIcon: React.FC<IJTLDropdownMenuIconProps> = ({ icon }) => {
  if (!icon) return null;

  // Handle Lucide icons
  return <IconExtend icon={icon} size={16} />;
};

JTLDropdownMenuIcon.displayName = 'JTLDropdownMenuIcon';

export default JTLDropdownMenuIcon;
