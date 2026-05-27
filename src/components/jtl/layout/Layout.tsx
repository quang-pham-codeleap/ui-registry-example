import React from 'react';
import { LayoutSection } from '../layout-section';
import ILayoutProps from './ILayoutProps';

/**
 * A layout component that provides consistent spacing and structure for page content
 * Can be used with or without sections, and includes compound components for more complex layouts
 * @param props {@link ILayoutProps} - Props for the Layout component
 * @returns The rendered Layout component
 *
 * @example
 * ```tsx
 * // Default
 * function App() {
 *   return (
 *     <Layout>
 *       ...Your component
 *     </Layout>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Sectioned
 * function AppSectioned() {
 *   return (
 *     <Layout sectioned>
 *       ...Your component
 *     </Layout>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Compound components
 * function AppCompound() {
 *   return (
 *     <Layout>
 *       <LayoutSection>
 *         ...Your component
 *       </LayoutSection>
 *       <AnnotatedSection title="Title" description="Description">
 *         ...Your component
 *       </AnnotatedSection>
 *     </Layout>
 *   )
 * }
 * ```
 */
const Layout: React.FunctionComponent<ILayoutProps> = ({ sectioned, children }: ILayoutProps) => {
  const content = sectioned ? <LayoutSection>{children}</LayoutSection> : children;
  const layoutClassName = 'flex flex-wrap justify-center items-start -mt-4 -ml-4';

  return <div className={layoutClassName}>{content}</div>;
};

Layout.displayName = 'Layout';

export default Layout;
