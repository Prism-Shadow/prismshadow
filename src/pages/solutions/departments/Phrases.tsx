import './phrases.css'

const MARK = '​'

/**
 * Line control for headings. Copy may mark preferred break points with U+200B
 * (zero-width space); each marked phrase is kept on one line when it fits, so
 * Chinese headings break between phrases instead of inside a word. Strings
 * without the marker render unchanged.
 */
export function Phrases({ text }: { text: string }) {
  if (!text.includes(MARK)) return <>{text}</>
  return (
    <>
      {text.split(MARK).map((part, i) => (
        <span key={i} className="pg-phrase">
          {part}
        </span>
      ))}
    </>
  )
}

/** `text` with `accent` (a substring) in the accent colour, kept on one line. */
export function AccentPhrase({ text, accent }: { text: string; accent: string }) {
  const i = text.indexOf(accent)
  if (i < 0) return <Phrases text={text} />
  return (
    <>
      {text.slice(0, i)}
      <span className="ds-accent-text pg-phrase">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  )
}
