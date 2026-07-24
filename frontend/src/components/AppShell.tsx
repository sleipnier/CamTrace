import { Menu, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { request } from '../api/http'

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const health = useQuery({
    queryKey: ['api-health'],
    queryFn: () => request<{ status: string }>('/health'),
    refetchInterval: 15_000,
    retry: false,
  })
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="CAM TRACE 首页">
          <span className="brand-mark">C//T</span>
          <span>CAM//TRACE</span>
        </NavLink>
        <nav className={open ? 'nav nav-open' : 'nav'} aria-label="页面导航">
          <a href="#workspace" onClick={() => setOpen(false)}>开始重建</a>
          <a href="#queue" onClick={() => setOpen(false)}>任务队列</a>
          <a href="#about" onClick={() => setOpen(false)}>数据说明</a>
        </nav>
        <div className={`system-badge ${health.isError ? 'system-offline' : ''}`}><i /> {health.data?.status === 'ok' ? 'API ONLINE' : health.isError ? 'API OFFLINE' : 'API CHECKING'}</div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="切换导航">
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <main>{children}</main>
      <footer>
        <strong>CAM//TRACE © 2026</strong>
        <span>CAMERA MOTION, MADE VISIBLE.</span>
        <span>DATA SOURCE: MEGASAM</span>
      </footer>
    </div>
  )
}
