type FormError = {
  /**
   * Whether the form field has an error
   */
  isError?: boolean;

  /**
   * The error message to display for the form field.
   *
   * @deprecated Use `isError` to indicate an error state and handle error messages separately in your component logic. This property may be removed in future versions.
   */
  errorMessage?: string;
};

export default FormError;
