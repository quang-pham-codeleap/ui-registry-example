import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Chart, ChartVariant } from '@/components/jtl/chart'
import type { ITableColumnProps } from '@/components/jtl/table'
import { Avatar } from '@/components/jtl/avatar'
import { Badge } from '@/components/jtl/badge'
import { Button } from '@/components/jtl/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/jtl/card'
import { DateRangePicker } from '@/components/jtl/date-range-picker'
import { DataTable } from '@/components/jtl/data-table'
import { InputGroup, InputGroupAddon, InputGroupIcon, InputGroupInput } from '@/components/jtl/input-group'
import { Progress } from '@/components/jtl/progress'
import { Separator } from '@/components/jtl/separator'
import { AppHeader } from '@/components/jtl/app-header'

type OrderStatus = 'Packed' | 'Picking' | 'Delayed' | 'Ready'

interface OrderRow {
  orderId: string
  customer: string
  warehouse: string
  amount: string
  status: OrderStatus
}

interface OpsMetricPoint {
  date: string
  orders: number
  revenue: number
  pickingAccuracy: number
}

const orders: OrderRow[] = [
  { orderId: 'SO-12831', customer: 'Dorado Retail', warehouse: 'Berlin', amount: 'EUR 12,420', status: 'Packed' },
  { orderId: 'SO-12830', customer: 'Metris Commerce', warehouse: 'Hamburg', amount: 'EUR 8,275', status: 'Picking' },
  { orderId: 'SO-12824', customer: 'Kern Supply', warehouse: 'Cologne', amount: 'EUR 19,030', status: 'Delayed' },
  { orderId: 'SO-12819', customer: 'Nova Marketplace', warehouse: 'Munich', amount: 'EUR 4,980', status: 'Ready' },
]

const statusVariant: Record<OrderStatus, 'default' | 'secondary' | 'outline'> = {
  Packed: 'default',
  Picking: 'secondary',
  Delayed: 'outline',
  Ready: 'secondary',
}

const opsSeries: OpsMetricPoint[] = [
  { date: '2026-05-06', orders: 112, revenue: 30200, pickingAccuracy: 95.1 },
  { date: '2026-05-07', orders: 118, revenue: 32400, pickingAccuracy: 95.6 },
  { date: '2026-05-08', orders: 124, revenue: 33100, pickingAccuracy: 96.0 },
  { date: '2026-05-09', orders: 121, revenue: 31800, pickingAccuracy: 95.8 },
  { date: '2026-05-10', orders: 129, revenue: 34200, pickingAccuracy: 96.2 },
  { date: '2026-05-11', orders: 133, revenue: 35100, pickingAccuracy: 96.5 },
  { date: '2026-05-12', orders: 137, revenue: 36300, pickingAccuracy: 96.8 },
  { date: '2026-05-13', orders: 141, revenue: 37600, pickingAccuracy: 97.1 },
  { date: '2026-05-14', orders: 146, revenue: 39100, pickingAccuracy: 97.3 },
  { date: '2026-05-15', orders: 152, revenue: 41200, pickingAccuracy: 97.6 },
  { date: '2026-05-16', orders: 149, revenue: 40500, pickingAccuracy: 97.4 },
  { date: '2026-05-17', orders: 155, revenue: 42600, pickingAccuracy: 97.8 },
  { date: '2026-05-18', orders: 159, revenue: 43900, pickingAccuracy: 98.0 },
  { date: '2026-05-19', orders: 163, revenue: 45100, pickingAccuracy: 98.2 },
]

const opsChartConfig = {
  orders: { label: 'Orders', color: 'var(--chart-1)' },
  pickingAccuracy: { label: 'Picking Accuracy', color: 'var(--chart-3)' },
  revenue: { label: 'Revenue', color: 'var(--chart-2)' },
}

