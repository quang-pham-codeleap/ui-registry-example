import { CommandGroup } from '../../command/types';

type ComboBoxGroup = Omit<CommandGroup, 'heading'> & {
  heading?: string;
};

export default ComboBoxGroup;
