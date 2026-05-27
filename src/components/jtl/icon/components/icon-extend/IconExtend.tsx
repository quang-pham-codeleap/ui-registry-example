import { Icon } from '../..';
import type { LucideIconName } from '../..';
import type IIconExtendProps from './IIconExtendProps';

/**
 * IconExtend component
 * @param props {@link IIconExtendProps} - The component props
 * @returns The rendered icon component
 */
const IconExtend = ({ icon, size }: IIconExtendProps) => {
  if (typeof icon === 'string') {
    return <Icon name={icon as LucideIconName} size={size} />;
  }
  return icon;
};

export default IconExtend;
