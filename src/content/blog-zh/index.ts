/*
 * Chinese versions of the blog posts, keyed by slug. Each group file holds the
 * translations of a few posts; blogZh.test.ts checks that every post has one
 * and that it mirrors the English structure exactly.
 */
import type { BlogPostZh } from '../blogPosts'
import { industriesZh } from './industries'
import { productZh } from './product'
import { researchZh } from './research'
import { saasDealersRestaurantsZh } from './saasDealersRestaurants'
import { supplyChainZh } from './supplyChain'

export const blogPostsZh: Record<string, BlogPostZh> = {
  ...supplyChainZh,
  ...industriesZh,
  ...saasDealersRestaurantsZh,
  ...productZh,
  ...researchZh,
}
