import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import DashboardPage from './pages/DashboardPage'
import OrdersPage from './pages/OrdersPage'
import WarehousePage from './pages/WarehousePage'
import SettingsPage from './pages/SettingsPage'
import IconsPage from './pages/IconsPage'
import ComponentsPage from './pages/ComponentsPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-[var(--muted)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 md:p-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/warehouses" element={<WarehousePage />} />
              <Route path="/components" element={<ComponentsPage />} />
              <Route path="/icons" element={<IconsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
