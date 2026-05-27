import ResponsiveConfig from './ResponsiveConfig';

// NOTE: Order is important here: smallest -> largest
// Exporting as const means it will be typed as a Tuple instead of string[]
export const breakpointsAliases = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

// Convert the Tuple to a union
type BreakpointsAlias = (typeof breakpointsAliases)[number];
type ResponsiveProp = {
  [Breakpoint in BreakpointsAlias]?: ResponsiveConfig;
};

export default ResponsiveProp;
