import { useMemo, useState } from 'react'
import { AppHeader } from '@/components/jtl/app-header'
import { Badge } from '@/components/jtl/badge'
import { Button } from '@/components/jtl/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/jtl/card'
import { ColorPicker } from '@/components/jtl/color-picker'
import { DataTable } from '@/components/jtl/data-table'
import { FilterInputMode, FilterValueType, type FilterState } from '@/components/jtl/data-table/types'
import { FilterConditionOperator } from '@/components/jtl/data-table/deprecated/advanced-filter/types'
import { DatePicker } from '@/components/jtl/date-picker'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/jtl/dialog'
import { Field, FieldControl, FieldLabel } from '@/components/jtl/field'
import { FormGroup } from '@/components/jtl/form-group'
import { Select } from '@/components/jtl/select'
import { Switch } from '@/components/jtl/switch'
import type { ITableColumnProps } from '@/components/jtl/table'
import { InputGroup, InputGroupInput } from '@/components/jtl/input-group'

type OrderStatus = 'Packed' | 'Picking' | 'Delayed' | 'Ready' | 'Shipped'

interface OrderRow {
  orderId: string
  customer: string
  warehouse: string
  amount: string
  status: OrderStatus
  date: string
}

interface NewOrderForm {
  customerName: string
  customerEmail: string
  purchaseOrderNumber: string
  deliveryDate: Date | undefined
  shippingAddress: string
  referenceNote: string
}

type NewOrderFormTextField = 'customerName' | 'customerEmail' | 'purchaseOrderNumber' | 'shippingAddress' | 'referenceNote'
type ConditionalColumnKey = keyof Pick<OrderRow, 'customer' | 'warehouse' | 'amount' | 'status' | 'date'>
type ConditionalOperator = 'contains' | 'equals' | 'greaterThan' | 'lessThan'

interface ConditionalRule {
  id: string
  name: string
  columnKey: ConditionalColumnKey
  operator: ConditionalOperator
  value: string
  textColor: string
  backgroundColor: string
  enabled: boolean
}

const orders: OrderRow[] = [
  { orderId: 'SO-12831', customer: 'Dorado Retail', warehouse: 'Berlin', amount: 'EUR 12,420', status: 'Packed', date: '2026-05-19' },
  { orderId: 'SO-12830', customer: 'Metris Commerce', warehouse: 'Hamburg', amount: 'EUR 8,275', status: 'Picking', date: '2026-05-19' },
  { orderId: 'SO-12824', customer: 'Kern Supply', warehouse: 'Cologne', amount: 'EUR 19,030', status: 'Delayed', date: '2026-05-18' },
  { orderId: 'SO-12819', customer: 'Nova Marketplace', warehouse: 'Munich', amount: 'EUR 4,980', status: 'Ready', date: '2026-05-18' },
  { orderId: 'SO-12815', customer: 'Apex Logistics', warehouse: 'Frankfurt', amount: 'EUR 7,640', status: 'Shipped', date: '2026-05-17' },
  { orderId: 'SO-12811', customer: 'Nexus Trade', warehouse: 'Berlin', amount: 'EUR 22,100', status: 'Shipped', date: '2026-05-17' },
  { orderId: 'SO-12807', customer: 'Orbit Supplies', warehouse: 'Hamburg', amount: 'EUR 5,310', status: 'Packed', date: '2026-05-16' },
  { orderId: 'SO-12803', customer: 'Summit Retail', warehouse: 'Cologne', amount: 'EUR 9,870', status: 'Picking', date: '2026-05-16' },
]

const statusVariant: Record<OrderStatus, 'default' | 'secondary' | 'outline'> = {
  Packed: 'default',
  Picking: 'secondary',
  Delayed: 'outline',
  Ready: 'secondary',
  Shipped: 'default',
}

const conditionalColumnOptions: Array<{ label: string; value: ConditionalColumnKey }> = [
  { label: 'Customer', value: 'customer' },
  { label: 'Warehouse', value: 'warehouse' },
  { label: 'Amount', value: 'amount' },
  { label: 'Status', value: 'status' },
  { label: 'Date', value: 'date' },
]

