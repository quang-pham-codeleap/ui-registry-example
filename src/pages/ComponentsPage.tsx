import { type ReactNode, useMemo, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { useForm } from 'react-hook-form'
import { AnnotatedSection } from '@/components/jtl/annotated-section'
import { AppHeader } from '@/components/jtl/app-header'
import { Accordion, AccordionItem } from '@/components/jtl/accordion'
import { Alert } from '@/components/jtl/alert'
import { AlertDialog as JTLAlertDialog } from '@/components/jtl/alert-dialog'
import { Avatar as JTLAvatar } from '@/components/jtl/avatar'
import { Badge as JTLBadge } from '@/components/jtl/badge'
import { Box } from '@/components/jtl/box'
import { Breadcrumb as JTLBreadcrumb } from '@/components/jtl/breadcrumb'
import { Button as JTLButton } from '@/components/jtl/button'
import { ButtonGroup as JTLButtonGroup } from '@/components/jtl/button-group'
import { Calendar as JTLCalendar } from '@/components/jtl/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/jtl/card'
import { Chart as JTLChart, ChartVariant } from '@/components/jtl/chart'
import { Checkbox as JTLCheckbox } from '@/components/jtl/checkbox'
import { Collapsible as JTLCollapsible } from '@/components/jtl/collapsible'
import { CodeEditor as JTLCodeEditor } from '@/components/jtl/code-editor'
import { ColorPicker as JTLColorPicker } from '@/components/jtl/color-picker'
import { ComboBox as JTLComboBox } from '@/components/jtl/combo-box'
import { Command as JTLCommand } from '@/components/jtl/command'
import { ContextMenu as JTLContextMenu } from '@/components/jtl/context-menu'
import { DataTable as JTLDataTable } from '@/components/jtl/data-table'
import { DateRangePicker as JTLDateRangePicker } from '@/components/jtl/date-range-picker'
import {
  DropdownMenu as JTLDropdownMenu,
  DropdownMenuContent as JTLDropdownMenuContent,
  DropdownMenuItem as JTLDropdownMenuItem,
  DropdownMenuLabel as JTLDropdownMenuLabel,
  DropdownMenuSeparator as JTLDropdownMenuSeparator,
  DropdownMenuTrigger as JTLDropdownMenuTrigger,
} from '@/components/jtl/dropdown'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/jtl/dialog'
import { DatePicker as JTLDatePicker } from '@/components/jtl/date-picker'
import { FieldArray } from '@/components/jtl/field-array'
import { Field, FieldControl, FieldDescription, FieldLabel } from '@/components/jtl/field'
import { FileUpload as JTLFileUpload } from '@/components/jtl/file-upload'
import { Form as JTLForm } from '@/components/jtl/form'
import { FormGroup as JTLFormGroup } from '@/components/jtl/form-group'
import { Grid as JTLGrid } from '@/components/jtl/grid'
import { HtmlEditor as JTLHtmlEditor } from '@/components/jtl/html-editor'
import { Input as JTLInput } from '@/components/jtl/input'
import {
  InputGroup as JTLInputGroup,
  InputGroupAddon as JTLInputGroupAddon,
  InputGroupInput as JTLInputGroupInput,
  InputGroupText as JTLInputGroupText,
} from '@/components/jtl/input-group'
import { InputOTP as JTLInputOTP } from '@/components/jtl/input-otp'
import { Icon } from '@/components/jtl/icon'
import { Kbd as JTLKbd, KbdGroup as JTLKbdGroup } from '@/components/jtl/kbd'
import { Label } from '@/components/jtl/label'
import { Layout as JTLLayout } from '@/components/jtl/layout'
import { LayoutSection as JTLLayoutSection } from '@/components/jtl/layout-section'
import { Pagination as JTLPagination } from '@/components/jtl/pagination'
import { Popover as JTLPopover, PopoverContent as JTLPopoverContent, PopoverTrigger as JTLPopoverTrigger } from '@/components/jtl/popover'
import { Progress as JTLProgress } from '@/components/jtl/progress'
import { Radio as JTLRadio } from '@/components/jtl/radio'
import { ScrollArea as JTLScrollArea } from '@/components/jtl/scroll-area'
import { Select as JTLSelect } from '@/components/jtl/select'
import { Separator as JTLSeparator } from '@/components/jtl/separator'
import {
  Sheet as JTLSheet,
  SheetBody as JTLSheetBody,
  SheetContent as JTLSheetContent,
  SheetDescription as JTLSheetDescription,
  SheetHeader as JTLSheetHeader,
  SheetTitle as JTLSheetTitle,
  SheetTrigger as JTLSheetTrigger,
} from '@/components/jtl/sheet'
import {
  Sidebar as JTLSidebar,
  SidebarGroup as JTLSidebarGroup,
  SidebarHeader as JTLSidebarHeader,
  SidebarItem as JTLSidebarItem,
  SidebarItemIcon as JTLSidebarItemIcon,
  SidebarToggle as JTLSidebarToggle,
} from '@/components/jtl/sidebar'
import { Skeleton as JTLSkeleton } from '@/components/jtl/skeleton'
import { Stack as JTLStack } from '@/components/jtl/stack'
import { Stepper as JTLStepper, StepperStep as JTLStepperStep } from '@/components/jtl/stepper'
import StepperLayout from '@/components/jtl/stepper-layout'
import { StyledIcon as JTLStyledIcon } from '@/components/jtl/styled-icon'
import { Switch as JTLSwitch } from '@/components/jtl/switch'
import { Tab as JTLTab } from '@/components/jtl/tab'
import { Table as JTLTable } from '@/components/jtl/table'
import type { ITableColumnProps } from '@/components/jtl/table'
import { Tag as JTLTag } from '@/components/jtl/tag'
import { Text } from '@/components/jtl/text'
import { Textarea as JTLTextarea } from '@/components/jtl/textarea'
import { Toggle as JTLToggle } from '@/components/jtl/toggle'
import { ToggleGroup as JTLToggleGroup, ToggleGroupItem as JTLToggleGroupItem } from '@/components/jtl/toggle-group'
import { Tooltip as JTLTooltip } from '@/components/jtl/tooltip'
import { Accordion as UIAccordion, AccordionContent as UIAccordionContent, AccordionItem as UIAccordionItem, AccordionTrigger as UIAccordionTrigger } from '@/components/ui/accordion'
import {
  AlertDialog as UIAlertDialog,
  AlertDialogAction as UIAlertDialogAction,
  AlertDialogCancel as UIAlertDialogCancel,
  AlertDialogContent as UIAlertDialogContent,
  AlertDialogDescription as UIAlertDialogDescription,
  AlertDialogFooter as UIAlertDialogFooter,
  AlertDialogHeader as UIAlertDialogHeader,
  AlertDialogTitle as UIAlertDialogTitle,
  AlertDialogTrigger as UIAlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Alert as UIAlert, AlertDescription as UIAlertDescription, AlertTitle as UIAlertTitle } from '@/components/ui/alert'
import { Avatar as UIAvatar, AvatarFallback as UIAvatarFallback, AvatarImage as UIAvatarImage } from '@/components/ui/avatar'
import { Badge as UIBadge } from '@/components/ui/badge'
import {
  Breadcrumb as UIBreadcrumb,
  BreadcrumbItem as UIBreadcrumbItem,
  BreadcrumbLink as UIBreadcrumbLink,
  BreadcrumbList as UIBreadcrumbList,
  BreadcrumbPage as UIBreadcrumbPage,
  BreadcrumbSeparator as UIBreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button as UIButton } from '@/components/ui/button'
import { Calendar as UICalendar } from '@/components/ui/calendar'
import { Card as UICard, CardDescription as UICardDescription, CardHeader as UICardHeader, CardTitle as UICardTitle } from '@/components/ui/card'
import { ChartContainer as UIChartContainer, ChartTooltip as UIChartTooltip, ChartTooltipContent as UIChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig as UIChartConfig } from '@/components/ui/chart'
import { Checkbox as UICheckbox } from '@/components/ui/checkbox'
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from '@/components/ui/combobox'
import { Collapsible as UICollapsible, CollapsibleContent as UICollapsibleContent, CollapsibleTrigger as UICollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Command as UICommand,
  CommandEmpty as UICommandEmpty,
  CommandGroup as UICommandGroup,
  CommandInput as UICommandInput,
  CommandItem as UICommandItem,
  CommandList as UICommandList,
} from '@/components/ui/command'
import { Dialog as UIDialog, DialogContent as UIDialogContent, DialogDescription as UIDialogDescription, DialogHeader as UIDialogHeader, DialogTitle as UIDialogTitle, DialogTrigger as UIDialogTrigger } from '@/components/ui/dialog'
import {
  ContextMenu as UIContextMenu,
  ContextMenuContent as UIContextMenuContent,
  ContextMenuItem as UIContextMenuItem,
  ContextMenuLabel as UIContextMenuLabel,
  ContextMenuSeparator as UIContextMenuSeparator,
  ContextMenuTrigger as UIContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  DropdownMenu as UIDropdownMenu,
  DropdownMenuContent as UIDropdownMenuContent,
  DropdownMenuItem as UIDropdownMenuItem,
  DropdownMenuLabel as UIDropdownMenuLabel,
  DropdownMenuSeparator as UIDropdownMenuSeparator,
  DropdownMenuTrigger as UIDropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input as UIInput } from '@/components/ui/input'
import {
  InputGroup as UIInputGroup,
  InputGroupAddon as UIInputGroupAddon,
  InputGroupInput as UIInputGroupInput,
  InputGroupText as UIInputGroupText,
} from '@/components/ui/input-group'
import { InputOTP as UIInputOTP, InputOTPGroup as UIInputOTPGroup, InputOTPSlot as UIInputOTPSlot } from '@/components/ui/input-otp'
import { Kbd as UIKbd, KbdGroup as UIKbdGroup } from '@/components/ui/kbd'
import { Label as UILabel } from '@/components/ui/label'
import {
  Pagination as UIPagination,
  PaginationContent as UIPaginationContent,
  PaginationItem as UIPaginationItem,
  PaginationLink as UIPaginationLink,
  PaginationNext as UIPaginationNext,
  PaginationPrevious as UIPaginationPrevious,
} from '@/components/ui/pagination'
import { Popover as UIPopover, PopoverContent as UIPopoverContent, PopoverTrigger as UIPopoverTrigger } from '@/components/ui/popover'
import { Progress as UIProgress } from '@/components/ui/progress'
import { RadioGroup as UIRadioGroup, RadioGroupItem as UIRadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea as UIScrollArea } from '@/components/ui/scroll-area'
import { Select as UISelect, SelectContent as UISelectContent, SelectItem as UISelectItem, SelectTrigger as UISelectTrigger, SelectValue as UISelectValue } from '@/components/ui/select'
import { Separator as UISeparator } from '@/components/ui/separator'
import {
  Sheet as UISheet,
  SheetContent as UISheetContent,
  SheetDescription as UISheetDescription,
  SheetHeader as UISheetHeader,
  SheetTitle as UISheetTitle,
  SheetTrigger as UISheetTrigger,
} from '@/components/ui/sheet'
import {
  Sidebar as UISidebar,
  SidebarContent as UISidebarContent,
  SidebarGroup as UISidebarGroup,
  SidebarGroupLabel as UISidebarGroupLabel,
  SidebarHeader as UISidebarHeader,
  SidebarInset as UISidebarInset,
  SidebarMenu as UISidebarMenu,
  SidebarMenuButton as UISidebarMenuButton,
  SidebarMenuItem as UISidebarMenuItem,
  SidebarProvider as UISidebarProvider,
} from '@/components/ui/sidebar'
import { Skeleton as UISkeleton } from '@/components/ui/skeleton'
import { Switch as UISwitch } from '@/components/ui/switch'
import { Table as UITable, TableBody as UITableBody, TableCell as UITableCell, TableHead as UITableHead, TableHeader as UITableHeader, TableRow as UITableRow } from '@/components/ui/table'
import { Tabs as UITabs, TabsContent as UITabsContent, TabsList as UITabsList, TabsTrigger as UITabsTrigger } from '@/components/ui/tabs'
import { Textarea as UITextarea } from '@/components/ui/textarea'
import { Toggle as UIToggle } from '@/components/ui/toggle'
import { ToggleGroup as UIToggleGroup, ToggleGroupItem as UIToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip as UITooltip, TooltipContent as UITooltipContent, TooltipProvider as UITooltipProvider, TooltipTrigger as UITooltipTrigger } from '@/components/ui/tooltip'

const jtlComponentInventory = [
  'accordion', 'alert', 'alert-dialog', 'annotated-section', 'app-header', 'avatar', 'badge', 'box', 'breadcrumb',
  'button', 'button-group', 'calendar', 'card', 'chart', 'checkbox', 'code-editor', 'collapsible', 'color-picker',
  'combo-box', 'command', 'context-menu', 'data-table', 'date-picker', 'date-range-picker', 'dialog', 'dropdown',
  'error-message', 'field', 'field-array', 'file-upload', 'form', 'form-group', 'grid', 'html-editor', 'icon',
  'input', 'input-group', 'input-otp', 'jtl-dropdown', 'jtl-logo', 'kbd', 'label', 'layout', 'layout-section',
  'link', 'pagination', 'popover', 'progress', 'radio', 'scroll-area', 'select', 'separator', 'sheet', 'sidebar',
  'simple-input', 'skeleton', 'stack', 'stepper', 'stepper-layout', 'styled-icon', 'switch', 'tab', 'table',
  'tag', 'text', 'textarea', 'toggle', 'toggle-group', 'tooltip',
]

const showcasedCounterparts = [
  'accordion', 'alert', 'alert-dialog', 'avatar', 'badge', 'breadcrumb', 'button', 'calendar', 'card', 'checkbox',
  'collapsible', 'combobox', 'command', 'dialog', 'dropdown-menu', 'input', 'input-group', 'input-otp', 'kbd',
  'label', 'pagination', 'popover', 'progress', 'radio-group', 'scroll-area', 'select', 'separator', 'sheet',
  'skeleton', 'switch', 'table', 'tabs', 'textarea', 'toggle', 'toggle-group', 'tooltip',
  'chart', 'context-menu', 'data-table', 'date-picker', 'sidebar',
]

const warehouseOptions = [
  { label: 'Berlin Warehouse', value: 'berlin' },
  { label: 'Hamburg Hub', value: 'hamburg' },
  { label: 'Munich Dispatch', value: 'munich' },
]

const breadcrumbItems = [
  { label: 'Home', route: '#' },
  { label: 'Warehouse', route: '#' },
  { label: 'Components', route: '#' },
]

const tableRows = [
  { id: 'SKU-1001', stock: 140, location: 'A-01' },
  { id: 'SKU-1002', stock: 52, location: 'B-08' },
]

const tableColumns: ITableColumnProps<(typeof tableRows)[number]>[] = [
  { title: 'SKU', key: 'id', dataIndex: 'id' },
  { title: 'Stock', key: 'stock', dataIndex: 'stock' },
  { title: 'Location', key: 'location', dataIndex: 'location' },
]

interface DemoWizardForm {
  orderRef: string
  items: { name: string }[]
}

interface DemoChartPoint {
  date: string
  orders: number
  pickingAccuracy: number
}

const demoChartData: DemoChartPoint[] = [
  { date: '2026-05-13', orders: 141, pickingAccuracy: 97.1 },
  { date: '2026-05-14', orders: 146, pickingAccuracy: 97.3 },
  { date: '2026-05-15', orders: 152, pickingAccuracy: 97.6 },
  { date: '2026-05-16', orders: 149, pickingAccuracy: 97.4 },
]

const demoChartConfig = {
  orders: { label: 'Orders', color: 'var(--chart-1)' },
  pickingAccuracy: { label: 'Picking Accuracy', color: 'var(--chart-3)' },
}

const shadcnChartConfig = {
  orders: {
    label: 'Orders',
    color: 'var(--chart-2)',
  },
} satisfies UIChartConfig

const commandGroups = [
  {
    heading: 'Actions',
    items: [
      { label: 'Create Shipment', value: 'create-shipment' },
      { label: 'Print Labels', value: 'print-labels' },
    ],
  },
  {
    heading: 'Views',
    items: [
      { label: 'Orders Dashboard', value: 'orders-dashboard' },
      { label: 'Warehouse Settings', value: 'warehouse-settings' },
    ],
  },
]

const jtlComboItems = [
  {
    heading: 'Warehouses',
    items: [
      { label: 'Berlin Warehouse', value: 'berlin' },
      { label: 'Hamburg Hub', value: 'hamburg' },
      { label: 'Munich Dispatch', value: 'munich' },
    ],
  },
]

const uiComboItems = [
  { label: 'Berlin Warehouse', value: 'berlin' },
  { label: 'Hamburg Hub', value: 'hamburg' },
  { label: 'Munich Dispatch', value: 'munich' },
]

const componentSectionTargets: Record<string, string> = {
  accordion: 'accordions',
  alert: 'alerts',
  'alert-dialog': 'alert-dialogs',
  avatar: 'avatars',
  badge: 'badges',
  breadcrumb: 'breadcrumbs',
  button: 'buttons',
  'button-group': 'button-group',
  calendar: 'calendars',
  card: 'cards',
  checkbox: 'checkboxes',
  collapsible: 'collapsibles',
  'color-picker': 'color-picker',
  'combo-box': 'combobox',
  combobox: 'combobox',
  command: 'command',
  'date-picker': 'date-picker',
  dialog: 'dialogs',
  dropdown: 'dropdown-menus',
  'dropdown-menu': 'dropdown-menus',
  field: 'field',
  'form-group': 'form-group',
  icon: 'icon',
  input: 'inputs',
  'input-group': 'input-groups',
  'input-otp': 'input-otp',
  kbd: 'keyboard-hints',
  label: 'labels',
  pagination: 'pagination',
  popover: 'popovers',
  progress: 'progress',
  radio: 'radio-groups',
  'radio-group': 'radio-groups',
  'scroll-area': 'scroll-areas',
  select: 'selects',
  separator: 'separators',
  sheet: 'sheets',
  skeleton: 'skeletons',
  switch: 'switches',
  tab: 'tabs',
  tabs: 'tabs',
  table: 'tables',
  tag: 'tag',
  textarea: 'textareas',
  toggle: 'toggles',
  'toggle-group': 'toggle-groups',
  tooltip: 'tooltips',
  'annotated-section': 'annotated-section',
  'app-header': 'app-header',
  box: 'box',
  chart: 'chart',
  'code-editor': 'code-editor',
  'context-menu': 'context-menu',
  'data-table': 'data-table',
  'date-range-picker': 'date-range-picker',
  'field-array': 'field-array',
  'file-upload': 'file-upload',
  form: 'form',
  grid: 'grid',
  'html-editor': 'html-editor',
  'jtl-logo': 'jtl-logo',
  layout: 'layout',
  'layout-section': 'layout-section',
  link: 'link',
  sidebar: 'sidebar',
  stack: 'stack',
  stepper: 'stepper',
  'stepper-layout': 'stepper-layout',
  'styled-icon': 'styled-icon',
  text: 'text',
}

const getTargetSectionId = (name: string) => componentSectionTargets[name] ?? 'coverage-notes'

function ComponentColumns({ jtl, shadcn }: { jtl: ReactNode; shadcn: ReactNode }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-[var(--border-radius-lg)] border border-border bg-card p-4">
        <Box className="mb-3">
          <Text type="small" color="muted">JTL components</Text>
        </Box>
        {jtl}
      </div>
      <div className="rounded-[var(--border-radius-lg)] border border-border bg-card p-4">
        <Box className="mb-3">
          <Text type="small" color="muted">shadcn counterparts</Text>
        </Box>
        {shadcn}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const sectionId = title.toLowerCase().replace(/\s+/g, '-')

  return (
    <section id={sectionId} className="scroll-mt-24 space-y-4">
      <Text type="h3" weight="semibold">{title}</Text>
      <JTLSeparator />
      {children}
    </section>
  )
}

export default function ComponentsPage() {
  const [jtlInputValue, setJtlInputValue] = useState('SO-12654')
  const [uiInputValue, setUiInputValue] = useState('SO-12654')
  const [jtlChecked, setJtlChecked] = useState(true)
  const [uiChecked, setUiChecked] = useState(true)
  const [jtlTextareaValue, setJtlTextareaValue] = useState('Pack with extra corner protection and mark as fragile.')
  const [uiTextareaValue, setUiTextareaValue] = useState('Pack with extra corner protection and mark as fragile.')
  const [jtlSwitchValue, setJtlSwitchValue] = useState(true)
  const [uiSwitchValue, setUiSwitchValue] = useState(true)
  const [jtlSelectValue, setJtlSelectValue] = useState('berlin')
  const [uiSelectValue, setUiSelectValue] = useState('berlin')
  const [jtlDate, setJtlDate] = useState<Date | undefined>(new Date())
  const [jtlColor, setJtlColor] = useState('#2563eb')
  const [jtlComboValue, setJtlComboValue] = useState('berlin')
  const [uiComboValue, setUiComboValue] = useState('berlin')
  const [jtlAlertOpen, setJtlAlertOpen] = useState(false)
  const [jtlOtp, setJtlOtp] = useState('')
  const [uiOtp, setUiOtp] = useState('')
  const [jtlPage, setJtlPage] = useState(2)
  const [jtlTab, setJtlTab] = useState('operations')
  const [uiCalendarDate, setUiCalendarDate] = useState<Date | undefined>(new Date())
  const [jtlCalendarDate, setJtlCalendarDate] = useState<Date | undefined>(new Date())
  const [jtlDateRange, setJtlDateRange] = useState<DateRange | undefined>({
    from: new Date('2026-05-13'),
    to: new Date('2026-05-15'),
  })
  const [jtlCodeValue, setJtlCodeValue] = useState('const shipment = { id: "SO-12831", status: "packed" }')
  const [jtlHtmlValue, setJtlHtmlValue] = useState('<p><strong>Warehouse note:</strong> Keep aisle B clear for inbound pallets.</p>')
  const [jtlStepperActive, setJtlStepperActive] = useState(1)
  const [jtlWizardStep, setJtlWizardStep] = useState(0)
  const [uiDataTableQuery, setUiDataTableQuery] = useState('')
  const [uiDateRange, setUiDateRange] = useState<DateRange | undefined>()

  const jtlForm = useForm<DemoWizardForm>({
    defaultValues: {
      orderRef: 'SO-12654',
      items: [{ name: 'Carton 1' }],
    },
  })

  const stockScrollItems = useMemo(
    () => Array.from({ length: 18 }, (_, i) => `Inbound pallet ${i + 1}`),
    [],
  )

  const filteredTableRows = useMemo(
    () => tableRows.filter((row) => row.id.toLowerCase().includes(uiDataTableQuery.toLowerCase())),
    [uiDataTableQuery],
  )

  const stepperLayoutSteps = useMemo(
    () => [
      { title: 'Order Details', description: 'Capture order information' },
      { title: 'Warehouse Rules', description: 'Apply logistics rules' },
      { title: 'Review', description: 'Validate and confirm' },
    ],
    [],
  )

  return (
    <div className="flex flex-col gap-6">
      <AppHeader
        title="Components"
        subtitle="Side-by-side comparison of JTL components and their standard shadcn counterparts."
        icon={{ icon: 'Package', variant: 'primary' }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Component Inventory</CardTitle>
          <CardDescription>
            Left side lists every JTL component in this repository. Right side highlights all installed shadcn counterparts covered on this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 xl:grid-cols-2">
          <div className="space-y-3">
            <Text type="small" weight="semibold">All JTL components ({jtlComponentInventory.length})</Text>
            <div className="flex flex-wrap gap-2">
              {jtlComponentInventory.map((name) => (
                <a href={`#${getTargetSectionId(name)}`} key={name}>
                    <JTLButton key={name} size='xs' variant='outline' label={name}/>
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Text type="small" weight="semibold">Installed shadcn counterparts ({showcasedCounterparts.length})</Text>
            <div className="flex flex-wrap gap-2">
              {showcasedCounterparts.map((name) => (
                <UIButton key={name} asChild variant="outline" size="sm">
                  <a href={`#${getTargetSectionId(name)}`}>{name}</a>
                </UIButton>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Section title="Buttons">
        <ComponentColumns
          jtl={<div className="flex flex-wrap gap-2"><JTLButton label="Primary" /><JTLButton label="Secondary" variant="secondary" /><JTLButton label="Outline" variant="outline" /><JTLButton label="Ghost" variant="ghost" /></div>}
          shadcn={<div className="flex flex-wrap gap-2"><UIButton>Primary</UIButton><UIButton variant="secondary">Secondary</UIButton><UIButton variant="outline">Outline</UIButton><UIButton variant="ghost">Ghost</UIButton></div>}
        />
      </Section>

      <Section title="Badges">
        <ComponentColumns
          jtl={<div className="flex flex-wrap gap-2"><JTLBadge label="Default" variant="default" /><JTLBadge label="Success" variant="success" /><JTLBadge label="Warning" variant="warning" /><JTLBadge label="Info" variant="info" /></div>}
          shadcn={<div className="flex flex-wrap gap-2"><UIBadge>Default</UIBadge><UIBadge variant="secondary">Secondary</UIBadge><UIBadge variant="destructive">Destructive</UIBadge><UIBadge variant="outline">Outline</UIBadge></div>}
        />
      </Section>

      <Section title="Cards">
        <ComponentColumns
          jtl={<div className="grid gap-3 md:grid-cols-2"><Card className="gap-2 p-4"><CardTitle>Inbound</CardTitle><CardDescription>31 trucks expected today</CardDescription></Card><Card className="gap-2 p-4"><CardTitle>Outbound</CardTitle><CardDescription>22 routes currently loading</CardDescription></Card></div>}
          shadcn={<div className="grid gap-3 md:grid-cols-2"><UICard><UICardHeader className="pb-2"><UICardTitle className="text-base">Inbound</UICardTitle><UICardDescription>31 trucks expected today</UICardDescription></UICardHeader></UICard><UICard><UICardHeader className="pb-2"><UICardTitle className="text-base">Outbound</UICardTitle><UICardDescription>22 routes currently loading</UICardDescription></UICardHeader></UICard></div>}
        />
      </Section>

      <Section title="Inputs">
        <ComponentColumns
          jtl={<div className="grid gap-3"><div className="grid gap-2"><Label variant="field" htmlFor="jtl-order-input">Order Number</Label><JTLInput id="jtl-order-input" value={jtlInputValue} onChange={setJtlInputValue} placeholder="Type order number" /></div><JTLInput value="Disabled field" onChange={setJtlInputValue} disabled /></div>}
          shadcn={<div className="grid gap-3"><UIInput value={uiInputValue} onChange={(event) => setUiInputValue(event.target.value)} placeholder="Type order number" /><UIInput value="Disabled field" disabled readOnly /></div>}
        />
      </Section>

      <Section title="Field">
        <ComponentColumns
          jtl={(
            <Field>
              <FieldLabel required>Order Reference</FieldLabel>
              <FieldControl>
                <JTLInput placeholder="SO-12831" value={jtlInputValue} onChange={setJtlInputValue} />
              </FieldControl>
              <FieldDescription>
                <Text type="small" color="muted">Used for shipment and invoice lookup.</Text>
              </FieldDescription>
            </Field>
          )}
          shadcn={(
            <div className="grid gap-2">
              <UILabel htmlFor="ui-field-order-ref">Order Reference</UILabel>
              <UIInput id="ui-field-order-ref" placeholder="SO-12831" value={uiInputValue} onChange={(event) => setUiInputValue(event.target.value)} />
              <p className="text-sm text-muted-foreground">Closest counterpart in shadcn: composed `label + input + helper text`.</p>
            </div>
          )}
        />
      </Section>

      <Section title="Button Group">
        <ComponentColumns
          jtl={(
            <JTLButtonGroup>
              <JTLButton label="Day" variant="outline" />
              <JTLButton label="Week" variant="outline" />
              <JTLButton label="Month" variant="outline" />
            </JTLButtonGroup>
          )}
          shadcn={(
            <div className="inline-flex rounded-md border border-border">
              <UIButton variant="ghost" className="rounded-r-none">Day</UIButton>
              <UIButton variant="ghost" className="rounded-none border-x border-border">Week</UIButton>
              <UIButton variant="ghost" className="rounded-l-none">Month</UIButton>
            </div>
          )}
        />
      </Section>

      <Section title="Date Picker">
        <ComponentColumns
          jtl={<JTLDatePicker value={jtlDate} onChange={setJtlDate} hasInput />}
          shadcn={<div className="grid gap-2"><UICalendar mode="single" selected={uiCalendarDate} onSelect={setUiCalendarDate} /><p className="text-sm text-muted-foreground">Closest counterpart in this repo: `calendar` (no dedicated date-picker file installed).</p></div>}
        />
      </Section>

      <Section title="Color Picker">
        <ComponentColumns
          jtl={<JTLColorPicker value={jtlColor} onChange={setJtlColor} />}
          shadcn={(
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <input type="color" value={jtlColor} onChange={(event) => setJtlColor(event.target.value)} className="h-10 w-14 cursor-pointer rounded border border-border bg-transparent" />
                <UIInput value={jtlColor} onChange={(event) => setJtlColor(event.target.value)} />
              </div>
              <p className="text-sm text-muted-foreground">Closest counterpart in this repo: composed native color input + text input.</p>
            </div>
          )}
        />
      </Section>

      <Section title="Input Groups">
        <ComponentColumns
          jtl={<JTLInputGroup value={jtlInputValue} onChange={setJtlInputValue}><JTLInputGroupInput /><JTLInputGroupAddon align="inline-right"><JTLInputGroupText>SKU</JTLInputGroupText></JTLInputGroupAddon></JTLInputGroup>}
          shadcn={<UIInputGroup><UIInputGroupInput value={uiInputValue} onChange={(event) => setUiInputValue(event.target.value)} /><UIInputGroupAddon align="inline-end"><UIInputGroupText>SKU</UIInputGroupText></UIInputGroupAddon></UIInputGroup>}
        />
      </Section>

      <Section title="Checkboxes">
        <ComponentColumns
          jtl={<div className="grid gap-2"><JTLCheckbox value={jtlChecked} onChange={setJtlChecked}>Sync stock across channels</JTLCheckbox><JTLCheckbox value={!jtlChecked} onChange={(value) => setJtlChecked(!value)}>Mark orders as priority</JTLCheckbox></div>}
          shadcn={<div className="grid gap-3"><label className="flex items-center gap-2 text-sm"><UICheckbox checked={uiChecked} onCheckedChange={(checked) => setUiChecked(checked === true)} />Sync stock across channels</label><label className="flex items-center gap-2 text-sm"><UICheckbox checked={!uiChecked} onCheckedChange={(checked) => setUiChecked(checked !== true)} />Mark orders as priority</label></div>}
        />
      </Section>

      <Section title="Radio Groups">
        <ComponentColumns
          jtl={<JTLRadio value="normal" onChange={() => undefined} options={[{ value: 'normal', label: 'Normal Priority' }, { value: 'high', label: 'High Priority' }]} />}
          shadcn={<UIRadioGroup defaultValue="normal"><label className="flex items-center gap-2 text-sm"><UIRadioGroupItem value="normal" />Normal Priority</label><label className="flex items-center gap-2 text-sm"><UIRadioGroupItem value="high" />High Priority</label></UIRadioGroup>}
        />
      </Section>

      <Section title="Avatars">
        <ComponentColumns
          jtl={<div className="flex flex-wrap items-center gap-3"><JTLAvatar text="Alex Oemisch" /><JTLAvatar text="Warehouse Team" shape="square" /></div>}
          shadcn={<div className="flex flex-wrap items-center gap-3"><UIAvatar><UIAvatarImage src="https://i.pravatar.cc/100?img=12" alt="Alex Oemisch" /><UIAvatarFallback>AO</UIAvatarFallback></UIAvatar><UIAvatar className="rounded-md"><UIAvatarFallback>WT</UIAvatarFallback></UIAvatar></div>}
        />
      </Section>

      <Section title="Skeletons">
        <ComponentColumns
          jtl={<div className="space-y-2"><JTLSkeleton variant="line" /><JTLSkeleton variant="text" /><JTLSkeleton variant="card" /></div>}
          shadcn={<div className="space-y-2"><UISkeleton className="h-4 w-full" /><UISkeleton className="h-4 w-3/4" /><UISkeleton className="h-16 w-full rounded-xl" /></div>}
        />
      </Section>

      <Section title="Separators">
        <ComponentColumns
          jtl={<div className="space-y-2"><Text type="small">Before separator</Text><JTLSeparator /><Text type="small">After separator</Text></div>}
          shadcn={<div className="space-y-2"><p className="text-sm">Before separator</p><UISeparator /><p className="text-sm">After separator</p></div>}
        />
      </Section>

      <Section title="Labels">
        <ComponentColumns
          jtl={<div className="grid gap-2"><Label variant="field">Warehouse Label</Label><Label variant="subtitle">Secondary helper text</Label></div>}
          shadcn={<div className="grid gap-2"><UILabel>Warehouse Label</UILabel><UILabel className="text-muted-foreground">Secondary helper text</UILabel></div>}
        />
      </Section>

      <Section title="Textareas">
        <ComponentColumns
          jtl={<div className="grid gap-3"><JTLTextarea rows={3} value={jtlTextareaValue} onChange={(event) => setJtlTextareaValue(event.target.value)} /><JTLTextarea rows={3} value="Disabled note" disabled /></div>}
          shadcn={<div className="grid gap-3"><UITextarea rows={3} value={uiTextareaValue} onChange={(event) => setUiTextareaValue(event.target.value)} /><UITextarea rows={3} value="Read only note" readOnly /></div>}
        />
      </Section>

      <Section title="Switches">
        <ComponentColumns
          jtl={<div className="grid gap-3"><JTLSwitch label="Enable auto-allocation" value={jtlSwitchValue} onChange={setJtlSwitchValue} /><JTLSwitch label="Require manager approval" value={!jtlSwitchValue} onChange={(value) => setJtlSwitchValue(!value)} /></div>}
          shadcn={<div className="grid gap-3"><label className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">Enable auto-allocation<UISwitch checked={uiSwitchValue} onCheckedChange={setUiSwitchValue} /></label><label className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">Require manager approval<UISwitch checked={!uiSwitchValue} onCheckedChange={(checked) => setUiSwitchValue(!checked)} /></label></div>}
        />
      </Section>

      <Section title="Progress">
        <ComponentColumns
          jtl={<div className="space-y-3"><JTLProgress percent={35} /><JTLProgress percent={70} variant="highlight" /><JTLProgress percent={95} /></div>}
          shadcn={<div className="space-y-3"><UIProgress value={35} /><UIProgress value={70} /><UIProgress value={95} /></div>}
        />
      </Section>

      <Section title="Alerts">
        <ComponentColumns
          jtl={<div className="grid gap-3"><Alert variant="info" title="Inventory Sync" description="Last sync completed 2 minutes ago." closable={false} /><Alert variant="warning" title="Delayed Shipment" description="Truck ETA exceeded expected window by 18 minutes." closable={false} /></div>}
          shadcn={<div className="grid gap-3"><UIAlert><AlertCircle className="h-4 w-4" /><UIAlertTitle>Inventory Sync</UIAlertTitle><UIAlertDescription>Last sync completed 2 minutes ago.</UIAlertDescription></UIAlert><UIAlert variant="destructive"><AlertCircle className="h-4 w-4" /><UIAlertTitle>Delayed Shipment</UIAlertTitle><UIAlertDescription>Truck ETA exceeded expected window by 18 minutes.</UIAlertDescription></UIAlert></div>}
        />
      </Section>

      <Section title="Alert Dialogs">
        <ComponentColumns
          jtl={<div className="flex flex-wrap gap-2"><JTLButton label="Open JTL alert dialog" onClick={() => setJtlAlertOpen(true)} /><JTLAlertDialog isOpen={jtlAlertOpen} title="Delete batch" description="This action cannot be undone." ctaLabel="Delete" cancelText="Cancel" isDestructive onAccept={() => setJtlAlertOpen(false)} onCancel={() => setJtlAlertOpen(false)} /></div>}
          shadcn={<UIAlertDialog><UIAlertDialogTrigger asChild><UIButton variant="outline">Open shadcn alert dialog</UIButton></UIAlertDialogTrigger><UIAlertDialogContent><UIAlertDialogHeader><UIAlertDialogTitle>Delete batch</UIAlertDialogTitle><UIAlertDialogDescription>This action cannot be undone.</UIAlertDialogDescription></UIAlertDialogHeader><UIAlertDialogFooter><UIAlertDialogCancel>Cancel</UIAlertDialogCancel><UIAlertDialogAction variant="destructive">Delete</UIAlertDialogAction></UIAlertDialogFooter></UIAlertDialogContent></UIAlertDialog>}
        />
      </Section>

      <Section title="Accordions">
        <ComponentColumns
          jtl={<Accordion defaultValue="item-1"><AccordionItem value="item-1" title="Inbound Process" text="Goods receipt, quality check, and put-away." /><AccordionItem value="item-2" title="Outbound Process" text="Picking, packing, and carrier handover." /></Accordion>}
          shadcn={<UIAccordion type="single" collapsible defaultValue="item-1"><UIAccordionItem value="item-1"><UIAccordionTrigger>Inbound Process</UIAccordionTrigger><UIAccordionContent>Goods receipt, quality check, and put-away.</UIAccordionContent></UIAccordionItem><UIAccordionItem value="item-2"><UIAccordionTrigger>Outbound Process</UIAccordionTrigger><UIAccordionContent>Picking, packing, and carrier handover.</UIAccordionContent></UIAccordionItem></UIAccordion>}
        />
      </Section>

      <Section title="Collapsibles">
        <ComponentColumns
          jtl={<JTLCollapsible title="Cycle count details" content={<Text type="small">Aisle B recount required before close.</Text>} showBorder togglePosition="right" />}
          shadcn={<UICollapsible defaultOpen><UICollapsibleTrigger asChild><UIButton variant="outline">Cycle count details</UIButton></UICollapsibleTrigger><UICollapsibleContent className="pt-2 text-sm">Aisle B recount required before close.</UICollapsibleContent></UICollapsible>}
        />
      </Section>

      <Section title="Breadcrumbs">
        <ComponentColumns
          jtl={<JTLBreadcrumb items={breadcrumbItems} maxItems={4} />}
          shadcn={<UIBreadcrumb><UIBreadcrumbList><UIBreadcrumbItem><UIBreadcrumbLink href="#">Home</UIBreadcrumbLink></UIBreadcrumbItem><UIBreadcrumbSeparator /><UIBreadcrumbItem><UIBreadcrumbLink href="#">Warehouse</UIBreadcrumbLink></UIBreadcrumbItem><UIBreadcrumbSeparator /><UIBreadcrumbItem><UIBreadcrumbPage>Components</UIBreadcrumbPage></UIBreadcrumbItem></UIBreadcrumbList></UIBreadcrumb>}
        />
      </Section>

      <Section title="Selects">
        <ComponentColumns
          jtl={<JTLSelect value={jtlSelectValue} onChange={setJtlSelectValue} options={warehouseOptions} placeholder="Select warehouse" />}
          shadcn={<UISelect value={uiSelectValue} onValueChange={setUiSelectValue}><UISelectTrigger><UISelectValue placeholder="Select warehouse" /></UISelectTrigger><UISelectContent>{warehouseOptions.map((option) => (<UISelectItem key={option.value} value={option.value}>{option.label}</UISelectItem>))}</UISelectContent></UISelect>}
        />
      </Section>

      <Section title="Input OTP">
        <ComponentColumns
          jtl={<JTLInputOTP value={jtlOtp} onChange={setJtlOtp} maxLength={6} groupLength={3} separator alignment="left" />}
          shadcn={<UIInputOTP value={uiOtp} onChange={setUiOtp} maxLength={6}><UIInputOTPGroup><UIInputOTPSlot index={0} /><UIInputOTPSlot index={1} /><UIInputOTPSlot index={2} /></UIInputOTPGroup><UISeparator orientation="vertical" className="mx-2 h-5" /><UIInputOTPGroup><UIInputOTPSlot index={3} /><UIInputOTPSlot index={4} /><UIInputOTPSlot index={5} /></UIInputOTPGroup></UIInputOTP>}
        />
      </Section>

      <Section title="Popovers">
        <ComponentColumns
          jtl={<JTLPopover><JTLPopoverTrigger asChild><JTLButton variant="outline" label="Open JTL popover" /></JTLPopoverTrigger><JTLPopoverContent><Text type="small">Use this area for quick order metadata.</Text></JTLPopoverContent></JTLPopover>}
          shadcn={<UIPopover><UIPopoverTrigger asChild><UIButton variant="outline">Open shadcn popover</UIButton></UIPopoverTrigger><UIPopoverContent><p className="text-sm">Use this area for quick order metadata.</p></UIPopoverContent></UIPopover>}
        />
      </Section>

      <Section title="Dialogs">
        <ComponentColumns
          jtl={<Dialog><DialogTrigger asChild><JTLButton variant="outline" label="Open JTL dialog" /></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Release batch</DialogTitle><DialogDescription>Confirm that this picking batch is ready to release.</DialogDescription></DialogHeader></DialogContent></Dialog>}
          shadcn={<UIDialog><UIDialogTrigger asChild><UIButton variant="outline">Open shadcn dialog</UIButton></UIDialogTrigger><UIDialogContent><UIDialogHeader><UIDialogTitle>Release batch</UIDialogTitle><UIDialogDescription>Confirm that this picking batch is ready to release.</UIDialogDescription></UIDialogHeader></UIDialogContent></UIDialog>}
        />
      </Section>

      <Section title="Dropdown Menus">
        <ComponentColumns
          jtl={<JTLDropdownMenu><JTLDropdownMenuTrigger asChild><JTLButton variant="outline" label="JTL actions" /></JTLDropdownMenuTrigger><JTLDropdownMenuContent><JTLDropdownMenuLabel>Actions</JTLDropdownMenuLabel><JTLDropdownMenuSeparator /><JTLDropdownMenuItem>Duplicate</JTLDropdownMenuItem><JTLDropdownMenuItem>Archive</JTLDropdownMenuItem></JTLDropdownMenuContent></JTLDropdownMenu>}
          shadcn={<UIDropdownMenu><UIDropdownMenuTrigger asChild><UIButton variant="outline">shadcn actions</UIButton></UIDropdownMenuTrigger><UIDropdownMenuContent><UIDropdownMenuLabel>Actions</UIDropdownMenuLabel><UIDropdownMenuSeparator /><UIDropdownMenuItem>Duplicate</UIDropdownMenuItem><UIDropdownMenuItem>Archive</UIDropdownMenuItem></UIDropdownMenuContent></UIDropdownMenu>}
        />
      </Section>

      <Section title="ComboBox">
        <ComponentColumns
          jtl={<JTLComboBox mode="single" value={jtlComboValue} onSelect={setJtlComboValue} menuItems={jtlComboItems} placeholder="Select warehouse" />}
          shadcn={(
            <Combobox value={uiComboValue} onValueChange={(value) => setUiComboValue(value ?? '')} items={uiComboItems}>
              <ComboboxInput placeholder="Select warehouse">
                <ComboboxValue />
              </ComboboxInput>
              <ComboboxContent>
                <ComboboxList>
                  {uiComboItems.map((item) => (
                    <ComboboxItem key={item.value} value={item.value}>{item.label}</ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          )}
        />
      </Section>

      <Section title="Command">
        <ComponentColumns
          jtl={<JTLCommand groups={commandGroups} placeholder="Search commands" />}
          shadcn={(
            <UICommand className="rounded-lg border border-border">
              <UICommandInput placeholder="Search commands" />
              <UICommandList>
                <UICommandEmpty>No results found.</UICommandEmpty>
                <UICommandGroup heading="Actions">
                  <UICommandItem>Create Shipment</UICommandItem>
                  <UICommandItem>Print Labels</UICommandItem>
                </UICommandGroup>
              </UICommandList>
            </UICommand>
          )}
        />
      </Section>

      <Section title="Form Group">
        <ComponentColumns
          jtl={(
            <JTLFormGroup label="Contact" columns={{ xs: 1, lg: 2 }}>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldControl>
                  <JTLInput placeholder="alex@example.com" />
                </FieldControl>
              </Field>
              <Field>
                <FieldLabel>Phone</FieldLabel>
                <FieldControl>
                  <JTLInput placeholder="+49 123 456" />
                </FieldControl>
              </Field>
            </JTLFormGroup>
          )}
          shadcn={(
            <div className="grid gap-3 rounded-lg border border-border p-4 lg:grid-cols-2">
              <div className="grid gap-2">
                <UILabel>Email</UILabel>
                <UIInput placeholder="alex@example.com" />
              </div>
              <div className="grid gap-2">
                <UILabel>Phone</UILabel>
                <UIInput placeholder="+49 123 456" />
              </div>
              <p className="text-sm text-muted-foreground lg:col-span-2">Closest counterpart in this repo: composed form section with grid + label/input controls.</p>
            </div>
          )}
        />
      </Section>

      <Section title="Sheets">
        <ComponentColumns
          jtl={<JTLSheet><JTLSheetTrigger asChild><JTLButton variant="outline" label="Open JTL sheet" /></JTLSheetTrigger><JTLSheetBody side="right"><JTLSheetHeader><JTLSheetTitle>Batch Details</JTLSheetTitle><JTLSheetDescription>Review and confirm shipping details.</JTLSheetDescription></JTLSheetHeader><JTLSheetContent><Text type="small">Carrier: DHL Express</Text></JTLSheetContent></JTLSheetBody></JTLSheet>}
          shadcn={<UISheet><UISheetTrigger asChild><UIButton variant="outline">Open shadcn sheet</UIButton></UISheetTrigger><UISheetContent side="right"><UISheetHeader><UISheetTitle>Batch Details</UISheetTitle><UISheetDescription>Review and confirm shipping details.</UISheetDescription></UISheetHeader></UISheetContent></UISheet>}
        />
      </Section>

      <Section title="Scroll Areas">
        <ComponentColumns
          jtl={<JTLScrollArea className="h-36 w-full rounded-md border border-border p-2"><div className="space-y-1">{stockScrollItems.map((item) => (<Text key={item} type="small">{item}</Text>))}</div></JTLScrollArea>}
          shadcn={<UIScrollArea className="h-36 w-full rounded-md border border-border p-2"><div className="space-y-1 text-sm">{stockScrollItems.map((item) => (<p key={`ui-${item}`}>{item}</p>))}</div></UIScrollArea>}
        />
      </Section>

      <Section title="Calendars">
        <ComponentColumns
          jtl={<JTLCalendar mode="single" value={jtlCalendarDate} onChange={setJtlCalendarDate} />}
          shadcn={<UICalendar mode="single" selected={uiCalendarDate} onSelect={setUiCalendarDate} />}
        />
      </Section>

      <Section title="Pagination">
        <ComponentColumns
          jtl={<JTLPagination total={140} page={jtlPage} pageSize={10} onPageChange={setJtlPage} />}
          shadcn={<UIPagination><UIPaginationContent><UIPaginationItem><UIPaginationPrevious href="#" /></UIPaginationItem><UIPaginationItem><UIPaginationLink href="#" isActive>2</UIPaginationLink></UIPaginationItem><UIPaginationItem><UIPaginationNext href="#" /></UIPaginationItem></UIPaginationContent></UIPagination>}
        />
      </Section>

      <Section title="Tabs">
        <ComponentColumns
          jtl={<JTLTab activeTab={jtlTab} onSelectTab={setJtlTab} tabs={[{ id: 'operations', title: 'Operations' }, { id: 'settings', title: 'Settings' }, { id: 'logs', title: 'Logs' }]} />}
          shadcn={<UITabs defaultValue="operations"><UITabsList><UITabsTrigger value="operations">Operations</UITabsTrigger><UITabsTrigger value="settings">Settings</UITabsTrigger><UITabsTrigger value="logs">Logs</UITabsTrigger></UITabsList><UITabsContent value="operations" className="pt-2 text-sm">Operations content</UITabsContent></UITabs>}
        />
      </Section>

      <Section title="Tables">
        <ComponentColumns
          jtl={<JTLTable columns={tableColumns} dataSource={tableRows} size="sm" />}
          shadcn={<UITable><UITableHeader><UITableRow><UITableHead>SKU</UITableHead><UITableHead>Stock</UITableHead><UITableHead>Location</UITableHead></UITableRow></UITableHeader><UITableBody>{tableRows.map((row) => (<UITableRow key={row.id}><UITableCell>{row.id}</UITableCell><UITableCell>{row.stock}</UITableCell><UITableCell>{row.location}</UITableCell></UITableRow>))}</UITableBody></UITable>}
        />
      </Section>

      <Section title="Toggles">
        <ComponentColumns
          jtl={<div className="flex flex-wrap gap-2"><JTLToggle label="Auto" value onChange={() => undefined} /><JTLToggle label="Manual" value={false} onChange={() => undefined} /></div>}
          shadcn={<div className="flex flex-wrap gap-2"><UIToggle defaultPressed>Auto</UIToggle><UIToggle>Manual</UIToggle></div>}
        />
      </Section>

      <Section title="Toggle Groups">
        <ComponentColumns
          jtl={<JTLToggleGroup type="single" value="day" onChange={() => undefined}><JTLToggleGroupItem value="day" label="Day" /><JTLToggleGroupItem value="week" label="Week" /><JTLToggleGroupItem value="month" label="Month" /></JTLToggleGroup>}
          shadcn={<UIToggleGroup type="single" defaultValue="day"><UIToggleGroupItem value="day">Day</UIToggleGroupItem><UIToggleGroupItem value="week">Week</UIToggleGroupItem><UIToggleGroupItem value="month">Month</UIToggleGroupItem></UIToggleGroup>}
        />
      </Section>

      <Section title="Tooltips">
        <ComponentColumns
          jtl={<JTLTooltip content="Copy order reference" shortcut={['Cmd', 'C']}><JTLButton label="Hover for tooltip" variant="outline" /></JTLTooltip>}
          shadcn={<UITooltipProvider><UITooltip><UITooltipTrigger asChild><UIButton variant="outline">Hover for tooltip</UIButton></UITooltipTrigger><UITooltipContent>Copy order reference</UITooltipContent></UITooltip></UITooltipProvider>}
        />
      </Section>

      <Section title="Icon">
        <ComponentColumns
          jtl={<div className="flex flex-wrap items-center gap-3"><Icon name="Package" size={20} /><Icon name="Calendar" size={20} /><Icon name="CheckCircle" size={20} /></div>}
          shadcn={<div className="flex flex-wrap items-center gap-3"><AlertCircle className="h-5 w-5" /><Icon name="Calendar" size={20} /><Icon name="CheckCircle" size={20} /></div>}
        />
      </Section>

      <Section title="Tag">
        <ComponentColumns
          jtl={<div className="flex flex-wrap gap-2"><JTLTag label="Fragile" variant="warning" /><JTLTag label="Priority" variant="info" /><JTLTag label="Ready" variant="success" /></div>}
          shadcn={<div className="flex flex-wrap gap-2"><UIBadge variant="secondary">Fragile</UIBadge><UIBadge variant="outline">Priority</UIBadge><UIBadge>Ready</UIBadge></div>}
        />
      </Section>

      <Section title="Keyboard Hints">
        <ComponentColumns
          jtl={<JTLKbdGroup><JTLKbd>Cmd</JTLKbd><JTLKbd>Shift</JTLKbd><JTLKbd>K</JTLKbd></JTLKbdGroup>}
          shadcn={<UIKbdGroup><UIKbd>Cmd</UIKbd><UIKbd>Shift</UIKbd><UIKbd>K</UIKbd></UIKbdGroup>}
        />
      </Section>

      <Section title="Annotated Section">
        <ComponentColumns
          jtl={(
            <JTLLayout>
              <AnnotatedSection title="Shipping Address" description="Use a consistent section shell for setting groups.">
                <Card className="p-4 gap-2">
                  <Text type="small">Dock 3, Industrial Park 12, Berlin</Text>
                </Card>
              </AnnotatedSection>
            </JTLLayout>
          )}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="App Header">
        <ComponentColumns
          jtl={<AppHeader title="Outbound Queue" subtitle="Use compact headers inside content sections." icon={{ icon: 'Truck', variant: 'secondary' }} />}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Chart">
        <ComponentColumns
          jtl={(
            <JTLChart<DemoChartPoint, ChartVariant.Bar>
              type={ChartVariant.Bar}
              chartConfig={demoChartConfig}
              data={demoChartData}
              displayFields={['orders']}
              showLegend
              height={220}
              xAxisOptions={{ dataKey: 'date', tickFormatter: (value) => String(value).slice(5) }}
            />
          )}
          shadcn={(
            <div className="space-y-3">
              <UIChartContainer config={shadcnChartConfig} className="max-h-[220px] w-full">
                <BarChart accessibilityLayer data={demoChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => String(value).slice(5)} />
                  <UIChartTooltip cursor={false} content={<UIChartTooltipContent indicator="line" />} />
                  <Bar dataKey="orders" fill="var(--color-orders)" radius={6} />
                </BarChart>
              </UIChartContainer>
              <a
                href="https://ui.shadcn.com/charts/bar#charts"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground underline"
              >
                Shadcn docs: Bar Chart
              </a>
            </div>
          )}
        />
      </Section>

      <Section title="Code Editor">
        <ComponentColumns
          jtl={<JTLCodeEditor height={200} defaultLanguage="typescript" value={jtlCodeValue} onChange={setJtlCodeValue} />}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Context Menu">
        <ComponentColumns
          jtl={(
            <JTLContextMenu
              menuItems={[
                { type: 'label', label: 'Quick Actions' },
                { type: 'separator' },
                { type: 'item', label: 'Create Shipment' },
                { type: 'item', label: 'Print Labels', shortcut: 'Cmd+P' },
              ]}
            >
              <div className="flex h-24 w-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
                Right-click this area
              </div>
            </JTLContextMenu>
          )}
          shadcn={(
            <div className="space-y-3">
              <UIContextMenu>
                <UIContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
                  Right-click this area
                </UIContextMenuTrigger>
                <UIContextMenuContent className="w-48">
                  <UIContextMenuLabel>Warehouse Actions</UIContextMenuLabel>
                  <UIContextMenuSeparator />
                  <UIContextMenuItem>Create Shipment</UIContextMenuItem>
                  <UIContextMenuItem>Print Labels</UIContextMenuItem>
                </UIContextMenuContent>
              </UIContextMenu>
              <a
                href="https://ui.shadcn.com/docs/components/context-menu"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground underline"
              >
                Shadcn docs: Context Menu
              </a>
            </div>
          )}
        />
      </Section>

      <Section title="Data Table">
        <ComponentColumns
          jtl={<JTLDataTable columns={tableColumns} dataSource={tableRows} size="sm" tableHeight={200} />}
          shadcn={(
            <div className="space-y-3">
              <UIInput
                value={uiDataTableQuery}
                onChange={(event) => setUiDataTableQuery(event.target.value)}
                placeholder="Filter by SKU"
              />
              <div className="rounded-md border border-border">
                <UITable>
                  <UITableHeader>
                    <UITableRow>
                      <UITableHead>SKU</UITableHead>
                      <UITableHead>Stock</UITableHead>
                      <UITableHead>Location</UITableHead>
                    </UITableRow>
                  </UITableHeader>
                  <UITableBody>
                    {filteredTableRows.length > 0
                      ? filteredTableRows.map((row) => (
                        <UITableRow key={`filtered-${row.id}`}>
                          <UITableCell>{row.id}</UITableCell>
                          <UITableCell>{row.stock}</UITableCell>
                          <UITableCell>{row.location}</UITableCell>
                        </UITableRow>
                      ))
                      : (
                        <UITableRow>
                          <UITableCell colSpan={3} className="text-sm text-muted-foreground">
                            No matching rows.
                          </UITableCell>
                        </UITableRow>
                      )}
                  </UITableBody>
                </UITable>
              </div>
              <a
                href="https://ui.shadcn.com/docs/components/data-table"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground underline"
              >
                Shadcn docs: Data Table (composed)
              </a>
            </div>
          )}
        />
      </Section>

      <Section title="Date Range Picker">
        <ComponentColumns
          jtl={<JTLDateRangePicker value={jtlDateRange} onChange={setJtlDateRange} placeholder="Select period" />}
          shadcn={(
            <div className="space-y-3">
              <UIPopover>
                <UIPopoverTrigger asChild>
                  <UIButton variant="outline" className="w-full justify-start text-left font-normal">
                    {uiDateRange?.from
                      ? `${uiDateRange.from.toLocaleDateString()}${uiDateRange.to ? ` - ${uiDateRange.to.toLocaleDateString()}` : ''}`
                      : 'Pick a date range'}
                  </UIButton>
                </UIPopoverTrigger>
                <UIPopoverContent className="w-auto p-0" align="start">
                  <UICalendar mode="range" selected={uiDateRange} onSelect={setUiDateRange} numberOfMonths={2} />
                </UIPopoverContent>
              </UIPopover>
              <a
                href="https://ui.shadcn.com/docs/components/date-picker"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground underline"
              >
                Shadcn docs: Date Picker (composed)
              </a>
            </div>
          )}
        />
      </Section>

      <Section title="Field Array">
        <ComponentColumns
          jtl={(
            <JTLForm form={jtlForm} onSubmit={() => undefined}>
              <FieldArray<DemoWizardForm> name="items" control={jtlForm.control} defaultValue={{ name: '' }}>
                {({ fields, append, remove }) => (
                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <Text type="small">Item {index + 1}</Text>
                        <JTLButton size="xs" variant="outline" label="Remove" onClick={() => remove(index)} />
                      </div>
                    ))}
                    <JTLButton size="xs" variant="secondary" label="Add Item" onClick={() => append({ name: `Item ${fields.length + 1}` })} />
                  </div>
                )}
              </FieldArray>
            </JTLForm>
          )}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="File Upload">
        <ComponentColumns
          jtl={<JTLFileUpload allowMultiple acceptedFileType={{ 'application/pdf': ['.pdf'], 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] }} maxSize={2} />}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Form">
        <ComponentColumns
          jtl={(
            <JTLForm form={jtlForm} onSubmit={() => undefined}>
              <div className="space-y-3">
                <Field>
                  <FieldLabel>Order Reference</FieldLabel>
                  <FieldControl>
                    <JTLInput placeholder="SO-12654" />
                  </FieldControl>
                </Field>
                <JTLButton label="Submit" />
              </div>
            </JTLForm>
          )}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Grid">
        <ComponentColumns
          jtl={(
            <JTLGrid columns={{ xs: 2, lg: 4 }}>
              <Card className="p-3"><Text type="small">A</Text></Card>
              <Card className="p-3"><Text type="small">B</Text></Card>
              <Card className="p-3"><Text type="small">C</Text></Card>
              <Card className="p-3"><Text type="small">D</Text></Card>
            </JTLGrid>
          )}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Html Editor">
        <ComponentColumns
          jtl={<JTLHtmlEditor initialContent={jtlHtmlValue} onContentChange={setJtlHtmlValue} />}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Layout">
        <ComponentColumns
          jtl={(
            <JTLLayout>
              <JTLLayoutSection>
                <Card className="p-4"><Text type="small">Primary content</Text></Card>
              </JTLLayoutSection>
              <AnnotatedSection title="Details" description="Secondary information panel.">
                <Card className="p-4"><Text type="small">Annotated block</Text></Card>
              </AnnotatedSection>
            </JTLLayout>
          )}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Layout Section">
        <ComponentColumns
          jtl={<JTLLayoutSection><Card className="p-4"><Text type="small">Layout section container with default spacing.</Text></Card></JTLLayoutSection>}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Link">
        <ComponentColumns
          jtl={<JTLButton size="xs" variant="outline" label="link" />}
          shadcn={<UIButton variant="link">Link</UIButton>}
        />
      </Section>

      <Section title="Sidebar">
        <ComponentColumns
          jtl={(
            <JTLSidebar className="h-56" width="180px" collapsedWidth="48px">
              <JTLSidebarToggle />
              <JTLSidebarHeader className="h-10 flex items-center px-2">
                <Text type="small" weight="semibold">JTL ERP</Text>
              </JTLSidebarHeader>
              <JTLSidebarGroup>
                <ul className="flex flex-col gap-1">
                  <JTLSidebarItem label="Orders" isActive>
                    <JTLSidebarItemIcon><Icon name="ShoppingCart" size={16} /></JTLSidebarItemIcon>
                  </JTLSidebarItem>
                  <JTLSidebarItem label="Inventory">
                    <JTLSidebarItemIcon><Icon name="Warehouse" size={16} /></JTLSidebarItemIcon>
                  </JTLSidebarItem>
                </ul>
              </JTLSidebarGroup>
            </JTLSidebar>
          )}
          shadcn={(
            <div className="space-y-3">
              <UISidebarProvider className="h-56 min-h-0 overflow-hidden rounded-md border border-border">
                <UISidebar collapsible="none" className="w-52 border-r border-border">
                  <UISidebarHeader>
                    <p className="px-2 text-xs font-medium text-muted-foreground">Warehouse</p>
                  </UISidebarHeader>
                  <UISidebarContent>
                    <UISidebarGroup>
                      <UISidebarGroupLabel>Navigation</UISidebarGroupLabel>
                      <UISidebarMenu>
                        <UISidebarMenuItem>
                          <UISidebarMenuButton isActive>Orders</UISidebarMenuButton>
                        </UISidebarMenuItem>
                        <UISidebarMenuItem>
                          <UISidebarMenuButton>Inventory</UISidebarMenuButton>
                        </UISidebarMenuItem>
                      </UISidebarMenu>
                    </UISidebarGroup>
                  </UISidebarContent>
                </UISidebar>
                <UISidebarInset className="p-3">
                  <p className="text-sm text-muted-foreground">Main content area</p>
                </UISidebarInset>
              </UISidebarProvider>
              <a
                href="https://ui.shadcn.com/docs/components/sidebar"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground underline"
              >
                Shadcn docs: Sidebar
              </a>
            </div>
          )}
        />
      </Section>

      <Section title="Stack">
        <ComponentColumns
          jtl={<JTLStack direction="row" spacing="2"><JTLBadge label="Queued" variant="info" /><JTLBadge label="Packing" variant="warning" /><JTLBadge label="Ready" variant="success" /></JTLStack>}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Stepper">
        <ComponentColumns
          jtl={(
            <div className="space-y-3">
              <JTLStepper activeSteps={jtlStepperActive} completedSteps={[0]} onClick={setJtlStepperActive} mode="navigation">
                <JTLStepperStep title="Create" description="Create order" />
                <JTLStepperStep title="Pack" description="Prepare shipment" />
                <JTLStepperStep title="Dispatch" description="Send to carrier" />
              </JTLStepper>
              <Text type="small" color="muted">Active step: {jtlStepperActive + 1}</Text>
            </div>
          )}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Stepper Layout">
        <ComponentColumns
          jtl={(
            <StepperLayout
              steps={stepperLayoutSteps}
              activeStep={jtlWizardStep}
              onBack={(current) => setJtlWizardStep(Math.max(0, current - 1))}
              onNext={async (current) => setJtlWizardStep(Math.min(stepperLayoutSteps.length - 1, current + 1))}
            >
              <Text type="small">Wizard step content {jtlWizardStep + 1}</Text>
            </StepperLayout>
          )}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>

      <Section title="Styled Icon">
        <ComponentColumns
          jtl={<div className="flex gap-3"><JTLStyledIcon icon="Package" variant="info" /><JTLStyledIcon icon="TriangleAlert" variant="warning" /><JTLStyledIcon icon="CheckCircle" variant="success" /></div>}
          shadcn={<Text type="small" color="muted">No shadcn component available.</Text>}
        />
      </Section>
    </div>
  )
}
