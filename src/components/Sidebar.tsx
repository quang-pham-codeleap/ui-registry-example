import { useLocation, useNavigate } from 'react-router-dom'
import { Icon, type LucideIconName } from '@/components/jtl/icon'
import {
  Sidebar as JTLSidebar,
  SidebarGroup,
  SidebarItem,
  SidebarItemIcon,
  SidebarHeader,
  SidebarToggle,
} from '@/components/jtl/sidebar'

interface NavItem {
  label: string
  to: string
  icon: LucideIconName
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: 'LayoutDashboard' },
  { label: 'Orders', to: '/orders', icon: 'ShoppingCart' },
  { label: 'Warehouses', to: '/warehouses', icon: 'Warehouse' },
  { label: 'Components', to: '/components', icon: 'Package' },
  { label: 'Icons', to: '/icons', icon: 'Image' },
]

const bottomItems: NavItem[] = [
  { label: 'Settings', to: '/settings', icon: 'Settings' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <JTLSidebar className="h-screen" width="224px" collapsedWidth="56px">
      <SidebarToggle />

      <SidebarHeader className="h-14 flex items-center px-3">
        <span className="truncate pl-1 text-sm font-semibold tracking-tight">JTL ERP</span>
      </SidebarHeader>

      <SidebarGroup>
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SidebarNavItem key={item.to} item={item} isActive={isRouteActive(location.pathname, item.to)} onClick={() => navigate(item.to)} />
          ))}
        </ul>
      </SidebarGroup>

      <SidebarGroup hasDivider className="mt-auto">
        <ul className="flex flex-col gap-1">
          {bottomItems.map((item) => (
            <SidebarNavItem key={item.to} item={item} isActive={isRouteActive(location.pathname, item.to)} onClick={() => navigate(item.to)} />
          ))}
        </ul>
      </SidebarGroup>
    </JTLSidebar>
  )
}

function SidebarNavItem({ item, isActive, onClick }: { item: NavItem; isActive: boolean; onClick: () => void }) {
  return (
    <SidebarItem label={item.label} isActive={isActive} onClick={onClick}>
      <SidebarItemIcon>
        <Icon name={item.icon} size={16} />
      </SidebarItemIcon>
    </SidebarItem>
  )
}

function isRouteActive(pathname: string, to: string) {
  if (to === '/') {
    return pathname === '/'
  }

  return pathname === to || pathname.startsWith(`${to}/`)
}
