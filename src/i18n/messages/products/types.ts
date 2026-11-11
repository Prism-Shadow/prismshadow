// Shared copy shapes for the three product pages (PenguinHarness, Panofy, LlamaFactory).

export type LinkCopy = { label: string; href: string }

export type FeatureCopy = { title: string; body: string }

export type StatCopy = { value: string; label: string }

export type SectionHeadCopy = {
  eyebrow: string
  title: string
  /** Substring of `title` rendered in the accent color. */
  titleAccent: string
  lead: string
}

/** One tab of a product page's modal-style "how it works" section. */
export type TabCopy = {
  id: string
  label: string
  title: string
  body: string
  points: FeatureCopy[]
}

export type CtaCopy = {
  title: string
  titleAccent: string
  body: string
  primary: LinkCopy
  secondary: LinkCopy
}
