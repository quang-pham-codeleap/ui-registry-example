import { createContext } from 'react';
import { TableStyle } from '../types';

const tableContext = createContext<Partial<TableStyle>>({});

export default tableContext;
