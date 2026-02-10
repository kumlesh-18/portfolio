import type { Metadata } from 'next';
import { resumeConfig } from '@/lib/resume-config';
import { resumeData } from '@/data/resume';
import { PDFViewer, MobileResumeCard } from '@/components/resume';
import { Card, Badge } from '@/components/ui';
import { 
  FileDown, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award,
  ExternalLink 
} from 'lucide-react';

export const metadata: Metadata = {
  title: resumeConfig.meta.title,
  description: resumeConfig.meta.description,
  keywords: [...resumeConfig.meta.keywords],
  openGraph: {
    title: resumeConfig.meta.title,
    description: resumeConfig.meta.description,
    type: 'profile',
  },
};

/**
 * Resume Page
 * 
 * Professional resume viewing and download page
 * SOURCE: Kumlesh-Kumar-CV.pdf (public/Kumlesh-Kumar-CV.pdf)
 */
export default function ResumePage() {
  const { personal, metrics } = resumeData;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Resume</h1>
              <p className="text-lg text-[var(--muted)]">
                {personal.title} • {personal.location}
              </p>
            </div>
            
            {/* Download CTA - Always Visible */}
            <a
              href={resumeConfig.file.path}
              download={resumeConfig.file.downloadName}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              <FileDown className="w-5 h-5" />
              Download PDF
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Briefcase className="w-5 h-5 mx-auto mb-2 text-primary-500" />
              <div className="text-2xl font-bold">{metrics.monthsExperience}+</div>
              <div className="text-xs text-[var(--muted)]">Months Experience</div>
            </Card>
            <Card className="p-4 text-center">
              <Code className="w-5 h-5 mx-auto mb-2 text-primary-500" />
              <div className="text-2xl font-bold">{metrics.projectsCompleted}</div>
              <div className="text-xs text-[var(--muted)]">Projects</div>
            </Card>
            <Card className="p-4 text-center">
              <Award className="w-5 h-5 mx-auto mb-2 text-primary-500" />
              <div className="text-2xl font-bold">{metrics.publications}</div>
              <div className="text-xs text-[var(--muted)]">Publications</div>
            </Card>
            <Card className="p-4 text-center">
              <GraduationCap className="w-5 h-5 mx-auto mb-2 text-primary-500" />
              <div className="text-2xl font-bold">{metrics.coursesCompleted}</div>
              <div className="text-xs text-[var(--muted)]">Certifications</div>
            </Card>
          </div>
        </header>

        {/* PDF Viewer - Desktop */}
        <div className="max-w-5xl mx-auto hidden md:block">
          <PDFViewer />
        </div>

        {/* Mobile Resume Card */}
        <div className="max-w-lg mx-auto md:hidden">
          <MobileResumeCard />
        </div>

        {/* Additional Info Section */}
        <section className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6">Quick Summary</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Skills Highlight */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary-500" />
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'SQL', 'NumPy'].map(skill => (
                  <Badge key={skill} variant="default">{skill}</Badge>
                ))}
              </div>
            </Card>

            {/* Available For */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-500" />
                Open For
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {resumeData.now.availableFor.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Contact CTA */}
          <Card className="mt-6 p-6 bg-primary-500/5 border-primary-500/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold mb-1">Interested in working together?</h3>
                <p className="text-sm text-[var(--muted)]">
                  I'm currently available for new opportunities
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary-500 text-primary-500 font-medium hover:bg-primary-500 hover:text-white transition-colors whitespace-nowrap"
              >
                Get in Touch
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </Card>
        </section>

        {/* Resume Version Info */}
        <footer className="max-w-4xl mx-auto mt-8 text-center text-sm text-[var(--muted)]">
          <p>
            Resume v{resumeConfig.version} • Last updated {resumeConfig.file.lastUpdated} • 
            {' '}{Math.round(resumeConfig.file.size / 1024)} KB
          </p>
        </footer>
      </div>
    </div>
  );
}