export default function DashboardPage() {
  const [query, setQuery] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date('2026-05-13'),
    to: new Date('2026-05-19'),
  })

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim()
    if (!normalizedQuery) return orders
    return orders.filter((order) =>
      [order.orderId, order.customer, order.warehouse, order.status].some((v) =>
        v.toLowerCase().includes(normalizedQuery),
      ),
    )
  }, [query])

  const filteredOpsSeries = useMemo(() => {
    if (!dateRange?.from && !dateRange?.to) return opsSeries
    return opsSeries.filter((point) => {
      const pointDate = new Date(`${point.date}T00:00:00`)
      const from = dateRange?.from ? new Date(dateRange.from) : undefined
      const to = dateRange?.to ? new Date(dateRange.to) : undefined
      if (from) from.setHours(0, 0, 0, 0)
      if (to) to.setHours(23, 59, 59, 999)
      return (!from || pointDate >= from) && (!to || pointDate <= to)
    })
  }, [dateRange])

  const periodSummary = useMemo(() => {
    const data = filteredOpsSeries.length > 0 ? filteredOpsSeries : opsSeries
    return {
      totalRevenue: data.reduce((s, i) => s + i.revenue, 0),
      totalOrders: data.reduce((s, i) => s + i.orders, 0),
      averageAccuracy: data.reduce((s, i) => s + i.pickingAccuracy, 0) / data.length,
    }
  }, [filteredOpsSeries])

  const columns: ITableColumnProps<OrderRow>[] = [
    { title: 'Order', key: 'orderId', dataIndex: 'orderId', width: 120 },
    { title: 'Customer', key: 'customer', dataIndex: 'customer', minWidth: 220 },
    { title: 'Warehouse', key: 'warehouse', dataIndex: 'warehouse', width: 130 },
    { title: 'Amount', key: 'amount', dataIndex: 'amount', width: 120, align: 'end' },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 120,
      render: (status) =>
        status ? <Badge label={status} variant={statusVariant[status]} /> : null,
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <AppHeader
        title="Dashboard"
        subtitle="Monitor warehouse flow, order intake, and fulfillment throughput."
        icon={{ icon: 'LayoutDashboard', variant: 'primary' }}
        actions={[
          <Avatar key="avatar" text="Alex Oemisch" />,
          <Button key="cta" label="Create Shipment" icon="Plus" />,
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="gap-3 p-4">
          <CardDescription>Open Orders</CardDescription>
          <CardTitle>248</CardTitle>
          <Badge label="+9.2% vs last week" variant="secondary" />
        </Card>
        <Card className="gap-3 p-4">
          <CardDescription>Picking Accuracy</CardDescription>
          <CardTitle>98.6%</CardTitle>
          <Progress percent={98.6} />
        </Card>
        <Card className="gap-3 p-4">
          <CardDescription>On-Time Dispatch</CardDescription>
          <CardTitle>91.4%</CardTitle>
          <Progress percent={91.4} />
        </Card>
        <Card className="gap-3 p-4">
          <CardDescription>Backorders</CardDescription>
          <CardTitle>17</CardTitle>
          <Badge label="Needs attention" variant="outline" />
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-3">
          <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Operations Analytics</CardTitle>
              <CardDescription>Trend view for orders, revenue, and picking quality.</CardDescription>
            </div>
            <div className="w-full lg:w-[320px]">
              <DateRangePicker value={dateRange} onChange={setDateRange} placeholder="Select period" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <Card className="gap-2 p-4">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle>EUR {periodSummary.totalRevenue.toLocaleString()}</CardTitle>
            </Card>
            <Card className="gap-2 p-4">
              <CardDescription>Total Orders</CardDescription>
              <CardTitle>{periodSummary.totalOrders.toLocaleString()}</CardTitle>
            </Card>
            <Card className="gap-2 p-4">
              <CardDescription>Avg Picking Accuracy</CardDescription>
              <CardTitle>{periodSummary.averageAccuracy.toFixed(1)}%</CardTitle>
            </Card>
          </CardContent>
          <CardContent className="grid gap-6 lg:grid-cols-2">
            <Card className="gap-3 p-4">
              <CardTitle className="text-base">Orders vs Picking Accuracy</CardTitle>
              <Chart<OpsMetricPoint, ChartVariant.Line>
                type={ChartVariant.Line}
                chartConfig={opsChartConfig}
                data={filteredOpsSeries}
                displayFields={['orders', 'pickingAccuracy']}
                showLegend
                height={260}
                xAxisOptions={{ dataKey: 'date', tickMargin: 8, tickFormatter: (v) => String(v).slice(5) }}
              />
            </Card>
            <Card className="gap-3 p-4">
              <CardTitle className="text-base">Daily Revenue</CardTitle>
              <Chart<OpsMetricPoint, ChartVariant.Bar>
                type={ChartVariant.Bar}
                chartConfig={opsChartConfig}
                data={filteredOpsSeries}
                displayFields={['revenue']}
                height={260}
                xAxisOptions={{ dataKey: 'date', tickMargin: 8, tickFormatter: (v) => String(v).slice(5) }}
                yAxisOptions={{ tickFormatter: (v) => `€${Math.round(Number(v) / 1000)}k` }}
              />
            </Card>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Recent Sales Orders</CardTitle>
              <CardDescription>Real-time queue from WMS and sales channels.</CardDescription>
            </div>
            <InputGroup value={query} onChange={setQuery} placeholder="Search by order, customer, warehouse">
              <InputGroupInput />
              <InputGroupAddon align="inline-left">
                <InputGroupIcon name="Search" />
              </InputGroupAddon>
            </InputGroup>
          </CardHeader>
          <CardContent>
            <DataTable<OrderRow>
              columns={columns}
              dataSource={filteredOrders}
              size="sm"
              hasColumnSeparator
              tableHeight={360}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Warehouse Snapshot</CardTitle>
            <CardDescription>Current workload and staffing balance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Dock utilization</span>
                <span>74%</span>
              </div>
              <Progress percent={74} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Wave completion</span>
                <span>62%</span>
              </div>
              <Progress percent={62} />
            </div>
            <Separator />
            <div className="grid gap-3">
              <Button label="Assign Picking Wave" variant="secondary" icon="ListChecks" />
              <Button label="Print Labels" variant="outline" icon="Printer" />
              <Button label="Escalate Delay" variant="ghost" icon="TriangleAlert" />
            </div>
          </CardContent>
          <CardFooter className="justify-start">
            <Badge label="Last sync: 09:42 CET" variant="outline" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