const conditionalOperatorOptions: Array<{ label: string; value: ConditionalOperator }> = [
  { label: 'Contains', value: 'contains' },
  { label: 'Equals', value: 'equals' },
  { label: 'Greater than', value: 'greaterThan' },
  { label: 'Less than', value: 'lessThan' },
]

const initialConditionalRules: ConditionalRule[] = [
  {
    id: 'rule-high-amount',
    name: 'High Amount',
    columnKey: 'amount',
    operator: 'greaterThan',
    value: '15000',
    textColor: '#0f5132',
    backgroundColor: '#d1e7dd',
    enabled: true,
  },
  {
    id: 'rule-delayed-orders',
    name: 'Delayed Orders',
    columnKey: 'status',
    operator: 'equals',
    value: 'Delayed',
    textColor: '#842029',
    backgroundColor: '#f8d7da',
    enabled: true,
  },
  {
    id: 'rule-berlin-warehouse',
    name: 'Berlin Warehouse',
    columnKey: 'warehouse',
    operator: 'equals',
    value: 'Berlin',
    textColor: '#055160',
    backgroundColor: '#cff4fc',
    enabled: false,
  },
]

const parseAmountNumber = (value: string): number => {
  return Number(value.replace(/[^\d.,-]/g, '').replace(/,/g, ''))
}

const uniqueOptions = (values: string[]) => {
  return Array.from(new Set(values)).sort((left, right) => left.localeCompare(right)).map(value => ({
    label: value,
    value,
  }))
}

const orderFilterableColumns = [
  { columnKey: 'orderId' as const, mode: FilterInputMode.CUSTOM_VALUE },
  { columnKey: 'customer' as const, mode: FilterInputMode.CUSTOM_VALUE },
  { columnKey: 'warehouse' as const, options: uniqueOptions(orders.map(order => order.warehouse)) },
  {
    columnKey: 'amount' as const,
    mode: FilterInputMode.CUSTOM_VALUE,
    valueType: FilterValueType.NUMBER,
  },
  { columnKey: 'status' as const, options: uniqueOptions(orders.map(order => order.status)) },
  { columnKey: 'date' as const, valueType: FilterValueType.DATE },
]

const compareString = (recordValue: string, filterValues: string[], operator: FilterConditionOperator) => {
  const normalizedRecordValue = recordValue.toLowerCase()
  const normalizedFilterValues = filterValues.map(value => value.toLowerCase())

  if (operator === FilterConditionOperator.NotEquals) {
    return normalizedFilterValues.every(value => normalizedRecordValue !== value)
  }

  if (operator === FilterConditionOperator.StartsWith) {
    return normalizedFilterValues.some(value => normalizedRecordValue.startsWith(value))
  }

  if (operator === FilterConditionOperator.EndsWith) {
    return normalizedFilterValues.some(value => normalizedRecordValue.endsWith(value))
  }

  if (operator === FilterConditionOperator.Contains) {
    return normalizedFilterValues.some(value => normalizedRecordValue.includes(value))
  }

  return normalizedFilterValues.some(value => normalizedRecordValue === value)
}

const compareNumber = (recordValue: number, filterValues: number[], operator: FilterConditionOperator) => {
  if (operator === FilterConditionOperator.NotEquals) {
    return filterValues.every(value => recordValue !== value)
  }

  if (operator === FilterConditionOperator.GreaterThan) {
    return filterValues.some(value => recordValue > value)
  }

  if (operator === FilterConditionOperator.GreaterThanOrEqual) {
    return filterValues.some(value => recordValue >= value)
  }

  if (operator === FilterConditionOperator.LessThan) {
    return filterValues.some(value => recordValue < value)
  }

  if (operator === FilterConditionOperator.LessThanOrEqual) {
    return filterValues.some(value => recordValue <= value)
  }

  return filterValues.some(value => recordValue === value)
}

