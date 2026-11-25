import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GitCommit,
  ArrowRight,
  Code2,
  Key,
  Copy,
  Download,
  CheckCircle2,
  Sliders,
  Terminal,
  Cpu,
  ShieldAlert,
} from 'lucide-react';
import { Section } from '../components/ui/Section';
import { useAuth } from '../auth/AuthProvider';

const PLATFORM_CAPTIONS: Record<'linkedin' | 'x' | 'instagram', string> = {
  linkedin: `Distributed race conditions can silently corrupt background workers when scale kicks in.

Today we replaced local in-memory synchronization with an atomic Redis distributed lock utilizing the NX flag and a 15s TTL. This isolates parallel worker execution across multiple cluster pods without race hazards.

#SystemDesign #Redis #DistributedSystems #SoftwareArchitecture`,
  x: `Just patched a subtle worker race condition in @commitflowai. Switched local worker locks to atomic Redis NX locks with auto-expiring leases.

Zero split-brain jobs, zero dropped webhooks. ⚡️

#buildinpublic #redis #typescript`,
  instagram: `Why local worker locks fail when you scale to multiple containers 👇

Swipe to see how an atomic Redis set command (NX + PX) prevents concurrent job executions.

#developerlife #softwareengineering #webdev #backenddevelopment`,
};

