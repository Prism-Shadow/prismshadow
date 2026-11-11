import { useId, type CSSProperties } from 'react'
import type { BlogPost, BlogVisualPlacement } from '../../content/blogPosts'
import { cx, type PixelTone } from '../../components/site/utils'
import { coverCells, coverGeometry, coverMotion, topicTone, type CoverGeometry } from './blogData'

// Same cell geometry and styling as the shared PixelField; the faint "off" cells
// are drawn with one SVG pattern so a page of covers stays light on the DOM.
const CELL = 14
const GAP = 6
const STEP = CELL + GAP

const toneColor: Record<PixelTone, string> = {
  accent: 'var(--pg-blog-accent)',
  cyan: 'var(--ds-cyan)',
  amber: 'var(--ds-amber)',
  coral: 'var(--ds-coral)',
  green: 'var(--ds-green)',
  text: 'var(--pg-blog-ink)',
}

function CoverField({
  post,
  geometry,
  className,
  animate,
}: {
  post: BlogPost
  geometry: CoverGeometry
  className?: string
  /** Fade the cells in on view (the dark frame stays put), then keep them live. */
  animate: boolean
}) {
  const patternId = `pg-blog-cells-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const width = geometry.cols * STEP - GAP
  const height = geometry.rows * STEP - GAP
  const cells = coverCells(post, geometry)
  const motion = coverMotion(post, geometry, cells)

  return (
    <svg
      className={cx('pg-blog-cover__field', className)}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={{ '--phase': motion.phase.toFixed(3), '--period': `${motion.period}s` } as CSSProperties}
      data-animate={animate ? 'custom' : undefined}
    >
      <defs>
        <pattern id={patternId} width={STEP} height={STEP} patternUnits="userSpaceOnUse">
          <rect
            x={0.5}
            y={0.5}
            width={CELL - 1}
            height={CELL - 1}
            rx={2}
            fill="var(--pg-blog-cell)"
            stroke="var(--pg-blog-cell-line)"
          />
        </pattern>
      </defs>
      <rect width={width + GAP} height={height + GAP} fill={`url(#${patternId})`} />
      {/* Free background cells that fill and clear on their own (zero fill at rest). */}
      {motion.live.map((cell) => (
        <rect
          key={`live-${cell.c}:${cell.r}`}
          className="pg-blog-cover__live"
          x={cell.c * STEP + 0.5}
          y={cell.r * STEP + 0.5}
          width={CELL - 1}
          height={CELL - 1}
          rx={2}
          fill={toneColor[topicTone[post.topic]]}
          fillOpacity={0}
          style={{ '--k': cell.peak, '--fd': `${cell.delay}s`, '--ft': `${cell.period}s` } as CSSProperties}
        />
      ))}
      {cells.map((cell) => {
        const color = toneColor[cell.tone ?? 'accent']
        // Outlined cells keep their colour at zero fill, so the wave can fill them solid.
        // The white focal cells hold still; the rest of the motif rides the wave.
        const kind = cell.outline ? 'outline' : cell.dim ? 'dim' : cell.tone === 'text' ? 'focal' : 'solid'
        return (
          <rect
            key={`${cell.c}:${cell.r}`}
            x={cell.c * STEP + 0.5}
            y={cell.r * STEP + 0.5}
            width={CELL - 1}
            height={CELL - 1}
            rx={2}
            fill={color}
            fillOpacity={cell.outline ? 0 : undefined}
            stroke={color}
            opacity={cell.dim ? 0.45 : 1}
            data-wave={kind}
            style={{ '--w': motion.wave.get(`${cell.c}:${cell.r}`) ?? 0 } as CSSProperties}
          />
        )
      })}
    </svg>
  )
}

/**
 * A post's visual for one placement (index card, featured card, article
 * header). Genuine post images are used as-is; every other post gets a
 * code-built cover: a pixel field with the post's motif, lit in its topic tone,
 * and the post's short label set in it.
 *
 * Motion (blog.css): featured media rise in with the default reveal (the
 * card's media frame carries `data-animate`). Everywhere else the cover's
 * dark frame and label stay put while its pixel field (or image) fades in on
 * view. A code-built cover then stays live: a solid wave sweeps its motif
 * (dim cells brighten, outlined cells fill solid) along an axis and at a pace
 * seeded by the post, and a few free cells fill and clear on their own.
 * Nothing moves inside the prose.
 */
export function BlogCover({
  post,
  placement,
  workflowLabel,
  lang,
}: {
  post: BlogPost
  placement: BlogVisualPlacement
  /** Accessible name of the workflow strip (article placement only). */
  workflowLabel?: string
  /** Language of the post text in the cover, when it differs from the page. */
  lang?: string
}) {
  const isArticle = placement === 'article'
  // Featured media already rise in as a whole; other placements fade the content in.
  const animate = placement !== 'featured'

  if (post.visualImage) {
    return (
      <div
        className={cx(
          'pg-blog-cover',
          'pg-blog-cover--image',
          `pg-blog-cover--${placement}`,
          post.visualImageLayout === 'wide' && 'pg-blog-cover--wide',
        )}
      >
        <div className="pg-blog-cover__stage">
          <img
            className="pg-blog-cover__image"
            data-animate={animate ? 'custom' : undefined}
            src={post.visualImage.src}
            // Cards repeat the title right below, so their image is decorative.
            alt={isArticle ? post.visualImage.alt : ''}
            lang={isArticle ? lang : undefined}
            width={post.visualImage.width}
            height={post.visualImage.height}
            decoding="async"
            loading={isArticle ? 'eager' : 'lazy'}
          />
        </div>
      </div>
    )
  }

  const steps = isArticle ? (post.visualSteps ?? []) : []
  const tone = topicTone[post.topic]

  return (
    <div className={cx('pg-blog-cover', `pg-blog-cover--${placement}`)} data-tone={tone}>
      <div className="pg-blog-cover__stage" aria-hidden="true">
        {isArticle ? (
          <>
            <CoverField
              post={post}
              geometry={coverGeometry.wide}
              className="pg-blog-cover__field--wide"
              animate={animate}
            />
            <CoverField
              post={post}
              geometry={coverGeometry.compact}
              className="pg-blog-cover__field--compact"
              animate={animate}
            />
          </>
        ) : (
          <CoverField post={post} geometry={coverGeometry.compact} animate={animate} />
        )}
        <span className="pg-blog-cover__brand">
          <img src="/prism-shadow-mark-white.png" alt="" width={14} height={14} />
          PrismShadow
        </span>
        <span className="pg-blog-cover__label">{post.visualLabel}</span>
      </div>
      {steps.length ? (
        <ol className="pg-blog-cover__steps" aria-label={workflowLabel}>
          {steps.map((step, index) => (
            <li className="pg-blog-cover__step" key={step}>
              <span className="pg-blog-cover__step-index" aria-hidden="true">
                <span
                  className={cx(
                    'pg-blog-cover__step-dot',
                    index === steps.length - 1 && 'pg-blog-cover__step-dot--final',
                  )}
                />
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="pg-blog-cover__step-label" lang={lang}>
                {step}
              </span>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}
