import { useEffect, useRef, useState } from 'react'
import { AppHeader } from '@/components/jtl/app-header'
import { Badge } from '@/components/jtl/badge'
import { Button } from '@/components/jtl/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/jtl/card'
import { Progress } from '@/components/jtl/progress'
import { Separator } from '@/components/jtl/separator'

const warehouses = [
  { name: 'Berlin', dockUtilization: 74, waveCompletion: 62, staff: 18, capacity: 85 },
  { name: 'Hamburg', dockUtilization: 91, waveCompletion: 78, staff: 22, capacity: 92 },
  { name: 'Cologne', dockUtilization: 55, waveCompletion: 44, staff: 14, capacity: 60 },
  { name: 'Munich', dockUtilization: 83, waveCompletion: 71, staff: 20, capacity: 88 },
]

export default function WarehousePage() {
  const [isSyncingWms, setIsSyncingWms] = useState(false)
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current)
      }
    }
  }, [])

  const handleSyncWms = () => {
    if (isSyncingWms) {
      return
    }

    setIsSyncingWms(true)
    syncTimeoutRef.current = setTimeout(() => {
      setIsSyncingWms(false)
      syncTimeoutRef.current = null
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <AppHeader
        title="Warehouses"
        subtitle="Monitor workload, staffing, and capacity across all sites."
        icon={{ icon: 'Warehouse', variant: 'primary' }}
        actions={[
          <Button key="sync" label="Sync WMS" icon="RefreshCw" variant="outline" isLoading={isSyncingWms} onClick={handleSyncWms} />,
        ]}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {warehouses.map((wh) => (
          <Card key={wh.name}>
            <CardHeader>
              <CardTitle>{wh.name}</CardTitle>
              <CardDescription>{wh.staff} active staff members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>Dock utilization</span>
                  <span>{wh.dockUtilization}%</span>
                </div>
                <Progress percent={wh.dockUtilization} />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>Wave completion</span>
                  <span>{wh.waveCompletion}%</span>
                </div>
                <Progress percent={wh.waveCompletion} />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>Capacity used</span>
                  <span>{wh.capacity}%</span>
                </div>
                <Progress percent={wh.capacity} />
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button label="Assign Wave" variant="secondary" size="sm" icon="ListChecks" />
                <Button label="Print Labels" variant="outline" size="sm" icon="Printer" />
              </div>
            </CardContent>
            <CardFooter>
              <Badge label={wh.capacity >= 90 ? 'Near capacity' : 'Operational'} variant={wh.capacity >= 90 ? 'outline' : 'secondary'} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
