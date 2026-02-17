import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { Card, Badge, ViewCounter } from '@/components/ui'
import { resumeData } from '@/data/resume'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Technical articles on machine learning, data science, and engineering.',
}

/**
 * Writing Page
 * 
 * SOURCE: resume.ts publications + original articles
 * Implements blog/writing section per DEVELOPMENT_PLAN.md
 */

const articles = [
  {
    id: 'customer-churn-analysis',
    title: 'Customer Churn Analysis Using Supervised Learning Algorithms',
    summary: 'A deep dive into predicting customer churn using Logistic Regression and ensemble methods. Includes business impact analysis of predictive analytics.',
    date: 'May 2025',
    readingTime: 8,
    category: 'Case Study',
    tags: ['Machine Learning', 'Classification', 'Business Analytics'],
    featured: true,
    source: 'publication', // From resume
  },
  {
    id: 'real-estate-price-prediction',
    title: 'Predictive Modeling for Real Estate Price Estimation Using Machine Learning',
    summary: 'Exploring regression-based models for housing price prediction. Comparing Linear Regression, Random Forest, and feature-engineered approaches.',
    date: 'March 2025',
    readingTime: 10,
    category: 'Technical Publication',
    tags: ['Machine Learning', 'Regression', 'Feature Engineering'],
    featured: true,
    source: 'publication', // From resume
  },
  {
    id: 'cross-validation-guide',
    title: 'A Practical Guide to Cross-Validation',
    summary: 'Why holdout validation isn\'t enough, and how to implement K-Fold, Stratified, and Time Series cross-validation correctly.',
    date: 'February 2025',
    readingTime: 6,
    category: 'Tutorial',
    tags: ['Machine Learning', 'Model Evaluation', 'Best Practices'],
    featured: false,
    source: 'blog',
  },
  {
    id: 'feature-engineering-lessons',
    title: 'Feature Engineering Lessons from Real Projects',
    summary: 'Domain knowledge beats automated feature generation. Lessons learned from building production ML pipelines.',
    date: 'January 2025',
    readingTime: 7,
    category: 'Lessons Learned',
    tags: ['Feature Engineering', 'Data Science', 'Production ML'],
    featured: false,
    source: 'blog',
  },
  {
    id: 'handling-imbalanced-data',
    title: 'The Truth About Handling Imbalanced Datasets',
    summary: 'SMOTE isn\'t always the answer. A balanced look at techniques for dealing with class imbalance in real-world problems.',
    date: 'December 2024',
    readingTime: 9,
    category: 'Deep Dive',
    tags: ['Machine Learning', 'Data Preprocessing', 'Classification'],
    featured: false,
    source: 'blog',
  },
]

export default function WritingPage() {
  const featuredArticles = articles.filter(a => a.featured)
  const otherArticles = articles.filter(a => !a.featured)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-bold mb-4">Writing</h1>
          <p className="text-xl text-[var(--muted)]">
            Technical articles sharing what I've learned about machine learning, 
            data science, and building reliable systems.
          </p>
        </div>

        {/* Featured articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-6">
              Featured Publications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} variant="interactive" className="flex flex-col">
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge variant="primary">{article.category}</Badge>
                      {article.source === 'publication' && (
                        <Badge variant="success">Published</Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                    <p className="text-[var(--muted)] mb-4">{article.summary}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-xs text-[var(--muted)]">
                          #{tag.replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 pb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readingTime} min read
                      </span>
                      <ViewCounter slug={article.id} increment={false} />
                    </div>
                    <Link 
                      href={`/writing/${article.id}`}
                      className="inline-flex items-center gap-2 text-primary-500 text-sm font-medium group"
                    >
                      Read
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All articles */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-6">
            All Articles
          </h2>
          <div className="space-y-4">
            {otherArticles.map((article) => (
              <Link key={article.id} href={`/writing/${article.id}`}>
                <Card variant="interactive" className="flex items-center gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="default" size="sm">{article.category}</Badge>
                    </div>
                    <h3 className="font-semibold truncate">{article.title}</h3>
                    <p className="text-sm text-[var(--muted)] truncate">{article.summary}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[var(--muted)] shrink-0">
                    <span className="hidden sm:flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readingTime} min
                    </span>
                    <ViewCounter slug={article.id} increment={false} />
                    <span>{article.date}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
