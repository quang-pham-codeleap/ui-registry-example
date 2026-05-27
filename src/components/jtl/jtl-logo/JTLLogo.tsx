import React from 'react';
import IJTLLogoProps from './IJTLLogoProps';

/**
 * JTL Brand Logo
 * * The official SVG logo for JTL, supporting three standardized size variants.
 * @param {IJTLLogoProps} props - Component properties.
 * @returns {JSX.Element} The rendered SVG logo.
 * @example
 * ```tsx
 * // Renders the standard variant (54x40)
 * <JTLLogo />
 * * // Renders the small variant (48x36)
 * <JTLLogo size="small" />
 * ```
 */
const JTLLogo: React.FC<IJTLLogoProps> = ({ size = 'default' }) => {
  const sizeMap = {
    large: {
      width: 75,
      height: 56,
    },
    default: {
      width: 54,
      height: 40,
    },
    small: {
      width: 48,
      height: 36,
    },
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={sizeMap[size].width} height={sizeMap[size].height} viewBox="0 0 76 56" fill="none">
      <g clipPath="url(#clip0_9073_195631)">
        <path
          d="M67.5004 0H7.68666C3.43825 0 0 3.43825 0 7.68666V48.3133C0 52.5618 3.43825 56 7.68666 56H67.5102C71.7586 56 75.1969 52.5618 75.1969 48.3133V7.68666C75.187 3.43825 71.7488 0 67.5004 0ZM29.1362 40.6168C29.1362 44.3811 28.3458 46.7523 26.7848 47.6909C25.7177 48.3331 23.139 48.6493 19.108 48.6493C15.808 48.6493 13.6443 48.1355 12.686 47.1277C11.7276 46.1101 11.2336 43.9266 11.2336 40.6168V31.9125H18.94V40.0635C18.94 41.8123 19.6316 42.1778 20.2145 42.1778C20.6888 42.1778 21.2717 41.9308 21.3903 40.7255V9.17855H29.1362V40.6168ZM46.7227 15.4227H42.8497V48.4912H35.0939V15.4227H31.2209V9.17855H46.7325V15.4227H46.7227ZM61.7502 48.4912H49.3507V9.17855H57.0473V42.0198H61.7601V48.4912H61.7502Z"
          fill={'var(--shaftblue)'}
        />
        <path
          d="M29.1362 40.6168C29.1362 44.3811 28.3458 46.7523 26.7847 47.6909C25.7177 48.3331 23.139 48.6492 19.108 48.6492C15.808 48.6492 13.6443 48.1355 12.6859 47.1277C11.7276 46.1101 11.2336 43.9266 11.2336 40.6168V31.9125H18.94V40.0635C18.94 41.8123 19.6316 42.1778 20.2145 42.1778C20.6888 42.1778 21.2717 41.9308 21.3903 40.7255V9.17853H29.1362V40.6168ZM46.7226 15.4227H42.8497V48.4912H35.0938V15.4227H31.2209V9.17853H46.7325V15.4227H46.7226ZM61.7502 48.4912H49.3507V9.17853H57.0473V42.0197H61.76V48.4912H61.7502Z"
          fill={'var(--logo-white)'}
        />
      </g>
      <defs>
        <clipPath id="clip0_9073_195631">
          <rect width="75.1969" height="56" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

JTLLogo.displayName = 'JTLLogo';

export default JTLLogo;
