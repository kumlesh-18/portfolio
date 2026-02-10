import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { resumeData } from '@/data/resume'
import { Card, Badge, Button } from '@/components/ui'

interface Props {
  params: { slug: string }
}

// Article content
const articlesContent: Record<string, {
  title: string
  date: string
  readingTime: number
  category: string
  tags: string[]
  content: string[]
}> = {
  'customer-churn-analysis': {
    title: 'Customer Churn Analysis Using Supervised Learning Algorithms',
    date: 'May 2025',
    readingTime: 8,
    category: 'Case Study',
    tags: ['Machine Learning', 'Classification', 'Business Analytics'],
    content: [
      `## Introduction

Customer churn — the loss of customers to competitors — is one of the most expensive problems in business. For subscription-based companies, reducing churn by just 5% can increase profits by 25-95%. In this study, I investigated how supervised learning algorithms can predict which customers are likely to churn.`,

      `## The Problem

The dataset contained 10,000+ customer records with features including:
- Account age and tenure
- Usage patterns and frequency
- Customer support interactions
- Billing history and payment behavior
- Demographic information

The target variable was binary: churned (1) or retained (0). The dataset was imbalanced with approximately 20% churn rate.`,

      `## Methodology

### Data Preprocessing
- Handled missing values using domain-appropriate imputation
- Encoded categorical variables using one-hot encoding
- Scaled numerical features using StandardScaler
- Addressed class imbalance using stratified sampling

### Feature Engineering
- Created interaction features (e.g., support_calls_per_month)
- Extracted temporal features from account activity
- Built aggregate features from transaction history

### Model Training
Two primary algorithms were compared:
1. Logistic Regression (baseline, interpretable)
2. Random Forest (ensemble, captures non-linearities)

Both models were evaluated using 5-fold stratified cross-validation.`,

      `## Results

| Model | Accuracy | Precision | Recall | F1-Score |
|-------|----------|-----------|--------|----------|
| Logistic Regression | 0.79 | 0.65 | 0.72 | 0.68 |
| Random Forest | 0.84 | 0.73 | 0.78 | 0.75 |

Random Forest outperformed Logistic Regression across all metrics. The improvement in Recall (0.78 vs 0.72) is particularly valuable for churn prediction — catching more at-risk customers is worth the trade-off of some false positives.`,

      `## Key Insights

1. **Support interactions matter most**: Number of support tickets in the last 3 months was the strongest predictor of churn.

2. **Usage trends beat absolute usage**: Customers whose usage was declining were more likely to churn than customers with consistently low usage.

3. **Early tenure is critical**: The first 90 days show the strongest churn signals. Intervention during this period is most effective.`,

      `## Business Recommendations

- Implement proactive outreach when support ticket count exceeds threshold
- Create onboarding program focused on first 90 days
- Monitor usage trend metrics (not just absolute usage)
- Use model predictions to prioritize retention team efforts`,

      `## Limitations and Future Work

- Model trained on historical data; requires periodic retraining
- Did not explore deep learning approaches
- Could benefit from more granular temporal features
- A/B testing of interventions would validate business impact`,
    ],
  },
  'real-estate-price-prediction': {
    title: 'Predictive Modeling for Real Estate Price Estimation Using Machine Learning',
    date: 'March 2025',
    readingTime: 10,
    category: 'Technical Publication',
    tags: ['Machine Learning', 'Regression', 'Feature Engineering'],
    content: [
      `## Abstract

This study explores regression-based machine learning models for housing price prediction. Using a dataset of residential properties with 80+ features, I compared Linear Regression and Random Forest approaches, with emphasis on feature engineering and cross-validation techniques.`,

      `## Introduction

Real estate valuation is inherently complex, influenced by location, property characteristics, market conditions, and countless intangibles. Traditional appraisal methods are subjective and time-consuming. Machine learning offers a data-driven alternative that can process many variables simultaneously.`,

      `## Dataset

The dataset contained:
- 1,460 training observations
- 80 features covering lot characteristics, building materials, room counts, quality ratings, and more
- Target: Sale price (continuous)

Initial exploration revealed:
- Significant missing values in some features
- Heavy right skew in target variable
- Strong correlations between related features (multicollinearity)`,

      `## Feature Engineering

### Handling Missing Values
- Categorical features: imputed with "None" where absence has meaning (e.g., no garage)
- Numerical features: imputed with 0 or median based on context
- Removed features with >50% missing values

### Feature Creation
- Total square footage (sum of basement, first floor, second floor)
- Quality score (combination of overall quality ratings)
- Age at sale (year sold - year built)
- Remodel flag (year remodeled != year built)

### Feature Selection
Applied correlation analysis and VIF to remove redundant features. Final feature set contained 45 predictors.`,

      `## Modeling

### Linear Regression
- Applied log transformation to target to address skewness
- Used regularization (Ridge) to handle multicollinearity
- Cross-validated RMSE: $28,500

### Random Forest
- 500 trees, max depth optimized via grid search
- Naturally handles non-linearities and interactions
- Cross-validated RMSE: $24,200

### Results Comparison

| Model | RMSE | R² | MAE |
|-------|------|-----|-----|
| Linear Regression | $28,500 | 0.87 | $19,400 |
| Random Forest | $24,200 | 0.91 | $15,800 |

Random Forest achieved 15% lower error, demonstrating the value of capturing non-linear relationships.`,

      `## Feature Importance

Top 5 most important features (from Random Forest):
1. Overall Quality (0.52)
2. Total Living Area (0.12)
3. Garage Area (0.05)
4. Basement Finish (0.04)
5. Neighborhood (0.03)

Notably, Overall Quality alone explains over half of the model's predictive power. This aligns with domain intuition — subjective quality assessment captures many underlying factors.`,

      `## Conclusions

1. Feature engineering significantly improves model performance
2. Random Forest captures price dynamics better than linear models
3. Cross-validation is essential for reliable estimates
4. Domain understanding improves feature creation

The 15% improvement from Random Forest justifies its additional complexity for applications where accuracy is paramount. For interpretability-first use cases, regularized linear regression remains valuable.`,
    ],
  },
  'cross-validation-guide': {
    title: 'A Practical Guide to Cross-Validation',
    date: 'February 2025',
    readingTime: 6,
    category: 'Tutorial',
    tags: ['Machine Learning', 'Model Evaluation', 'Best Practices'],
    content: [
      `## Why This Matters

A single train-test split is not reliable. Your model might perform great on one split and poorly on another. Cross-validation gives you confidence intervals instead of point estimates.`,

      `## The Basic Idea

Instead of one split, do K splits. Train K models, each time using a different fold as the test set. Report mean ± standard deviation of the metric.`,

      `## When to Use What

**K-Fold (k=5 or 10)**
- Default choice for most problems
- Good balance of bias and variance in estimates

**Stratified K-Fold**
- Classification with imbalanced classes
- Maintains class proportions in each fold

**Time Series Split**
- Time-dependent data
- Prevents data leakage from future to past

**Leave-One-Out**
- Very small datasets (<100 samples)
- Computationally expensive`,

      `## Common Mistakes

1. **Fitting preprocessing in the loop**: StandardScaler should be fit only on training fold
2. **Ignoring variance**: Mean score of 0.85 ± 0.15 is very different from 0.85 ± 0.02
3. **Using test set for tuning**: Nested CV or separate holdout needed for hyperparameter search`,

      `## Code Example

\`\`\`python
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# Create pipeline to prevent leakage
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])

# Stratified 5-fold cross-validation
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(pipe, X, y, cv=cv, scoring='f1')

print(f"F1 Score: {scores.mean():.3f} ± {scores.std():.3f}")
\`\`\``,

      `## Takeaways

- Always use cross-validation for model evaluation
- Report both mean and standard deviation
- Choose CV strategy based on data characteristics
- Use pipelines to prevent preprocessing leakage`,
    ],
  },
  'feature-engineering-lessons': {
    title: 'Feature Engineering Lessons from Real Projects',
    date: 'January 2025',
    readingTime: 7,
    category: 'Lessons Learned',
    tags: ['Feature Engineering', 'Data Science', 'Production ML'],
    content: [
      `## The Most Important Skill

After building several ML models, I'm convinced feature engineering is the highest-leverage skill in data science. A great feature can improve model performance more than any hyperparameter tuning.`,

      `## Lesson 1: Domain Knowledge Beats Automation

Automated feature engineering libraries are tempting, but they generate noise. A single thoughtful feature created with domain understanding often outperforms dozens of automatically generated ones.`,

      `## Lesson 2: Start with Simple Features

Before getting clever, try:
- Ratios (value per unit)
- Differences (change from baseline)
- Aggregations (sum, mean, count)
- Time since events`,

      `## Lesson 3: Check Feature Importance Early

Create 5 features, check their importance. Learn what works before creating 50 features. Permutation importance and SHAP values are your friends.`,

      `## Lesson 4: Beware of Leakage

The most predictive feature in your dataset might be leaking the target. If something seems too good, investigate. Check temporal ordering and look for target-derived information.`,

      `## Lesson 5: Document Everything

When you create a feature, write down:
- What it represents
- The business intuition behind it
- Any assumptions made

Future-you will thank present-you.`,
    ],
  },
  'handling-imbalanced-data': {
    title: 'The Truth About Handling Imbalanced Datasets',
    date: 'December 2024',
    readingTime: 9,
    category: 'Deep Dive',
    tags: ['Machine Learning', 'Data Preprocessing', 'Classification'],
    content: [
      `## The Problem

Your fraud detection model has 0.1% fraud examples. Your churn model has 80% retained customers. Class imbalance is everywhere, and the default advice often doesn't work.`,

      `## What Everyone Recommends

"Use SMOTE to oversample the minority class."

This advice is incomplete and sometimes harmful.`,

      `## When SMOTE Helps

- You genuinely need more training examples
- The minority class forms meaningful clusters
- You're using algorithms that benefit from balanced training

## When SMOTE Hurts

- The minority class has outliers (SMOTE will synthesize more outliers)
- Features don't support meaningful interpolation
- You're using tree-based models (they handle imbalance naturally)`,

      `## Better Alternatives

**1. Adjust classification threshold**
Don't predict class 1 at probability > 0.5. Use precision-recall curve to find optimal threshold.

**2. Use appropriate metrics**
Accuracy is meaningless. Use precision, recall, F1, or AUC depending on costs.

**3. Cost-sensitive learning**
Many algorithms support class_weight parameter. Use it.

**4. Ensemble methods**
Random Forest and XGBoost handle imbalance reasonably well without resampling.`,

      `## My Recommendation

1. Start with class_weight='balanced'
2. Optimize threshold using PR curve
3. Try SMOTE only if specific evidence suggests it helps
4. Always validate on original (imbalanced) distribution`,

      `## Key Insight

The "problem" of imbalanced data usually isn't about the data — it's about choosing the wrong metric. If you evaluate correctly, many algorithms work fine without resampling.`,
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(articlesContent).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const article = articlesContent[params.slug]
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.content[0].slice(0, 160).replace(/##?\s*/g, ''),
  }
}

export default function ArticlePage({ params }: Props) {
  const article = articlesContent[params.slug]
  
  if (!article) {
    notFound()
  }

  return (
    <article className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Link 
          href="/writing"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Writing
        </Link>

        {/* Header */}
        <header className="mb-12">
          <Badge variant="primary" className="mb-4">{article.category}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {resumeData.personal.name}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readingTime} min read
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary-500">
          {article.content.map((section, idx) => (
            <div key={idx} className="mb-8">
              {section.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={pIdx} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-xl font-bold mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h4 key={pIdx} className="font-bold mt-4 mb-2">
                      {paragraph.replace(/\*\*/g, '')}
                    </h4>
                  )
                }
                if (paragraph.startsWith('|')) {
                  // Simple table rendering
                  const rows = paragraph.split('\n').filter(r => r.trim())
                  return (
                    <div key={pIdx} className="overflow-x-auto my-4">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr>
                            {rows[0].split('|').filter(Boolean).map((cell, cIdx) => (
                              <th key={cIdx} className="border border-[var(--border)] px-4 py-2 bg-[var(--card)]">
                                {cell.trim()}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.slice(2).map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.split('|').filter(Boolean).map((cell, cIdx) => (
                                <td key={cIdx} className="border border-[var(--border)] px-4 py-2">
                                  {cell.trim()}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                }
                if (paragraph.includes('```')) {
                  const code = paragraph.replace(/```\w*\n?/g, '')
                  return (
                    <pre key={pIdx} className="bg-[var(--card)] p-4 rounded-lg overflow-x-auto text-sm">
                      <code className="text-[var(--foreground)]">{code}</code>
                    </pre>
                  )
                }
                if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                  const items = paragraph.split('\n').filter(Boolean)
                  return (
                    <ul key={pIdx} className="list-disc list-inside space-y-1 my-4 text-[var(--muted)]">
                      {items.map((item, iIdx) => (
                        <li key={iIdx}>{item.replace(/^[-\d.]+\s*/, '')}</li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={pIdx} className="text-[var(--muted)] leading-relaxed my-4">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8">
          <Link href="/writing">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Articles
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
