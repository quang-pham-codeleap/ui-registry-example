# Copilot Instructions

## Component Library Preference

**Always prefer JTL components** over raw shadcn/ui primitives. Only fall back to shadcn components if no applicable JTL component exists.

JTL components live in `src/components/jtl/` and are imported from their respective subdirectory index, e.g.:

```ts
import { Button } from "@/components/jtl/button";
import { Text } from "@/components/jtl/text";
import { Box } from "@/components/jtl/box";
```

### Available JTL Components

accordion, alert, alert-dialog, annotated-section, app-header, avatar, badge, box, breadcrumb, button, button-group, calendar, card, chart, checkbox, code-editor, collapsible, color-picker, combo-box, command, context-menu, data-table, date-picker, date-range-picker, dialog, dropdown, error-message, field, field-array, file-upload, form, form-group, grid, html-editor, icon, input, input-group, input-otp, jtl-dropdown, jtl-logo, label, layout, layout-section, link, pagination, popover, progress, radio, scroll-area, select, separator, sheet, sidebar, skeleton, stack, stepper, stepper-layout, styled-icon, switch, tab, table, tag, text, textarea, toggle, toggle-group, tooltip

### Import Path Rules

- All JTL component imports use `@/components/jtl/<component-name>` (not `@/components/<component-name>`)
- Utility imports: `@/lib/utils`
- Hook imports: `@/hooks`

### Known Patterns & Gotchas

- **Labels + Inputs**: The `label` prop on `Input` is deprecated. Use explicit composition: `<Label variant="field" htmlFor="...">` + `<Input id="...">`, or use the `Field` component.
- **Field component**: Requires `Grid` to be present. Generated field files may contain wrong aliases — adjust any `@/components/label` → `@/components/jtl/label`.
- **Sidebar**: Auto-generated imports like `@/components/text` or `@/components/tooltip` must be corrected to `@/components/jtl/text` and `@/components/jtl/tooltip`.
- **Stack / Box / Grid**: Use these JTL layout primitives instead of raw `div` with Tailwind flex/grid classes wherever possible.
- **Text**: Use `<Text>` instead of `<p>`, `<span>`, `<h1>`–`<h6>` etc. Pass the appropriate `variant` prop.
- **Icon**: Use `<Icon>` from `@/components/jtl/icon` for all icons.

### When to Use shadcn

Only use a shadcn component (from `@/components/ui/`) if the required UI pattern has no JTL equivalent listed above.

## Adding & Selecting Components

**Use the shadcn MCP server to discover and inspect components, then use the shadcn CLI to manage them:**

1. **Discovery & Inspection** (use MCP tools):
   - Use `mcp_shadcn_search_items_in_registries` to find available components (JTL registry first, then shadcn default).
   - Use `mcp_shadcn_view_items_in_registries` to inspect component details before adding.
   - Use `mcp_shadcn_list_items_in_registries` to browse all available items in the configured registries.
   - Use `mcp_shadcn_get_project_registries` to check which registries are configured for this project.

2. **Installation & Management** (use shadcn CLI):
   - Use `mcp_shadcn_get_add_command_for_items` to get the correct `npx shadcn add` command.
   - Execute the command via terminal to install components into the project.
   - Use the shadcn CLI for all component management operations.

When searching for a component, always query the JTL registry first. Only fall back to the default shadcn registry if no matching JTL component is found.
