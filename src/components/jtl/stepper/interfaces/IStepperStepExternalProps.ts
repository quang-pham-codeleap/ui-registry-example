import { IStepperStepProps } from '../components';

interface IStepperStepExternalProps extends Omit<IStepperStepProps, 'count' | 'status' | 'stepperType' | 'onClick' | 'isLastStep' | 'stepperType'> {}

export default IStepperStepExternalProps;