const matchesFilterCondition = (order: OrderRow, condition?: Partial<FilterState<OrderRow>>) => {
  if (!condition) return true

  return Object.entries(condition).every(([key, fieldFilter]) => {
    if (!fieldFilter || fieldFilter.value.length === 0) return true

    const operator = fieldFilter.operator

    if (key === 'amount') {
      const filterValues = fieldFilter.value
        .map(value => Number(String(value).replace(/,/g, '')))
        .filter(value => !Number.isNaN(value))

      if (filterValues.length === 0) return true

      return compareNumber(parseAmountNumber(order.amount), filterValues, operator)
    }

    if (key === 'date') {
      const recordValue = new Date(`${order.date}T00:00:00`).getTime()
      const filterValues = fieldFilter.value
        .map(value => new Date(String(value)).getTime())
        .filter(value => !Number.isNaN(value))

      if (filterValues.length === 0) return true

      if (operator === FilterConditionOperator.In) {
        const [from, to] = filterValues

        if (from !== undefined && to !== undefined) {
          return recordValue >= from && recordValue <= to
        }

        if (from !== undefined) {
          return recordValue >= from
        }

        return true
      }

      return compareNumber(recordValue, filterValues, operator)
    }

    return compareString(String(order[key as keyof OrderRow]), fieldFilter.value.map(value => String(value)), operator)
  })
}

const evaluateRule = (rule: ConditionalRule, record: OrderRow): boolean => {
  const recordValue = String(record[rule.columnKey])
  const ruleValue = rule.value.trim()

  if (!ruleValue) return false

  if (rule.columnKey === 'amount') {
    const recordNumber = parseAmountNumber(recordValue)
    const ruleNumber = Number(ruleValue.replace(/,/g, ''))

    if (Number.isNaN(recordNumber) || Number.isNaN(ruleNumber)) {
      return false
    }

    if (rule.operator === 'equals') return recordNumber === ruleNumber
    if (rule.operator === 'greaterThan') return recordNumber > ruleNumber
    if (rule.operator === 'lessThan') return recordNumber < ruleNumber
    return recordNumber.toString().includes(ruleValue)
  }

  if (rule.columnKey === 'date') {
    const recordTime = new Date(recordValue).getTime()
    const ruleTime = new Date(ruleValue).getTime()

    if (Number.isNaN(recordTime) || Number.isNaN(ruleTime)) {
      return false
    }

    if (rule.operator === 'equals') return recordValue === ruleValue
    if (rule.operator === 'greaterThan') return recordTime > ruleTime
    if (rule.operator === 'lessThan') return recordTime < ruleTime
    return recordValue.includes(ruleValue)
  }

  const normalizedRecordValue = recordValue.toLowerCase()
  const normalizedRuleValue = ruleValue.toLowerCase()

  if (rule.operator === 'equals') return normalizedRecordValue === normalizedRuleValue
  if (rule.operator === 'greaterThan') return normalizedRecordValue > normalizedRuleValue
  if (rule.operator === 'lessThan') return normalizedRecordValue < normalizedRuleValue

  return normalizedRecordValue.includes(normalizedRuleValue)
}

