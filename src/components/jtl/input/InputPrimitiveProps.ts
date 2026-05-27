export interface IBadgeContainerProps {
  text: string;
}

/**
 * InputContainer component for consistent styling
 */
export interface IInputContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the input is in an error state
   */
  error?: boolean;

  /**
   * Whether the input is in a read-only state.
   */
  readOnly?: boolean;

  /**
   * Size of the input component
   */
  size?: 'default' | 'sm';
}

export interface IAffixContainerProps {
  text?: string;
  isSuffix?: boolean;
}
