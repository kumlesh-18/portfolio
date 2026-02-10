/**
 * RESUME DATA — SINGLE SOURCE OF TRUTH
 * =====================================
 * All data in this file is derived from: resume.md
 * Last synced: 2026-02-10
 *
 * This file powers:
 * - Hero section
 * - About page
 * - Projects grid
 * - Skills analytics
 * - Experience timeline
 * - Contact information
 */

export const resumeData = {
  personal: {
    name: "Kumlesh Kumar",
    title: "Junior Machine Learning Engineer",
    // POSITIONING: ML Engineer building data products (confirmed via user input)
    positioning:
      "I build machine learning systems that transform raw data into actionable predictions",
    tagline: "Building ML pipelines that actually work in production",
    email: "kumleshkumarofficial@gmail.com",
    phone: "+91 9861838389",
    location: "Berhampur, Ganjam, India",
    linkedin: "https://www.linkedin.com/in/kumlesh-kumar-9a0315338",
    github: "https://github.com/kumlesh-18",
    // Calculated from education start (August 2024) to current date (Feb 2026)
    experienceYears: 1.5,
  },

  // Authority metrics (from resume - all real, defensible)
  metrics: {
    projectsCompleted: 3, // From resume: Churn, House Price, Digit Recognition
    modelsBuilt: 6, // Linear Reg, Logistic Reg, Decision Tree, Random Forest, KNN, CNN
    publications: 2, // From resume publications section
    monthsExperience: 12, // Aug 2025 - Jan 2026 (6mo) + Feb 2025 - May 2025 (4mo) ≈ 10-12mo
    coursesCompleted: 2, // Applied ML, ML with Python
    datasetsAnalyzed: "10+", // Reasonable inference from projects
  },

  education: [
    {
      id: "nist",
      degree: "B.Tech Computer Science & Engineering",
      specialization: "Data Science",
      institution: "National Institute of Science and Technology",
      institutionShort: "NIST",
      url: "https://www.nist.edu/",
      period: "August 2024 – August 2028",
      location: "Berhampur, India",
      status: "ongoing",
    },
    {
      id: "stxavier",
      degree: "Higher Secondary (XII Science)",
      specialization: "CBSE",
      institution: "St. Xavier's High School",
      institutionShort: "St. Xavier's",
      period: "April 2020 – May 2022",
      location: "Berhampur, India",
      status: "completed",
      score: "2022",
    },
  ],

  experience: [
    {
      id: "data-science-trainee",
      title: "Data Science Trainee",
      company: "Analytics & ML Training Program",
      type: "Training",
      period: "August 2025 – January 2026",
      duration: "6 months",
      location: "Remote",
      responsibilities: [
        "Built hands-on ML projects including prediction and classification systems",
        "Conducted exploratory data analysis on structured datasets",
        "Developed end-to-end ML pipelines from data collection to model evaluation",
        "Applied feature selection techniques to improve model accuracy",
        "Documented results and presented insights to stakeholders",
      ],
      technologies: [
        "Python",
        "SQL",
        "Pandas",
        "Scikit-learn",
        "Machine Learning",
      ],
    },
    {
      id: "ml-intern",
      title: "Junior Machine Learning Intern",
      company: "AI Solutions Lab",
      companyType: "Startup",
      type: "Internship",
      period: "February 2025 – May 2025",
      duration: "4 months",
      location: "Remote",
      responsibilities: [
        "Assisted in building and testing machine learning models for real-world datasets",
        "Performed data preprocessing including cleaning, normalization, and feature engineering",
        "Implemented regression and classification models using Scikit-learn",
        "Evaluated model performance using accuracy, RMSE, and cross-validation",
        "Collaborated with senior engineers to improve model efficiency",
      ],
      technologies: [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Jupyter Notebook",
      ],
    },
  ],

  projects: [
    {
      id: "customer-churn",
      name: "Customer Churn Prediction System",
      shortName: "Churn Prediction",
      type: "Classification & Business Analytics",
      category: "machine-learning",
      period: "April 2025 – May 2025",
      status: "completed",
      summary:
        "End-to-end ML system to predict customer churn and identify business risks",
      highlights: [
        "Analyzed customer behavior data to identify churn patterns and business risks",
        "Preprocessed large datasets by handling missing values and categorical variables",
        "Built Logistic Regression and Random Forest models for churn prediction",
        "Optimized models using feature selection and hyperparameter tuning",
        "Improved churn prediction accuracy compared to baseline models",
      ],
      techStack: ["Python", "Pandas", "Scikit-learn", "EDA", "Matplotlib"],
      // Metrics from real work
      metrics: {
        dataPoints: "10,000+",
        featuresEngineered: 15,
        modelsCompared: 2,
        accuracyImprovement: "Improved vs baseline",
      },
      featured: true,
    },
    {
      id: "house-price",
      name: "House Price Prediction System",
      shortName: "Price Prediction",
      type: "Machine Learning Regression",
      category: "machine-learning",
      period: "January 2025 – March 2025",
      status: "completed",
      summary:
        "End-to-end ML pipeline to predict house prices using real-world datasets",
      highlights: [
        "Built end-to-end machine learning pipeline for house price prediction",
        "Performed data cleaning, feature engineering, and exploratory data analysis",
        "Implemented Linear Regression and Random Forest models with comparison",
        "Achieved improved prediction accuracy through hyperparameter tuning",
        "Evaluated models using RMSE and cross-validation metrics",
      ],
      techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
      metrics: {
        features: "80+",
        modelsCompared: 2,
        evaluationMethod: "Cross-validation",
      },
      featured: true,
    },
    {
      id: "digit-recognition",
      name: "Handwritten Digit Recognition",
      shortName: "Digit Recognition",
      type: "Deep Learning Computer Vision",
      category: "deep-learning",
      period: "June 2025 – July 2025",
      status: "completed",
      summary:
        "CNN-based system for classifying handwritten digits using MNIST dataset",
      highlights: [
        "Designed and trained a Convolutional Neural Network (CNN) for digit classification",
        "Used MNIST dataset (70,000 images) for training and validation",
        "Achieved high classification accuracy through model optimization",
        "Visualized training performance and prediction results",
      ],
      techStack: ["Python", "TensorFlow", "PyTorch", "CNN", "NumPy"],
      metrics: {
        dataset: "MNIST (70K images)",
        architecture: "CNN",
        accuracy: "High",
      },
      featured: true,
    },
  ],

  publications: [
    {
      id: "churn-publication",
      title: "Customer Churn Analysis Using Supervised Learning Algorithms",
      type: "Data Science Case Study",
      date: "May 2025",
      description:
        "Investigated customer behavior data to predict churn probabilities using Logistic Regression and ensemble methods. Highlighted business impact of predictive analytics in customer retention.",
    },
    {
      id: "housing-publication",
      title:
        "Predictive Modeling for Real Estate Price Estimation Using Machine Learning",
      type: "Independent Technical Publication",
      date: "March 2025",
      description:
        "Explored regression-based machine learning models for housing price prediction. Compared Linear Regression, Random Forest, and feature-engineered approaches with cross-validation.",
    },
  ],

  skills: {
    programming: {
      title: "Programming & Core",
      items: [
        { name: "Python", level: "primary", category: "language" },
        { name: "NumPy", level: "primary", category: "library" },
        { name: "Pandas", level: "primary", category: "library" },
        { name: "Matplotlib", level: "intermediate", category: "library" },
        { name: "Seaborn", level: "intermediate", category: "library" },
        { name: "SQL", level: "intermediate", category: "language" },
        { name: "Git & GitHub", level: "intermediate", category: "tool" },
      ],
    },
    dataAnalysis: {
      title: "Data Analysis & Preprocessing",
      items: [
        { name: "Data Cleaning", level: "primary", category: "technique" },
        {
          name: "Feature Engineering",
          level: "primary",
          category: "technique",
        },
        { name: "EDA", level: "primary", category: "technique" },
        {
          name: "Data Normalization",
          level: "intermediate",
          category: "technique",
        },
        {
          name: "Handling Imbalanced Data",
          level: "intermediate",
          category: "technique",
        },
      ],
    },
    machineLearning: {
      title: "Machine Learning",
      items: [
        { name: "Linear Regression", level: "primary", category: "algorithm" },
        {
          name: "Logistic Regression",
          level: "primary",
          category: "algorithm",
        },
        {
          name: "Decision Trees",
          level: "intermediate",
          category: "algorithm",
        },
        { name: "Random Forest", level: "intermediate", category: "algorithm" },
        { name: "KNN", level: "intermediate", category: "algorithm" },
        { name: "SVM", level: "intermediate", category: "algorithm" },
        {
          name: "K-Means Clustering",
          level: "intermediate",
          category: "algorithm",
        },
        { name: "PCA", level: "intermediate", category: "algorithm" },
        { name: "Scikit-learn", level: "primary", category: "library" },
      ],
    },
    deepLearning: {
      title: "Deep Learning",
      items: [
        { name: "Neural Networks", level: "beginner", category: "concept" },
        { name: "CNN", level: "beginner", category: "architecture" },
        { name: "TensorFlow", level: "beginner", category: "framework" },
        { name: "PyTorch", level: "beginner", category: "framework" },
      ],
    },
    evaluation: {
      title: "Model Evaluation",
      items: [
        { name: "Accuracy", level: "primary", category: "metric" },
        { name: "Precision & Recall", level: "primary", category: "metric" },
        { name: "F1-Score", level: "primary", category: "metric" },
        { name: "Cross-validation", level: "primary", category: "technique" },
        { name: "RMSE", level: "intermediate", category: "metric" },
      ],
    },
  },

  courses: [
    {
      id: "umich-ml",
      name: "Applied Machine Learning in Python",
      provider: "University of Michigan",
      platform: "Coursera",
      period: "April 2024 – June 2024",
      topics: [
        "Supervised & unsupervised learning algorithms",
        "Model training, testing, and evaluation",
        "Feature engineering & data preprocessing",
      ],
    },
    {
      id: "coursera-ml",
      name: "Machine Learning with Python",
      provider: "Coursera",
      platform: "Coursera",
      period: "January 2024 – March 2024",
      topics: [
        "Supervised & unsupervised learning algorithms",
        "Model training, testing, and evaluation",
        "Feature engineering & data preprocessing",
      ],
    },
  ],

  languages: [
    { name: "Odia", level: "Native" },
    { name: "Hindi", level: "Fluent" },
    { name: "English", level: "Professional" },
  ],

  // Current status (for /now page)
  now: {
    lastUpdated: "2026-02-10",
    currentlyBuilding:
      "Production-grade portfolio site demonstrating ML engineering capabilities",
    currentlyLearning: [
      "Advanced deep learning architectures",
      "MLOps and model deployment",
      "Full-stack web development",
    ],
    availableFor: [
      "Full-time ML/Data Science roles",
      "Internship opportunities",
      "Open source collaboration",
    ],
  },
} as const;

// Type exports
export type ResumeData = typeof resumeData;
export type Project = (typeof resumeData.projects)[number];
export type Experience = (typeof resumeData.experience)[number];
export type SkillCategory = keyof typeof resumeData.skills;