export default function OrdersPage() {
  const [query, setQuery] = useState('')
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false)
  const [isConditionalFormattingOpen, setIsConditionalFormattingOpen] = useState(false)
  const [tableFilters, setTableFilters] = useState<Partial<FilterState<OrderRow>> | undefined>({
    date: {
      value: [],
      operator: FilterConditionOperator.In,
    },
  })
  const [selectedFilterableColumnKeys, setSelectedFilterableColumnKeys] = useState<(keyof OrderRow)[]>([
    'orderId',
    'customer',
    'status',
    'warehouse',
    'date',
  ])
  const [conditionalRules, setConditionalRules] = useState<ConditionalRule[]>(initialConditionalRules)
  const [selectedRuleId, setSelectedRuleId] = useState(initialConditionalRules[0]?.id ?? '')
  const [previewRuleId, setPreviewRuleId] = useState<string | null>(null)
  const [newOrderForm, setNewOrderForm] = useState<NewOrderForm>({
    customerName: '',
    customerEmail: '',
    purchaseOrderNumber: '',
    deliveryDate: undefined,
    shippingAddress: '',
    referenceNote: '',
  })

  const updateNewOrderForm = (field: NewOrderFormTextField, value: string) => {
    setNewOrderForm(current => ({ ...current, [field]: value }))
  }

  const selectedRule = useMemo(
    () => conditionalRules.find(rule => rule.id === selectedRuleId) ?? null,
    [conditionalRules, selectedRuleId],
  )

  const activeRules = useMemo(() => {
    return conditionalRules.filter(rule => rule.enabled || rule.id === previewRuleId)
  }, [conditionalRules, previewRuleId])

  const updateConditionalRule = (ruleId: string, updates: Partial<ConditionalRule>) => {
    setConditionalRules(current =>
      current.map(rule => {
        if (rule.id !== ruleId) return rule
        return { ...rule, ...updates }
      }),
    )
  }

  const addConditionalRule = () => {
    const nextRule: ConditionalRule = {
      id: `rule-${Date.now()}`,
      name: `Rule ${conditionalRules.length + 1}`,
      columnKey: 'status',
      operator: 'equals',
      value: '',
      textColor: '#1f2937',
      backgroundColor: '#e5e7eb',
      enabled: true,
    }

    setConditionalRules(current => [...current, nextRule])
    setSelectedRuleId(nextRule.id)
  }

  const getConditionalStyle = (record: OrderRow, columnKey: ConditionalColumnKey) => {
    const matchedRule = activeRules.find(rule => rule.columnKey === columnKey && evaluateRule(rule, record))

    if (!matchedRule) return undefined

    return {
      color: matchedRule.textColor,
      backgroundColor: matchedRule.backgroundColor,
    } as const
  }

  const handleCreateOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsNewOrderDialogOpen(false)
    setNewOrderForm({
      customerName: '',
      customerEmail: '',
      purchaseOrderNumber: '',
      deliveryDate: undefined,
      shippingAddress: '',
      referenceNote: '',
    })
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return orders.filter((order) => {
      const matchesQuery = !q || [order.orderId, order.customer, order.warehouse, order.status].some((value) => value.toLowerCase().includes(q))
      return matchesQuery && matchesFilterCondition(order, tableFilters)
    })
  }, [query, tableFilters])

  const columns: ITableColumnProps<OrderRow>[] = [
    { title: 'Order ID', key: 'orderId', dataIndex: 'orderId', width: 120 },
    {
      title: 'Customer',
      key: 'customer',
      dataIndex: 'customer',
      minWidth: 200,
      render: (customer, record) => {
        const style = getConditionalStyle(record, 'customer')
        if (!style) return customer

        return (
          <span className="inline-flex rounded px-2 py-0.5" style={style}>
            {customer}
          </span>
        )
      },
    },
    {
      title: 'Warehouse',
      key: 'warehouse',
      dataIndex: 'warehouse',
      width: 130,
      render: (warehouse, record) => {
        const style = getConditionalStyle(record, 'warehouse')
        if (!style) return warehouse

        return (
          <span className="inline-flex rounded px-2 py-0.5" style={style}>
            {warehouse}
          </span>
        )
      },
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
      width: 120,
      render: (date, record) => {
        const style = getConditionalStyle(record, 'date')
        if (!style) return date

        return (
          <span className="inline-flex rounded px-2 py-0.5" style={style}>
            {date}
          </span>
        )
      },
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      width: 130,
      align: 'end',
      render: (amount, record) => {
        const style = getConditionalStyle(record, 'amount')
        if (!style) return amount

        return (
          <span className="inline-flex rounded px-2 py-0.5" style={style}>
            {amount}
          </span>
        )
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 120,
      render: (status, record) => {
        if (!status) return null

        const style = getConditionalStyle(record, 'status')
        if (!style) return <Badge label={status} variant={statusVariant[status]} />

        return (
          <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold" style={style}>
            {status}
          </span>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <AppHeader
        title="Sales Orders"
        subtitle="Track and manage all incoming sales orders."
        icon={{ icon: 'ShoppingCart', variant: 'primary' }}
        actions={[
          <Button
            key="formatting"
            label="Conditional Formatting"
            variant="secondary"
            icon="WandSparkles"
            onClick={() => {
              setIsConditionalFormattingOpen(true)
            }}
          />,
          <Button
            key="new"
            label="New Order"
            icon="Plus"
            onClick={() => {
              setIsNewOrderDialogOpen(true)
            }}
          />,
        ]}
      />

      <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Sales Order</DialogTitle>
            <DialogDescription>
              Add the main order details before line items are assigned.
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-6" onSubmit={handleCreateOrder}>
            <FormGroup label="Order Information" columns={{ xs: 1, lg: 2 }}>
              <Field>
                <FieldLabel htmlFor="new-order-customer-name">Customer name</FieldLabel>
                <FieldControl>
                  <InputGroup
                    id="new-order-customer-name"
                    value={newOrderForm.customerName}
                    onChange={(value: string) => {
                      updateNewOrderForm('customerName', value)
                    }}
                    placeholder="Dorado Retail"
                  >
                    <InputGroupInput />
                  </InputGroup>
                </FieldControl>
              </Field>

              <Field>
                <FieldLabel htmlFor="new-order-customer-email">Customer email</FieldLabel>
                <FieldControl>
                  <InputGroup
                    id="new-order-customer-email"
                    type="email"
                    value={newOrderForm.customerEmail}
                    onChange={(value: string) => {
                      updateNewOrderForm('customerEmail', value)
                    }}
                    placeholder="orders@customer.com"
                  >
                    <InputGroupInput />
                  </InputGroup>
                </FieldControl>
              </Field>

              <Field>
                <FieldLabel htmlFor="new-order-po-number">Purchase order #</FieldLabel>
                <FieldControl>
                  <InputGroup
                    id="new-order-po-number"
                    value={newOrderForm.purchaseOrderNumber}
                    onChange={(value: string) => {
                      updateNewOrderForm('purchaseOrderNumber', value)
                    }}
                    placeholder="PO-90311"
                  >
                    <InputGroupInput />
                  </InputGroup>
                </FieldControl>
              </Field>

              <Field>
                <FieldLabel htmlFor="new-order-delivery-date">Requested delivery date</FieldLabel>
                <FieldControl>
                  <DatePicker
                    id="new-order-delivery-date"
                    value={newOrderForm.deliveryDate}
                    onChange={(date) => {
                      setNewOrderForm(current => ({ ...current, deliveryDate: date }))
                    }}
                    placeholder="Select date"
                  />
                </FieldControl>
              </Field>

              <Field columnSpan={{ xs: 1, lg: 2 }}>
                <FieldLabel htmlFor="new-order-shipping-address">Shipping address</FieldLabel>
                <FieldControl>
                  <InputGroup
                    id="new-order-shipping-address"
                    value={newOrderForm.shippingAddress}
                    onChange={(value: string) => {
                      updateNewOrderForm('shippingAddress', value)
                    }}
                    placeholder="Street, postal code, city"
                  >
                    <InputGroupInput />
                  </InputGroup>
                </FieldControl>
              </Field>

              <Field columnSpan={{ xs: 1, lg: 2 }}>
                <FieldLabel htmlFor="new-order-reference-note">Reference note</FieldLabel>
                <FieldControl>
                  <InputGroup
                    id="new-order-reference-note"
                    value={newOrderForm.referenceNote}
                    onChange={(value: string) => {
                      updateNewOrderForm('referenceNote', value)
                    }}
                    placeholder="Customer reference or internal note"
                  >
                    <InputGroupInput />
                  </InputGroup>
                </FieldControl>
              </Field>
            </FormGroup>

            <DialogFooter>
              <DialogClose asChild>
                <Button label="Cancel" variant="secondary" type="button" />
              </DialogClose>
              <Button label="Create Order" icon="Save" type="submit" />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isConditionalFormattingOpen} onOpenChange={setIsConditionalFormattingOpen}>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Conditional Formatting</DialogTitle>
            <DialogDescription>
              Define rules that highlight order values based on field conditions.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="flex flex-col gap-3 rounded-lg border border-[var(--border)] p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Rules</p>
                <Button label="Add Rule" size="sm" icon="Plus" onClick={addConditionalRule} />
              </div>

              <div className="flex max-h-[420px] flex-col gap-2 overflow-y-auto pr-1">
                {conditionalRules.map(rule => {
                  const isSelected = rule.id === selectedRuleId
                  const isPreviewing = previewRuleId === rule.id

                  return (
                    <button
                      key={rule.id}
                      type="button"
                      onClick={() => {
                        setSelectedRuleId(rule.id)
                      }}
                      className={`rounded-md border p-3 text-left transition-colors ${isSelected ? 'border-[var(--ring)] bg-[var(--muted)]' : 'border-[var(--border)] hover:bg-[var(--muted)]'}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{rule.name}</p>
                        <Switch
                          value={rule.enabled}
                          onChange={(value) => {
                            updateConditionalRule(rule.id, { enabled: value })
                          }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                        {conditionalColumnOptions.find(option => option.value === rule.columnKey)?.label} {conditionalOperatorOptions.find(option => option.value === rule.operator)?.label?.toLowerCase()} {rule.value || '...'}
                      </p>
                      <div className="mt-2 flex justify-end">
                        <Button
                          label={isPreviewing ? 'Stop Preview' : 'Preview'}
                          size="sm"
                          variant={isPreviewing ? 'secondary' : 'outline'}
                          onClick={(event) => {
                            event.stopPropagation()
                            setPreviewRuleId(current => (current === rule.id ? null : rule.id))
                          }}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedRule ? (
              <div className="flex flex-col gap-4 rounded-lg border border-[var(--border)] p-4">
                <FormGroup label="Rule Configuration" columns={{ xs: 1, md: 2 }}>
                  <Field>
                    <FieldLabel htmlFor="conditional-rule-name">Rule name</FieldLabel>
                    <FieldControl>
                      <InputGroup
                        id="conditional-rule-name"
                        value={selectedRule.name}
                        onChange={(value: string) => {
                          updateConditionalRule(selectedRule.id, { name: value })
                        }}
                        placeholder="Delayed Orders"
                      >
                        <InputGroupInput />
                      </InputGroup>
                    </FieldControl>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="conditional-column">Column</FieldLabel>
                    <FieldControl>
                      <Select
                        value={selectedRule.columnKey}
                        onChange={(value) => {
                          updateConditionalRule(selectedRule.id, { columnKey: value as ConditionalColumnKey })
                        }}
                        options={conditionalColumnOptions}
                        placeholder="Select column"
                        isPortal={false}
                      />
                    </FieldControl>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="conditional-operator">Operator</FieldLabel>
                    <FieldControl>
                      <Select
                        value={selectedRule.operator}
                        onChange={(value) => {
                          updateConditionalRule(selectedRule.id, { operator: value as ConditionalOperator })
                        }}
                        options={conditionalOperatorOptions}
                        placeholder="Select operator"
                        isPortal={false}
                      />
                    </FieldControl>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="conditional-value">Compare value</FieldLabel>
                    <FieldControl>
                      <InputGroup
                        id="conditional-value"
                        value={selectedRule.value}
                        onChange={(value: string) => {
                          updateConditionalRule(selectedRule.id, { value })
                        }}
                        placeholder={selectedRule.columnKey === 'date' ? '2026-05-18' : 'Value'}
                      >
                        <InputGroupInput />
                      </InputGroup>
                    </FieldControl>
                  </Field>
                </FormGroup>

                <div className="grid gap-4 md:grid-cols-2">
                  <ColorPicker
                    value={selectedRule.textColor}
                    onChange={(color) => {
                      updateConditionalRule(selectedRule.id, { textColor: color })
                    }}
                    header={<p className="text-sm font-medium">Text color</p>}
                  />
                  <ColorPicker
                    value={selectedRule.backgroundColor}
                    onChange={(color) => {
                      updateConditionalRule(selectedRule.id, { backgroundColor: color })
                    }}
                    header={<p className="text-sm font-medium">Background color</p>}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button label="Close" variant="secondary" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>{filtered.length} orders found</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable<OrderRow>
            columns={columns}
            dataSource={filtered}
            globalSearch={{
              enabled: true,
              value: query,
              onChange: setQuery,
              placeholder: 'Search orders…',
            }}
            filter={{
              enabled: true,
              condition: tableFilters,
              onChange: setTableFilters,
              filterableColumns: orderFilterableColumns,
              selectedFilterableColumnKeys,
              onSelectedFilterableColumnKeysChange: setSelectedFilterableColumnKeys,
            }}
            size="sm"
            hasColumnSeparator
            tableHeight={480}
          />
        </CardContent>
      </Card>
    </div>
  )
}
