import type { ReactNode } from 'react'

export function PageHeader({ eyebrow, title, copy, action }: {
  eyebrow: string; title: string; copy: string; action?: ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{copy}</p>
      </div>
      {action}
    </div>
  )
}
