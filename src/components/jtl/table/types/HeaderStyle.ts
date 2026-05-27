import TableContext from './TableStyle';

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type HeaderStyle = Partial<UnionToIntersection<TableContext[keyof TableContext]>>;

export default HeaderStyle;
