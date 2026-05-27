import { useEffect, useState } from 'react'
import { AppHeader } from '@/components/jtl/app-header'
import { Badge } from '@/components/jtl/badge'
import { Button } from '@/components/jtl/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/jtl/card'
import { Field, FieldControl, FieldLabel } from '@/components/jtl/field'
import { InputGroup, InputGroupInput } from '@/components/jtl/input-group'
import { Separator } from '@/components/jtl/separator'

type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'

const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const isDarkMode = theme === 'dark'

    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="flex flex-col gap-6">
      <AppHeader
        title="Settings"
        subtitle="Manage your application preferences and integrations."
        icon={{ icon: 'Settings', variant: 'primary' }}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
            <CardDescription>Basic details for your ERP workspace.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="settings-company-name">Company name</FieldLabel>
              <FieldControl>
                <InputGroup id="settings-company-name" value="JTL Software GmbH" onChange={() => {}}>
                  <InputGroupInput />
                </InputGroup>
              </FieldControl>
            </Field>
            <Field>
              <FieldLabel htmlFor="settings-erp-instance-url">ERP instance URL</FieldLabel>
              <FieldControl>
                <InputGroup id="settings-erp-instance-url" value="https://erp.jtl.de" onChange={() => {}}>
                  <InputGroupInput />
                </InputGroup>
              </FieldControl>
            </Field>
            <Button label="Save changes" icon="Save" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Personalize how the workspace looks.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">Choose between light and dark mode.</p>
              </div>
              <Badge
                label={theme === 'dark' ? 'Dark mode' : 'Light mode'}
                variant={theme === 'dark' ? 'default' : 'secondary'}
              />
            </div>
            <Button
              label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              icon={theme === 'dark' ? 'Sun' : 'Moon'}
              variant="outline"
              onClick={toggleTheme}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connected systems and API status.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">WMS Connector</p>
                <p className="text-sm text-muted-foreground">Warehouse management sync</p>
              </div>
              <Badge label="Connected" variant="secondary" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Shop API</p>
                <p className="text-sm text-muted-foreground">E-commerce channel bridge</p>
              </div>
              <Badge label="Connected" variant="secondary" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Shipping Provider</p>
                <p className="text-sm text-muted-foreground">DHL / DPD label generation</p>
              </div>
              <Badge label="Disconnected" variant="outline" />
            </div>
            <Button label="Manage integrations" variant="outline" icon="Plug" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
