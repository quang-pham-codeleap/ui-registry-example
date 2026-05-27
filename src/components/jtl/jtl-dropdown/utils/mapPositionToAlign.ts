/**
 * Maps position prop to Radix UI align prop
 * @param position - Position value ('left', 'center', 'right')
 * @returns Corresponding align value for Radix UI
 */
export default function mapPositionToAlign(position: 'left' | 'center' | 'right'): 'start' | 'center' | 'end' {
  const alignMap: Record<'left' | 'center' | 'right', 'start' | 'center' | 'end'> = {
    left: 'start',
    center: 'center',
    right: 'end',
  };

  return alignMap[position];
}
