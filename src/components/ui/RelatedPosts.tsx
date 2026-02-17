import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Card, Badge } from '@/components/ui'

/**
 * Related Posts Component
 * 
 * Shows related articles based on tags or category
 * For content discovery and engagement
 */

interface RelatedPost {
  id: string
  title: string
  summary: string
  url: string
  category: string
  readingTime?: number
  tags?: string[]
}

interface RelatedPostsProps {
  posts: RelatedPost[]
  title?: string
  className?: string
}

export function RelatedPosts({ 
  posts, 
  title = 'Related Articles',
  className 
}: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className={className}>
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={post.url}>
            <Card
              variant="interactive"
              className="h-full p-5 group"
            >
              <div className="flex flex-col h-full">
                <Badge variant="secondary" className="self-start mb-3 text-xs">
                  {post.category}
                </Badge>
                
                <h3 className="font-semibold mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-sm text-[var(--muted)] line-clamp-2 flex-1">
                  {post.summary}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--border)]">
                  {post.readingTime && (
                    <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                      <Clock className="w-3 h-3" />
                      {post.readingTime} min read
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-primary-500 group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

/**
 * Helper function to find related posts based on matching tags
 */
export function findRelatedPosts(
  currentPostId: string,
  currentTags: string[],
  allPosts: RelatedPost[],
  limit: number = 3
): RelatedPost[] {
  return allPosts
    .filter((post) => post.id !== currentPostId)
    .map((post) => ({
      ...post,
      matchScore: post.tags?.filter((tag) => currentTags.includes(tag)).length || 0,
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit)
}
