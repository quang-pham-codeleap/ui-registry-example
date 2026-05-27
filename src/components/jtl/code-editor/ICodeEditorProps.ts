import { FormError } from '@/types';
import { SupportLanguage, TypeScriptDefinition } from './types';

/**
 * Interface for CodeEditor component props
 */
export default interface ICodeEditorProps extends FormError {
  /**
   * If true, the editor is in loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * Defines the height of the editor (can accept value like 500 for 500px, '20rem', '500px', '50%', '10vh' or css class name from tailwind)
   * @default '500px'
   */
  height?: string | number;

  /**
   * Sets the initial language for syntax highlighting
   * @default 'javascript'
   */
  defaultLanguage?: SupportLanguage;

  /**
   * The code/text content to display in the editor
   */
  value?: string;

  /**
   * Callback function triggered when the editor's content changes
   */
  onChange?: (value: string) => void;

  /**
   * If true, the editor content cannot be modified
   * @default false
   */
  readOnly?: boolean;

  /**
   * Array of TypeScript definitions to add to the Monaco Editor for better IntelliSense
   * Only applies when defaultLanguage is 'typescript' or 'javascript'
   *
   * @example
   * ```tsx
   * const definitions = [
   *   {
   *     content: `
   *       declare global {
   *         interface Window {
   *           myCustomAPI: {
   *             doSomething: (param: string) => void;
   *           };
   *         }
   *       }
   *     `,
   *     filePath: 'file:///my-custom-types.d.ts'
   *   }
   * ];
   *
   * <CodeEditor
   *   defaultLanguage="typescript"
   *   typeScriptDefinitions={definitions}
   * />
   * ```
   */
  typeScriptDefinitions?: TypeScriptDefinition[];
}
