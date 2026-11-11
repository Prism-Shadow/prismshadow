import type { CSSProperties } from 'react'

/**
 * Placement of each founder cut-out inside its frame, as percentages
 * (width/left of the frame width, top of the frame height).
 *
 * The source PNGs are framed differently (head size, headroom, a baked-in
 * shadow under the torso). These values put every head at the same size and
 * height, centre the face, and push the torso's flat bottom edge just past the
 * frame's bottom edge.
 */

/** 4:3 portrait frames on the People page. */
export const founderPhotoFrames: Record<string, CSSProperties> = {
  '/about/founders/buyue.png': { width: '98.25%', left: '5.2%', top: '12.5%' },
  '/about/founders/xuejun.png': { width: '87.9%', left: '2.75%', top: '11.3%' },
  '/about/founders/yaowei.png': { width: '76.5%', left: '11.7%', top: '1.3%' },
}

/** Square frames (round avatars in the About team teaser). */
export const founderAvatarFrames: Record<string, CSSProperties> = {
  '/about/founders/buyue.png': { width: '131%', left: '-9.7%', top: '12.5%' },
  '/about/founders/xuejun.png': { width: '117.2%', left: '-13%', top: '11.3%' },
  '/about/founders/yaowei.png': { width: '102%', left: '-1.1%', top: '1.3%' },
}
