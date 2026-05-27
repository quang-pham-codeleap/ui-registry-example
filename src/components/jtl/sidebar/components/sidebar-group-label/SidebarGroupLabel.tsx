import type React from 'react';
import type ISidebarGroupLabelProps from './ISidebarGroupLabelProps';
import { Text } from '../../../text';

/**
 * Group title text displayed in the group header.
 */
const SidebarGroupLabel: React.FC<ISidebarGroupLabelProps> = ({ children }) => (
  <Text truncate type="small">
    {children}
  </Text>
);

SidebarGroupLabel.displayName = 'SidebarGroupLabel';

export default SidebarGroupLabel;
