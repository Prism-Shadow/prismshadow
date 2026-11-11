import type { AboutPageCopy } from '../../../i18n/messages/about'
import { DiamondIcon } from '../../../components/site/icons'

const stageTones = ['cyan', 'amber', 'green', 'accent'] as const

/**
 * The platform loop: four stages on a clockwise track around the PrismShadow
 * core. Built in HTML so labels stay crisp and translatable at every width;
 * the track, arrows and travelling cell are CSS. It sits borderless on the
 * canvas over a faint dot field that dissolves toward its edges. The whole figure is one image
 * for assistive tech, described by `copy.ariaLabel`.
 *
 * Motion (about.css, motion contract): the figure rises in when it enters
 * view, and while it is in view one lit cell travels the loop. At rest (no
 * JS, reduced motion, prerendered HTML) the cell is simply not shown.
 */
export function PlatformLoop({ copy }: { copy: AboutPageCopy['loop'] }) {
  return (
    <div className="pg-about-loop" role="img" aria-label={copy.ariaLabel} data-animate="">
      <div className="pg-about-loop__grid">
        <div className="pg-about-loop__track" aria-hidden="true">
          <span className="pg-about-loop__arrow pg-about-loop__arrow--top" />
          <span className="pg-about-loop__arrow pg-about-loop__arrow--right" />
          <span className="pg-about-loop__arrow pg-about-loop__arrow--bottom" />
          <span className="pg-about-loop__arrow pg-about-loop__arrow--left" />
          <span className="pg-about-loop__pulse" />
        </div>

        {copy.stages.map((stage, index) => (
          <div
            key={stage.name}
            className={`pg-about-loop__node pg-about-loop__node--${index + 1}`}
            data-tone={stageTones[index]}
          >
            <span className="pg-about-loop__node-head">
              <span className="pg-about-loop__dot" />
              <span className="pg-about-loop__index">{String(index + 1).padStart(2, '0')}</span>
            </span>
            <span className="pg-about-loop__name">{stage.name}</span>
            <span className="pg-about-loop__detail">{stage.detail}</span>
          </div>
        ))}

        <div className="pg-about-loop__core">
          <span className="pg-about-loop__core-chip">
            <DiamondIcon />
            {copy.core}
          </span>
          <span className="pg-about-loop__core-detail">{copy.coreDetail}</span>
        </div>
      </div>
    </div>
  )
}
