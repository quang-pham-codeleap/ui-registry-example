import React from 'react';
import IGridProps from '../IGridProps';

/**
 * Define the base Grid component type
 */
type BaseGrid = React.ForwardRefExoticComponent<IGridProps & React.RefAttributes<HTMLDivElement>>;

export default BaseGrid;
