/**
 * TypeScript definition entry for Monaco Editor
 */
type TypeScriptDefinition = {
  /**
   * Content of the TypeScript definition (d.ts file content)
   */
  content: string;
  /**
   * File path/name for the definition (e.g., 'file:///node_modules/@types/mylib/index.d.ts')
   * @default 'global.d.ts'
   */
  filePath?: string;
};

export default TypeScriptDefinition;
