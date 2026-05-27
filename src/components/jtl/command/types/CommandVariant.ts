import { COMMAND_VARIANT } from '../constants';

type CommandVariant = (typeof COMMAND_VARIANT)[keyof typeof COMMAND_VARIANT];

export default CommandVariant;
