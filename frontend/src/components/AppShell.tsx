import { Box, Menu, Plus, Route as RouteIcon, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: '工作台', icon: Box, end: true },
  { to: '/jobs/new', label: '新建重建', icon: Plus },
  { to: '/trajectory', label: '轨迹查看器', icon: RouteIcon },
]

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="CAM TRACE 首页">
          <span className="brand-mark">C//T</span>
          <span>CAM//TRACE</span>
        </NavLink>
        <nav className={open ? 'nav nav-open' : 'nav'} aria-label="主导航">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}>
              <Icon size={18} strokeWidth={3} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="system-badge"><i /> MOCK SYSTEM</div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="切换导航">
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <main>{children}</main>
      <footer>
        <strong>CAM//TRACE © 2026</strong>
        <span>CAMERA MOTION, MADE VISIBLE.</span>
        <span>API MODE: MOCK</span>
      </footer>
    </div>
  )
}