export function HomePage() {
  const [activePlatformTab, setActivePlatformTab] = useState<'linkedin' | 'x' | 'instagram'>('linkedin');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [copyErrorMessage, setCopyErrorMessage] = useState('');
  const { user } = useAuth();

  const handleCopy = async () => {
    if (copyStatus === 'copied') return;

    const textToCopy = PLATFORM_CAPTIONS[activePlatformTab];

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        setCopyStatus('copied');
        setCopyErrorMessage('');
        setTimeout(() => setCopyStatus('idle'), 2000);
      } else {
        // Fallback for non-secure contexts or unsupported clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (successful) {
          setCopyStatus('copied');
          setCopyErrorMessage('');
          setTimeout(() => setCopyStatus('idle'), 2000);
        } else {
          throw new Error('Clipboard copy command was not successful');
        }
      }
    } catch {
      setCopyStatus('error');
      setCopyErrorMessage('Clipboard access denied or unavailable in this browser');
      setTimeout(() => {
        setCopyStatus('idle');
        setCopyErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-zinc-50 via-white to-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Git-Driven Social Engine for Developers</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.12]">
              Turn your Git pushes into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-emerald-800 to-zinc-900">
                high-signal dev content
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              CommitFlow AI analyzes your git commits, extracts architectural changes, and generates platform-specific
              captions, hashtags, and visual assets for LinkedIn, X, and Instagram.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {user ? (
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-all hover:ring-2 hover:ring-zinc-900/10"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-all hover:ring-2 hover:ring-zinc-900/10"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link
                to="/how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-50 shadow-xs transition-colors"
              >
                <span>Explore the Workflow</span>
              </Link>
            </div>

            {/* Key Value Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>3 Free Lifetime Generations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bring Your Own Key (BYOK) Model</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Autonomous Social Posting</span>
              </div>
            </div>
          </div>

          {/* Product UI / Workflow Visual Mockup */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="rounded-xl border border-zinc-200 bg-white shadow-xl overflow-hidden">
              {/* Fake Window Header */}
              <div className="bg-zinc-100/80 px-4 py-3 border-b border-zinc-200 flex items-center justify-between text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-zinc-300"></span>
                  <span className="w-3 h-3 rounded-full bg-zinc-300"></span>
                  <span className="w-3 h-3 rounded-full bg-zinc-300"></span>
                  <span className="font-mono text-zinc-500 ml-2">commitflow-generation-preview</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                  <GitCommit className="w-3.5 h-3.5 text-emerald-600" />
                  <span>push: main (1 generation) • feat: add distributed lock to worker</span>
                </div>
              </div>

              {/* Window Content Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 bg-white">
                {/* Left: Git diff analysis */}
                <div className="lg:col-span-5 p-5 space-y-4 bg-zinc-50/60 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-700 uppercase tracking-wider text-[10px]">
                      Deterministic Git Diff
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] border border-emerald-200">
                      AST Parsed
                    </span>
                  </div>

                  <div className="rounded-md bg-zinc-900 text-zinc-200 p-3.5 text-[11px] space-y-1.5 leading-snug overflow-x-auto shadow-inner">
                    <div className="text-zinc-500"># queue.worker.ts (modified)</div>
                    <div className="text-rose-400">- const lock = await acquireLocalLock();</div>
                    <div className="text-emerald-400">+ const lock = await redis.set(key, val, 'PX', 15000, 'NX');</div>
                    <div className="text-emerald-400">+ if (!lock) throw new LockContentionError();</div>
                    <div className="text-zinc-500 pt-1"># Impact: fixes split-brain in worker nodes</div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] text-zinc-600 font-sans font-medium">Extracted Engineering Signals:</div>
                    <div className="flex flex-wrap gap-1.5 font-sans">
                      <span className="px-2 py-0.5 bg-white border border-zinc-200 text-zinc-700 rounded text-[11px]">
                        Concurrency
                      </span>
                      <span className="px-2 py-0.5 bg-white border border-zinc-200 text-zinc-700 rounded text-[11px]">
                        Redis Distributed Lock
                      </span>
                      <span className="px-2 py-0.5 bg-white border border-zinc-200 text-zinc-700 rounded text-[11px]">
                        Infrastructure Reliability
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: AI Platform Generation */}
                <div className="lg:col-span-7 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800">
                      <Cpu className="w-4 h-4 text-emerald-600" />
                      <span>Platform-Specific Content Drafts</span>
                    </div>
                    <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded text-xs">
                      <button
                        onClick={() => setActivePlatformTab('linkedin')}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          activePlatformTab === 'linkedin'
                            ? 'bg-white text-zinc-900 shadow-xs'
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        LinkedIn
                      </button>
                      <button
                        onClick={() => setActivePlatformTab('x')}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          activePlatformTab === 'x'
                            ? 'bg-white text-zinc-900 shadow-xs'
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        X (Twitter)
                      </button>
                      <button
                        onClick={() => setActivePlatformTab('instagram')}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          activePlatformTab === 'instagram'
                            ? 'bg-white text-zinc-900 shadow-xs'
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        Instagram
                      </button>
                    </div>
                  </div>

                  {/* Tab Preview */}
                  <div className="rounded-lg border border-zinc-200 p-4 bg-zinc-50/50 space-y-3">
                    {activePlatformTab === 'linkedin' && (
                      <div className="space-y-3 text-xs text-zinc-700 leading-relaxed font-sans">
                        <div className="flex items-center justify-between text-zinc-500 text-[11px] border-b border-zinc-200 pb-2">
                          <span>Target: LinkedIn Post (Engineering Leadership & Architecture)</span>
                          <span className="font-mono text-zinc-400">~650 chars</span>
                        </div>
                        <p className="font-medium text-zinc-900">
                          Distributed race conditions can silently corrupt background workers when scale kicks in.
                        </p>
                        <p>
                          Today we replaced local in-memory synchronization with an atomic Redis distributed lock
                          utilizing the NX flag and a 15s TTL. This isolates parallel worker execution across multiple
                          cluster pods without race hazards.
                        </p>
                        <div className="text-emerald-700 font-mono text-[11px]">
                          #SystemDesign #Redis #DistributedSystems #SoftwareArchitecture
                        </div>
                      </div>
                    )}

                    {activePlatformTab === 'x' && (
                      <div className="space-y-3 text-xs text-zinc-700 leading-relaxed font-sans">
                        <div className="flex items-center justify-between text-zinc-500 text-[11px] border-b border-zinc-200 pb-2">
                          <span>Target: X Thread / Post (Build In Public)</span>
                          <span className="font-mono text-zinc-400">~210 chars</span>
                        </div>
                        <p className="text-zinc-900">
                          Just patched a subtle worker race condition in @commitflowai. Switched local worker locks to
                          atomic Redis NX locks with auto-expiring leases.
                        </p>
                        <p className="text-zinc-600">Zero split-brain jobs, zero dropped webhooks. ⚡️</p>
                        <div className="text-emerald-700 font-mono text-[11px]">#buildinpublic #redis #typescript</div>
                      </div>
                    )}

                    {activePlatformTab === 'instagram' && (
                      <div className="space-y-3 text-xs text-zinc-700 leading-relaxed font-sans">
                        <div className="flex items-center justify-between text-zinc-500 text-[11px] border-b border-zinc-200 pb-2">
                          <span>Target: Instagram Caption & Carousel Card</span>
                          <span className="font-mono text-zinc-400">Code Snippet + Visual Summary</span>
                        </div>
                        <p className="font-medium text-zinc-900">
                          Why local worker locks fail when you scale to multiple containers 👇
                        </p>
                        <p>
                          Swipe to see how an atomic Redis set command (NX + PX) prevents concurrent job executions.
                        </p>
                        <div className="text-emerald-700 font-mono text-[11px]">
                          #developerlife #softwareengineering #webdev #backenddevelopment
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                      {copyStatus === 'error' ? (
                        <span className="text-rose-600 font-medium">{copyErrorMessage}</span>
                      ) : (
                        <>
                          <ShieldAlert className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Review required before publishing</span>
                        </>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        disabled={copyStatus === 'copied'}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors shadow-xs ${
                          copyStatus === 'copied'
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : copyStatus === 'error'
                            ? 'border-rose-300 bg-rose-50 text-rose-800'
                            : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
                        }`}
                        title={copyStatus === 'error' ? copyErrorMessage : undefined}
                      >
                        {copyStatus === 'copied' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : copyStatus === 'error' ? (
                          <>
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                            <span>Copy Failed</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-zinc-500" />
                            <span>Copy Caption</span>
                          </>
                        )}
                      </button>
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 transition-colors shadow-xs">
                        <Download className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Download Asset</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Supported Platforms Section */}
      <Section
        badge="Omnichannel Reach"
        title="Tailored for where engineering conversations happen"
        subtitle="One code change generates distinct, high-context drafts formatted specifically for each platform's culture and constraints."
        className="border-b border-zinc-200 bg-zinc-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LinkedIn Card */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              in
            </div>
            <h3 className="text-lg font-bold text-zinc-900">LinkedIn</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Long-form architectural context, technical tradeoffs, and engineering lessons geared toward senior
              developers, tech leads, and hiring managers.
            </p>
            <ul className="text-xs text-zinc-600 space-y-2 border-t border-zinc-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Problem → Resolution structure</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>High-relevance professional hashtags</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Zero fluff or generic corporate buzzwords</span>
              </li>
            </ul>
          </div>

          {/* X Card */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm font-mono">
              𝕏
            </div>
            <h3 className="text-lg font-bold text-zinc-900">X (Twitter)</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Punchy, insight-driven updates tailored for the Build In Public ecosystem. Captures quick ship wins,
              benchmarks, and developer community discussions.
            </p>
            <ul className="text-xs text-zinc-600 space-y-2 border-t border-zinc-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                <span>Character-bounded 280-char drafts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                <span>Thread-ready progression</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                <span>Direct code metric highlights</span>
              </li>
            </ul>
          </div>

          {/* Instagram Card */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-sm">
              IG
            </div>
            <h3 className="text-lg font-bold text-zinc-900">Instagram</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Structured captions paired with downloadable image prompts and code snapshot concepts designed for developer
              lifestyle and carousel learning.
            </p>
            <ul className="text-xs text-zinc-600 space-y-2 border-t border-zinc-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                <span>Carousel slide hook formatting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                <span>Clean hashtag groupings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                <span>Downloadable visual card assets</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 3. Core Features Grid */}
      <Section
        badge="Engine Capabilities"
        title="Built for technical clarity, not generic marketing"
        subtitle="CommitFlow AI uses structured AST and diff heuristics before invoking AI providers, ensuring your posts reflect true code changes."
        className="border-b border-zinc-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 p-6 rounded-xl border border-zinc-200 bg-white">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <Code2 className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Deterministic Git Diff Analysis</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Filters lockfiles, generated assets, and whitespace noise. Parses added/deleted logic to extract what
              actually changed in your application architecture.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-xl border border-zinc-200 bg-white">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <Sliders className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Multi-Tone Platform Drafting</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Adapts your technical updates into executive summaries, conversational dev threads, or educational
              bullet points based on your target network.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-xl border border-zinc-200 bg-white">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <Download className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Visual Asset Generation</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Generates paired visual assets, code card visuals, and graphic prompts ready for high-resolution download
              and manual attachment.
            </p>
          </div>
        </div>
      </Section>

      {/* 4. Product Workflow / Step-by-Step */}
      <Section
        badge="How It Works"
        title="Simple, transparent five-step workflow"
        subtitle="From code push to finished social copy with full human control."
        className="border-b border-zinc-200 bg-zinc-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Connect GitHub',
              desc: 'Authenticate via OAuth and select the exact repositories you want tracked.',
            },
            {
              step: '02',
              title: 'Git Push',
              desc: 'Push code as you normally do. CommitFlow detects your push webhook.',
            },
            {
              step: '03',
              title: 'AST Analysis',
              desc: 'The engine strips noise and derives high-level engineering takeaways.',
            },
            {
              step: '04',
              title: 'AI Drafting',
              desc: 'Generates platform-ready text and images using your BYOK credentials.',
            },
            {
              step: '05',
              title: 'Copy & Publish',
              desc: 'Review the output in your dashboard, 1-click copy, and publish on your terms.',
            },
          ].map((item) => (
            <div key={item.step} className="bg-white p-5 rounded-lg border border-zinc-200 space-y-2">
              <div className="font-mono text-xs font-bold text-emerald-600">{item.step}</div>
              <h4 className="text-sm font-bold text-zinc-900">{item.title}</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. BYOK Architecture Section */}
      <section className="py-16 md:py-24 bg-zinc-950 text-white border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-zinc-900 text-emerald-400 border border-zinc-800">
                <Key className="w-3.5 h-3.5" />
                <span>Bring Your Own Key (BYOK) Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Zero AI token markups. Transparent model access.
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                CommitFlow AI avoids per-token markups by adopting a Bring-Your-Own-Key model. In the upcoming
                settings release, users will be able to supply their own OpenAI or Anthropic API keys directly to run
                generations at model cost.
              </p>
              <div className="space-y-3 pt-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Existing backend encryption uses AES-256-GCM with PBKDF2 key derivation for credential storage</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct provider rates without platform token surcharges</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Planned user settings for key configuration, updates, and rotation</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-6 space-y-4 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Planned BYOK Architecture</span>
                  </span>
                  <span className="text-[10px] text-zinc-500">AES-256-GCM</span>
                </div>
                <div className="space-y-2 text-zinc-300 text-[11px] leading-relaxed">
                  <div className="text-zinc-500">// Planned user credential settings</div>
                  <div className="text-zinc-300">
                    supportedProviders: <span className="text-emerald-400">["OpenAI", "Anthropic"]</span>
                  </div>
                  <div className="text-zinc-300">
                    encryptionStandard: <span className="text-emerald-400">"AES-256-GCM (PBKDF2)"</span>
                  </div>
                  <div className="text-zinc-300">
                    credentialScope: <span className="text-emerald-400">"Configured in user settings"</span>
                  </div>
                  <div className="text-zinc-300">
                    diffProcessing: <span className="text-emerald-400">"Transient in-memory synthesis"</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>BYOK settings integration</span>
                  <span className="text-amber-400">Roadmap: Phase 2.2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Transparent Free Plan Tier */}
      <Section
        badge="Zero-Risk Evaluation"
        title="3 Lifetime generations included on every free account"
        subtitle="Test the fidelity of our deterministic code analysis and AI drafting with your real repos before considering any future subscription."
        className="border-b border-zinc-200"
      >
        <div className="max-w-xl mx-auto rounded-xl border-2 border-zinc-900 bg-white p-8 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            Free Lifetime Starter
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-zinc-950">$0</div>
            <div className="text-xs text-zinc-500">No credit card required to start</div>
          </div>

          <div className="space-y-3 text-left border-y border-zinc-100 py-6 text-sm text-zinc-700">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>3 Complete generations per account</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full multi-platform output (LinkedIn, X, Instagram)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Deterministic Git diff & AST parsing</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Manual copy and asset download</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Planned BYOK integration with your API key</span>
            </div>
          </div>

          <div className="pt-2">
            {user ? (
              <Link
                to="/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-colors"
              >
                <span>Open Your Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/register"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-colors"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <p className="text-[11px] text-zinc-500 mt-2">
              Paid monthly plans for high-frequency pushes will launch in future phases.
            </p>
          </div>
        </div>
      </Section>

      {/* 7. Final Call to Action */}
      <section className="py-20 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Stop forgetting to share what you build.
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
            Connect your repository, push your next feature, and let CommitFlow AI craft authentic social updates
            directly from your code.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-sm transition-colors"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-sm transition-colors"
              >
                <span>Get Started Free (3 Generations)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              to="/features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              <span>Read Feature Specs</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
