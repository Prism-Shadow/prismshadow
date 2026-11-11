import { Phrases } from './Phrases'

/** Agent role and the question it answers, as a compact definition list. */
export function AgentQuote({
  roleLabel,
  role,
  questionLabel,
  question,
}: {
  roleLabel: string
  role: string
  questionLabel: string
  question: string
}) {
  return (
    <dl className="pg-departments__facts">
      <div>
        <dt>{roleLabel}</dt>
        <dd className="pg-departments__role">{role}</dd>
      </div>
      <div>
        <dt>{questionLabel}</dt>
        <dd>
          <Phrases text={question} />
        </dd>
      </div>
    </dl>
  )
}
