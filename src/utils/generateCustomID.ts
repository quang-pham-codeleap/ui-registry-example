import hyperid from 'hyperid';
const generateId = hyperid();
export default function generateCustomID(prefix?: string): string {
  const uid = generateId();

  return prefix ? `jtl-${prefix}-${uid}` : `jtl-${uid}`;
}
