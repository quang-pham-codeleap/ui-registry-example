import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import ICodeEditorProps from './ICodeEditorProps';
import { CodeEditorLoader } from './components';
import './monaco-editor.css';
import { cn } from '@/lib';
import { ErrorMessage } from '../error-message';
import { useDragAndDropProvider } from './hooks';

/**
 * CodeEditor component that wraps Monaco Editor with customizable styling and functionality
 *
 * @param props {@link ICodeEditorProps} - The component props
 * @returns The rendered code editor component
 *
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   const [code, setCode] = useState<string>('');
 *
 *   return (
 *     <CodeEditor value={code} onChange={setCode} defaultLanguage="javascript" />
 *   );
 * }
 * ```
 */
const CodeEditor: React.FC<ICodeEditorProps> = ({
  height = '500px',
  defaultLanguage = 'javascript',
  value,
  onChange,
  readOnly = false,
  errorMessage,
  isLoading = false,
  typeScriptDefinitions,
}) => {
  const [disabled, setDisabled] = useState(readOnly);
  /**
   * Reference to the editor instance
   */
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  /**
   * Drag and drop provider instance
   */
  const dragAndDropProvider = useDragAndDropProvider();

  /**
   * Function to get the current theme based on the document's color scheme
   */
  const getCurrentTheme = useCallback(() => {
    return document.documentElement.dataset.colorScheme === 'dark' ? 'vs-dark' : 'light';
  }, []);

  /**
   * Function to update the editor theme based on the current color scheme
   */
  const updateEditorTheme = useCallback(() => {
    if (editorRef.current) {
      const currentTheme = getCurrentTheme();
      editorRef.current.updateOptions({ theme: currentTheme });
    }
  }, [getCurrentTheme]);

  /**
   * Effect to watch for color scheme changes and update the editor theme
   */
  useEffect(() => {
    // Create a MutationObserver to watch for changes to the data-color-scheme attribute
    const observer = new MutationObserver(() => {
      updateEditorTheme();
    });

    // Start observing the document element for data-color-scheme attribute changes
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color-scheme'] });

    // Apply the theme on initial render
    updateEditorTheme();

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [updateEditorTheme]);

  useEffect(() => {
    setDisabled(readOnly);
  }, [readOnly]);

  /**
   * Handles the change event from Monaco Editor
   */
  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      onChange?.(value || '');
    },
    [onChange],
  );

  /**
   * Normalizes the height value to a proper CSS value
   */
  const normalizeHeight = useCallback((height: string | number): string => {
    if (typeof height === 'number') {
      return `${height}px`;
    }

    // If height is already a CSS value (has units), return as is
    if (/^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(height)) {
      return height;
    }

    // Otherwise, assume it's a Tailwind class or return as is
    return height;
  }, []);

  /**
   * Current theme based on document's color scheme
   */
  const initialTheme = useMemo(() => getCurrentTheme(), [getCurrentTheme]);

  /**
   * Handle editor mount to store reference and set up initial theme
   */
  const handleEditorDidMount = useCallback<OnMount>(
    (editor, monaco) => {
      editorRef.current = editor;

      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      });

      // Set TypeScript compiler options
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2015,
        allowNonTsExtensions: true,
      });

      // Add TypeScript definitions if provided
      typeScriptDefinitions?.forEach(definition => {
        const filePath = definition.filePath || 'file:///global.d.ts';

        // Add extra library for IntelliSense
        monaco.languages.typescript.javascriptDefaults.addExtraLib(definition.content, filePath);

        // Check if model already exists before creating new one
        const uri = monaco.Uri.parse(filePath);
        const existingModel = monaco.editor.getModel(uri);

        if (!existingModel) {
          monaco.editor.createModel(definition.content, 'typescript', uri);
        } else {
          // Update existing model with new content
          existingModel.setValue(definition.content);
        }
      });

      // Apply the correct theme immediately after mounting
      setTimeout(() => updateEditorTheme(), 0);

      // Add custom CSS rules for the editor
      const isDarkTheme = document.documentElement.dataset.colorScheme === 'dark';

      // Apply the custom theme
      monaco.editor.setTheme(isDarkTheme ? 'vs-dark' : 'light');

      // Update theme when color scheme changes
      const updateCustomTheme = () => {
        const isDark = document.documentElement.dataset.colorScheme === 'dark';
        monaco.editor.setTheme(isDark ? 'vs-dark' : 'light');
      };

      // Create observer for theme changes
      const themeObserver = new MutationObserver(() => {
        updateCustomTheme();
      });

      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color-scheme'] });

      // Clean up observer when editor is disposed
      editor.onDidDispose(() => {
        themeObserver.disconnect();
      });
    },
    [updateEditorTheme, typeScriptDefinitions],
  );

  return (
    <div className="relative" {...dragAndDropProvider.props}>
      {isLoading && <CodeEditorLoader />}
      <Editor
        height={normalizeHeight(height)}
        className={cn('rounded-[var(--border-radius-md)] py-2 border border-[var(--input)]', !!errorMessage && 'border-[var(--danger-text)]')}
        value={value}
        language={defaultLanguage}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly: disabled,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'monospace',
          lineNumbers: 'on',
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
          },
          automaticLayout: true,
          theme: initialTheme,
          lineNumbersMinChars: 3,
          lineDecorationsWidth: 0,
        }}
        loading={<CodeEditorLoader />}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

CodeEditor.displayName = 'CodeEditor';

export default CodeEditor;
