import { useMemo, useState } from 'react'
import { AppHeader } from '@/components/jtl/app-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/jtl/card'
import { Icon } from '@/components/jtl/icon'
import { InputGroup, InputGroupAddon, InputGroupIcon, InputGroupInput } from '@/components/jtl/input-group'
import { CustomIconName } from '@/components/jtl/icon/custom-icon'
import { Tooltip } from '@/components/jtl/tooltip'

const customIconNames = Object.values(CustomIconName)
  .slice()
  .sort((a, b) => a.localeCompare(b)) as Array<keyof typeof CustomIconName>

export default function IconsPage() {
  const [query, setQuery] = useState('')

  const filteredIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return customIconNames
    }

    return customIconNames.filter((iconName) => iconName.toLowerCase().includes(normalizedQuery))
  }, [query])

  return (
    <div className="flex flex-col gap-6">
      <AppHeader
        title="Icons"
        subtitle="Browse all available custom icons rendered through the shared Icon component."
        icon={{ icon: 'Image', variant: 'primary' }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Custom Icons</CardTitle>
          <CardDescription>
            Showing {filteredIcons.length} of {customIconNames.length} custom icons.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="max-w-md">
            <InputGroup value={query} onChange={setQuery} placeholder="Search custom icons by name">
              <InputGroupInput />
              <InputGroupAddon align="inline-left">
                <InputGroupIcon name="Search" />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {filteredIcons.map((iconName) => (
              <Tooltip key={iconName} content={iconName}>
                <div className="flex h-14 w-full items-center justify-center rounded-[var(--border-radius-md)] bg-[var(--muted)]/35 text-card-foreground transition-colors hover:bg-[var(--muted)]/60">
                  <Icon name={iconName} size={24} />
                </div>
              </Tooltip>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}