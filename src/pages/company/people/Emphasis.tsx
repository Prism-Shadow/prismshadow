/** Render a credential line, setting `**…**` runs in full-strength ink (weight stays regular). */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split('**')
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="pg-people-em">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
