import { Link } from 'react-router-dom';
import {
  GitPullRequest,
  Key,
  Terminal,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Copy,
} from 'lucide-react';
import { Section } from '../components/ui/Section';
import { useAuth } from '../auth/AuthProvider';

export function HowItWorksPage() {
  const { user } = useAuth();
  const steps = [
    {
      num: '01',
      title: 'Connect GitHub and Select Active Repositories',
      description:
        'Authenticate with GitHub via secure OAuth. You choose which individual repositories you want CommitFlow AI to monitor. Inactive or private repositories remain untouched unless you explicitly enable them.',
      icon: GitPullRequest,
      details: [
        'Read-only diff access on designated repositories',
        'Automatic GitHub webhook subscription setup',
        'Toggle monitoring on or off at any time',
      ],
    },
    {
      num: '02',
      title: 'Configure Your AI Provider API Key (Planned BYOK)',
      description:
        'Through upcoming BYOK settings, you will be able to supply your personal OpenAI or Anthropic API key. When saved, credentials will use CommitFlow’s AES-256-GCM encryption without token markups.',
      icon: Key,
      details: [
        'Direct billing with your chosen AI model provider',
        'Credentials will use CommitFlow’s existing AES-256-GCM encryption',
        'Easily rotate or update keys once settings launch',
      ],
    },
    {
      num: '03',
      title: 'Push Code as Part of Your Normal Workflow',
      description:
        'No browser extensions, CLI wrappers, or daily prompt crafting required. Write code, commit, and run git push. GitHub delivers the push webhook payload to CommitFlow AI in the background.',
      icon: Terminal,
      details: [
        'Works with standard git push origin main / branches',
        'Triggers exactly one generation per push event',
        'No interruption to your existing engineering pipeline',
      ],
    },
    {
      num: '04',
      title: 'Deterministic Filtering & Multi-Platform Drafting',
      description:
        'The CommitFlow backend receives the commit diff, removes package-lock files, minified scripts, and formatting noise, and extracts the core functional intent. It then generates drafts for LinkedIn, X, and Instagram.',
      icon: Cpu,
      details: [
        'Filters lockfiles, generated assets, and whitespace noise',
        'Extracts architecture impact and functional additions',
        'Drafts three targeted variants matching platform style guidelines',
      ],
    },
    {
      num: '05',
      title: 'Review in Dashboard, Copy, and Download',
      description:
        'Open your CommitFlow AI dashboard. Review the generated captions, hashtags, and code visual card. Click to copy captions directly to your clipboard, download graphic assets, and share manually on your own schedule.',
      icon: Copy,
      details: [
        '1-click caption copy with verified formatting',
        'Direct PNG asset download for carousel/post graphics',
        'Zero automated posting: you retain full editorial control',
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-zinc-50 border-b border-zinc-200 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            End-To-End Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
            How CommitFlow AI Works
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            From the moment you push code to GitHub to the moment you share your engineering milestones on social media,
            here is the complete workflow.
          </p>
        </div>
      </div>

      {/* Step by Step Breakdown */}
      <Section className="border-b border-zinc-200">
        <div className="max-w-4xl mx-auto space-y-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 rounded-xl border border-zinc-200 bg-white shadow-xs relative"
              >
                <div className="md:col-span-3 flex flex-col justify-between space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">
                      {step.num}
                    </div>
                    <div className="p-2 rounded-md bg-zinc-100 text-zinc-700">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                  <div className="hidden md:block font-mono text-[11px] text-zinc-400">
                    Step {idx + 1} of {steps.length}
                  </div>
                </div>

                <div className="md:col-span-9 space-y-4">
                  <h3 className="text-xl font-bold text-zinc-900">{step.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{step.description}</p>
                  <div className="pt-2 border-t border-zinc-100 space-y-2">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2 text-xs text-zinc-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Philosophy Callout: Why No Auto-Posting? */}
      <section className="py-16 bg-zinc-900 text-white border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Product Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Why does CommitFlow AI never post automatically?
          </h2>
          <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
            <p>
              Autonomous posting tools often create low-effort, repetitive spam that damages your technical reputation.
              A git push might be a quick hotfix, a partial refactor, or an internal configuration bump that isn't ready
              for public consumption.
            </p>
            <p>
              By keeping the user firmly in the loop, CommitFlow AI prepares the heavy lifting—summarizing changes, drafting
              captions, identifying key hashtags, and rendering visual assets—while you retain the final word on when and
              where to publish.
            </p>
          </div>
        </div>
      </section>

      {/* Free Plan / Getting Started CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
            3 Lifetime Generations Included
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950">
            Experience the workflow on your next push
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Set up takes less than 2 minutes. No subscription needed to try your first three commits.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-colors"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-colors"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              to="/faq"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-50 shadow-xs transition-colors"
            >
              <span>Read FAQ</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
