import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Brain, Database, Sparkles, Shield, BarChart, Code } from 'lucide-react'
import { Card, Badge, Button } from '@/components/ui'

interface Props {
  params: { topic: string }
}

// Systems article content
const systemsContent: Record<string, {
  title: string
  icon: typeof Brain
  category: string
  philosophy: string
  principles: Array<{ title: string; description: string; example: string }>
  antiPatterns: Array<{ title: string; description: string; instead: string }>
  resources: string[]
}> = {
  'ml-pipeline-design': {
    title: 'How I Design ML Pipelines',
    icon: Brain,
    category: 'Machine Learning',
    philosophy: `A good ML pipeline is reproducible, testable, and maintainable. Too many data scientists write spaghetti notebooks that work once and never again. I believe in treating ML code like production software — with proper structure, version control, and documentation.`,
    principles: [
      {
        title: 'Separate concerns',
        description: 'Data loading, preprocessing, feature engineering, and modeling should be distinct modules. Each step should be independently testable.',
        example: 'data_loader.py, preprocessor.py, features.py, model.py',
      },
      {
        title: 'Configuration over code',
        description: 'Hyperparameters, file paths, and feature lists should be in config files, not hardcoded. This makes experiments reproducible.',
        example: 'config.yaml with model_params, data_paths, feature_list',
      },
      {
        title: 'Version your data',
        description: 'Model performance depends on both code AND data. Track data versions alongside code versions.',
        example: 'Use DVC, log data checksums, or maintain data manifests',
      },
    ],
    antiPatterns: [
      {
        title: 'The "it works on my machine" notebook',
        description: 'Notebooks with absolute paths, missing dependencies, and cells run in random order.',
        instead: 'Convert to scripts, use relative paths, document dependencies in requirements.txt',
      },
      {
        title: 'Training and evaluation in the same loop',
        description: 'Mixing training code with evaluation makes it hard to reproduce results separately.',
        instead: 'Save model artifacts, run evaluation as separate step',
      },
    ],
    resources: [
      'Made with ML (madewithml.com)',
      'ML Engineering by Andriy Burkov',
      'Cookiecutter Data Science template',
    ],
  },
  'data-preprocessing': {
    title: 'How I Handle Data Quality',
    icon: Database,
    category: 'Data Engineering',
    philosophy: `Garbage in, garbage out. No model can fix fundamentally flawed data. I spend more time understanding and cleaning data than tuning models. Data quality is where most ML projects succeed or fail.`,
    principles: [
      {
        title: 'Understand before cleaning',
        description: 'Before dropping rows or filling nulls, understand WHY the data looks the way it does. Missing data often carries information.',
        example: 'Missing salary might mean "declined to answer" vs "not asked"',
      },
      {
        title: 'Document every transformation',
        description: 'Every cleaning decision is a modeling decision. Document what you changed and why.',
        example: 'Logged: "Removed 234 rows with negative age values (data entry errors)"',
      },
      {
        title: 'Validate at every step',
        description: 'Add assertions and checks after each transformation. Catch problems early.',
        example: 'assert df["age"].min() >= 0, "Negative ages found after cleaning"',
      },
    ],
    antiPatterns: [
      {
        title: 'Filling all nulls with mean',
        description: 'Mean imputation is almost never the right answer. It distorts distributions and hides patterns.',
        instead: 'Investigate why values are missing, use domain-appropriate strategies',
      },
      {
        title: 'Dropping all rows with any null',
        description: 'Removing incomplete rows can introduce severe bias if missingness is not random.',
        instead: 'Analyze missingness patterns, consider multiple imputation',
      },
    ],
    resources: [
      'Thoughtful Machine Learning with Python',
      'Data Cleaning chapter in Python for Data Analysis',
      'Sklearn preprocessing documentation',
    ],
  },
  'feature-engineering': {
    title: 'How I Approach Feature Engineering',
    icon: Sparkles,
    category: 'Machine Learning',
    philosophy: `Feature engineering is where domain knowledge meets statistics. A great feature can be worth 10x more than a fancier model. I focus on creating features that capture real-world relationships in the data.`,
    principles: [
      {
        title: 'Start with domain intuition',
        description: 'What would a human expert look at? Encode that knowledge into features.',
        example: 'For churn prediction: account age, usage trends, support tickets pattern',
      },
      {
        title: 'Create interactions',
        description: 'Relationships between features often matter more than individual features.',
        example: 'revenue_per_user = total_revenue / num_users',
      },
      {
        title: 'Test feature importance',
        description: 'Use permutation importance or SHAP to validate that new features actually help.',
        example: 'Run model with and without feature, compare CV scores',
      },
    ],
    antiPatterns: [
      {
        title: 'Creating hundreds of features blindly',
        description: 'Automated feature generation without domain context creates noise and overfitting.',
        instead: 'Start with 10-20 thoughtful features, add more based on analysis',
      },
      {
        title: 'Data leakage through features',
        description: 'Features computed with information from the future or the target variable.',
        instead: 'Check feature creation dates, validate against holdout set',
      },
    ],
    resources: [
      'Feature Engineering for Machine Learning (O\'Reilly)',
      'Kaggle feature engineering micro-course',
      'SHAP documentation for feature importance',
    ],
  },
  'model-evaluation': {
    title: 'How I Evaluate Models',
    icon: BarChart,
    category: 'Machine Learning',
    philosophy: `A model is only as good as its evaluation. I don't trust single metrics or single train-test splits. Rigorous evaluation prevents embarrassing surprises in production.`,
    principles: [
      {
        title: 'Match metric to business goal',
        description: 'Accuracy is almost never the right metric. Choose based on what errors cost.',
        example: 'Fraud detection: prioritize recall (catch all fraud) over precision',
      },
      {
        title: 'Use cross-validation religiously',
        description: 'Single splits are not reliable. K-fold cross-validation gives you confidence intervals.',
        example: '5-fold CV: mean accuracy 85% ± 3% is more useful than "85% accuracy"',
      },
      {
        title: 'Evaluate on realistic data',
        description: 'Holdout set should reflect real-world deployment conditions, including time.',
        example: 'Train on months 1-6, validate on 7-9, test on 10-12',
      },
    ],
    antiPatterns: [
      {
        title: 'Evaluating on training data',
        description: 'Training accuracy/loss is meaningless for predicting real-world performance.',
        instead: 'Always report holdout set or cross-validation results',
      },
      {
        title: 'Ignoring class imbalance',
        description: '95% accuracy on 95% majority class data tells you nothing.',
        instead: 'Use precision, recall, F1, AUC-ROC for imbalanced problems',
      },
    ],
    resources: [
      'Sklearn model evaluation documentation',
      'Beyond accuracy: precision, recall, F1, and ROC',
      'Time series cross-validation strategies',
    ],
  },
  'code-organization': {
    title: 'How I Organize ML Projects',
    icon: Code,
    category: 'Engineering',
    philosophy: `Every ML project should be runnable by someone else. I structure projects so that code is modular, data flows are clear, and experiments are reproducible.`,
    principles: [
      {
        title: 'Use consistent project structure',
        description: 'Standardized layout makes it easy for anyone to navigate the codebase.',
        example: 'data/, notebooks/, src/, models/, configs/, tests/',
      },
      {
        title: 'Separate exploration from production',
        description: 'Notebooks for exploration, Python modules for production-ready code.',
        example: 'notebooks/01_eda.ipynb, src/features.py, src/model.py',
      },
      {
        title: 'Write tests for data assumptions',
        description: 'Test that data matches expectations: types, ranges, uniqueness.',
        example: 'test_data_shape(), test_column_types(), test_no_nulls_in_critical()',
      },
    ],
    antiPatterns: [
      {
        title: 'Everything in one notebook',
        description: 'Monolithic notebooks are impossible to test, version, or collaborate on.',
        instead: 'Extract functions to modules, import into notebooks',
      },
      {
        title: 'Magic numbers everywhere',
        description: 'Hardcoded thresholds and parameters make experiments hard to reproduce.',
        instead: 'Use config files, document every magic number',
      },
    ],
    resources: [
      'Cookiecutter Data Science',
      '12 Factor App principles',
      'Python packaging best practices',
    ],
  },
  'debugging-ml': {
    title: 'How I Debug ML Systems',
    icon: Shield,
    category: 'Engineering',
    philosophy: `ML bugs are different from traditional software bugs. The code runs fine, but the model fails silently. I approach ML debugging systematically, starting with data.`,
    principles: [
      {
        title: 'Start with the data',
        description: 'Most ML bugs are data bugs. Check data quality before touching the model.',
        example: 'Audit training data: missing values, outliers, label correctness',
      },
      {
        title: 'Overfit on purpose',
        description: 'If model cannot overfit on tiny dataset, something is fundamentally wrong.',
        example: 'Train on 100 samples with high capacity model, expect near-perfect fit',
      },
      {
        title: 'Check intermediate outputs',
        description: 'Log feature distributions, predictions, and losses at each step.',
        example: 'Print feature means, log training loss every epoch, validate predictions',
      },
    ],
    antiPatterns: [
      {
        title: 'Jumping to hyperparameter tuning',
        description: 'Tuning a broken pipeline optimizes nothing useful.',
        instead: 'Get baseline working first, then tune',
      },
      {
        title: 'Ignoring warnings',
        description: 'Sklearn and TensorFlow warnings often indicate real problems.',
        instead: 'Treat warnings as errors, investigate each one',
      },
    ],
    resources: [
      'How to debug machine learning models',
      'A Recipe for Training Neural Networks (Karpathy)',
      'Common ML debugging patterns',
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(systemsContent).map((topic) => ({
    topic,
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  const content = systemsContent[params.topic]
  
  if (!content) {
    return { title: 'Article Not Found' }
  }

  return {
    title: content.title,
    description: content.philosophy.slice(0, 160),
  }
}

export default function SystemArticlePage({ params }: Props) {
  const content = systemsContent[params.topic]

  if (!content) {
    notFound()
  }

  const Icon = content.icon

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link 
          href="/systems"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Systems
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary-500" />
            </div>
            <Badge variant="primary" size="md">{content.category}</Badge>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold">{content.title}</h1>
        </header>

        {/* Philosophy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Philosophy</h2>
          <Card>
            <p className="text-lg text-[var(--muted)] leading-relaxed">
              {content.philosophy}
            </p>
          </Card>
        </section>

        {/* Principles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Principles</h2>
          <div className="space-y-6">
            {content.principles.map((principle, idx) => (
              <Card key={idx}>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{principle.title}</h3>
                    <p className="text-[var(--muted)] mb-3">{principle.description}</p>
                    <div className="bg-[var(--background)] rounded-lg px-4 py-2 text-sm font-mono text-[var(--muted)]">
                      Example: {principle.example}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Anti-patterns */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Anti-Patterns I Avoid</h2>
          <div className="space-y-6">
            {content.antiPatterns.map((pattern, idx) => (
              <Card key={idx} className="border-accent-red/20">
                <div className="flex items-start gap-4">
                  <span className="text-accent-red text-xl">✕</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{pattern.title}</h3>
                    <p className="text-[var(--muted)] mb-3">{pattern.description}</p>
                    <div className="bg-accent-green/5 border border-accent-green/20 rounded-lg px-4 py-2 text-sm">
                      <span className="text-accent-green font-medium">Instead:</span>{' '}
                      <span className="text-[var(--muted)]">{pattern.instead}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Resources That Shaped This</h2>
          <Card>
            <ul className="space-y-2">
              {content.resources.map((resource, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[var(--muted)]">
                  <span className="text-primary-500">→</span>
                  {resource}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link href="/systems">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
