import { useState, type KeyboardEvent } from 'react'

/**
 * WAI-ARIA tabs with automatic activation: arrow keys (both axes, so the list
 * can switch between vertical and horizontal layouts), Home and End move the
 * selection and the focus together. SSR-safe: the first tab is selected on the
 * server and nothing touches the DOM until a key is pressed.
 *
 * `idBase` must be unique on the page; tab ids are `${idBase}-tab-${i}` and
 * panel ids `${idBase}-panel-${i}`.
 */
export function useTabList(idBase: string, count: number, initial = 0) {
  const [selected, setSelected] = useState(initial)
  const active = Math.min(selected, Math.max(count - 1, 0))

  const select = (index: number, focus = false) => {
    setSelected(index)
    if (focus && typeof document !== 'undefined') {
      document.getElementById(`${idBase}-tab-${index}`)?.focus()
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (count < 1) return
    let next: number | null = null
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (active + 1) % count
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (active - 1 + count) % count
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = count - 1
    if (next === null) return
    event.preventDefault()
    select(next, true)
  }

  const tabProps = (index: number) => ({
    id: `${idBase}-tab-${index}`,
    type: 'button' as const,
    role: 'tab' as const,
    'aria-selected': index === active,
    'aria-controls': `${idBase}-panel-${index}`,
    tabIndex: index === active ? 0 : -1,
    onClick: () => select(index),
    onKeyDown,
  })

  const panelProps = (index: number) => ({
    id: `${idBase}-panel-${index}`,
    role: 'tabpanel' as const,
    'aria-labelledby': `${idBase}-tab-${index}`,
    hidden: index !== active,
    tabIndex: 0,
  })

  return { selected: active, select, tabProps, panelProps }
}
