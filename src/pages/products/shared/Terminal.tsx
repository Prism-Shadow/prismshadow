import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { cx } from '../../../components/site/utils'
import { CheckIcon, CopyIcon } from './icons'

export type TerminalLine = { cmd: string; comment?: string }

export type TerminalTab = { id: string; label: string; lines: TerminalLine[] }

/** Each tab's rows in typing order: a comment, then its command, then the caret. */
function rowOrder(lines: TerminalLine[]) {
  let order = 0
  const rows = lines.map((line) => ({
    comment: line.comment ? order++ : -1,
    cmd: order++,
  }))
  return { rows, caret: order }
}

const at = (order: number) => ({ '--i': order }) as CSSProperties

/**
 * Flat terminal panel. With more than one tab the title bar becomes a WAI-ARIA tab
 * list. Comments render on their own line above the command; long commands wrap.
 *
 * Motion: when the terminal enters view its rows appear one by one, then the caret
 * blinks. A standalone terminal is its own motion visual (`data-animate`); pass
 * `reveal={false}` when a parent visual already carries it.
 */
export function Terminal({
  idBase,
  label,
  tabs,
  copyLabel,
  copiedLabel,
  className,
  reveal = true,
}: {
  idBase: string
  label: string
  tabs: TerminalTab[]
  copyLabel: string
  copiedLabel: string
  className?: string
  reveal?: boolean
}) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const hasTabs = tabs.length > 1

  useEffect(() => {
    const pending = timer
    return () => window.clearTimeout(pending.current)
  }, [])

  const select = (index: number) => {
    const next = (index + tabs.length) % tabs.length
    setActive(next)
    setCopied(false)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') select(index + 1)
    else if (event.key === 'ArrowLeft') select(index - 1)
    else if (event.key === 'Home') select(0)
    else if (event.key === 'End') select(tabs.length - 1)
    else return
    event.preventDefault()
  }

  const copy = () => {
    const text = tabs[active].lines.map((line) => line.cmd).join('\n')
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        setCopied(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(false), 1800)
      })
      .catch(() => {})
  }

  return (
    <div className={cx('ds-panel', 'pg-product__terminal', className)} data-animate={reveal ? '' : undefined}>
      <div className="pg-product__terminal-bar">
        {hasTabs ? (
          <div className="pg-product__terminal-tabs" role="tablist" aria-label={label}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`${idBase}-tab-${tab.id}`}
                aria-controls={`${idBase}-panel-${tab.id}`}
                aria-selected={index === active}
                tabIndex={index === active ? 0 : -1}
                className="pg-product__terminal-tab"
                onClick={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="pg-product__terminal-title">{label}</span>
        )}
        <button
          type="button"
          className="pg-product__terminal-copy"
          onClick={copy}
          aria-label={copied ? copiedLabel : copyLabel}
          title={copyLabel}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      {tabs.map((tab, index) => {
        const order = rowOrder(tab.lines)
        return (
          <div
            key={tab.id}
            className="pg-product__terminal-body"
            {...(hasTabs
              ? {
                  role: 'tabpanel',
                  id: `${idBase}-panel-${tab.id}`,
                  'aria-labelledby': `${idBase}-tab-${tab.id}`,
                  tabIndex: 0,
                }
              : {})}
            hidden={index !== active}
          >
            <pre className="pg-product__terminal-code">
              <code>
                {tab.lines.map((line, i) => (
                  <span className="pg-product__terminal-line" key={i}>
                    {line.comment ? (
                      <span className="pg-product__terminal-comment" style={at(order.rows[i].comment)}>
                        # {line.comment}
                      </span>
                    ) : null}
                    <span className="pg-product__terminal-cmd" style={at(order.rows[i].cmd)}>
                      <span className="pg-product__terminal-prompt" aria-hidden="true">
                        $
                      </span>
                      {line.cmd}
                    </span>
                  </span>
                ))}
                <span className="pg-product__terminal-line" aria-hidden="true">
                  <span className="pg-product__terminal-cmd" style={at(order.caret)}>
                    <span className="pg-product__terminal-prompt">$</span>
                    <span className="pg-product__terminal-caret" />
                  </span>
                </span>
              </code>
            </pre>
          </div>
        )
      })}
    </div>
  )
}
