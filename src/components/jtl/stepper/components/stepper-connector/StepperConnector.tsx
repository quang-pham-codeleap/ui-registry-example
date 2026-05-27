import React from 'react';
import { Separator } from '../../../separator';
import IStepperConnectorProps from './IStepperConnectorProps';
import { Box } from '../../../box';

/**
 * Renders the connector line between steps
 */
const StepperConnector: React.FC<IStepperConnectorProps> = ({ className, isVertical }) => (
  <Box className={className}>
    <Separator orientation={isVertical ? 'vertical' : 'horizontal'} />
  </Box>
);

export default StepperConnector;
