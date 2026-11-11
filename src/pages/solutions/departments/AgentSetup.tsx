import type { CSSProperties } from 'react'
import { cx } from '../../../components/site/utils'
import type { Locale } from '../../../i18n'
import { departmentsPageCopy } from '../../../i18n/messages/departments'
import type { DepartmentId } from '../../../i18n/messages/shared'

/**
 * The example agent as a flat UI panel: the files it is trained on and the
 * task list it plans. Real copy, so it stays readable to assistive tech
 * (headings and lists, not an image). With motion on, the files load one by
 * one and the plan's step numbers light up in order (departments.css).
 */
export function AgentSetup({
  id,
  locale,
  className,
}: {
  id: DepartmentId
  locale: Locale
  className?: string
}) {
  const t = departmentsPageCopy[locale].detail.agent
  const agent = departmentsPageCopy[locale].solutions[id].agent

  return (
    <div className={cx('ds-panel pg-agent', className)} data-animate="custom">
      <div className="pg-agent__bar">
        <span className="pg-agent__kicker">{t.newAgent}</span>
        <span className="pg-agent__role">{agent.role}</span>
      </div>

      <div className="pg-agent__grid">
        <div className="pg-agent__files">
          <h3 className="pg-agent__label">{t.files}</h3>
          <ul>
            {agent.files.map((file, i) => (
              <li key={file} style={{ '--i': i } as CSSProperties}>
                <span className="pg-agent__ext">{file.split('.').pop()}</span>
                <span className="pg-agent__file">{file}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pg-agent__tasks">
          <h3 className="pg-agent__label">
            {t.tasks}
            <span className="pg-agent__count">{t.steps.replace('{count}', String(agent.tasks.length))}</span>
          </h3>
          <ol>
            {agent.tasks.map((task, i) => (
              <li key={task.title}>
                <span className="pg-agent__num" style={{ '--i': i } as CSSProperties}>
                  {i + 1}
                </span>
                <p>
                  <strong>{task.title}</strong>
                  <span>{task.body}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
