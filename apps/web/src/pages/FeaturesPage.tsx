import { Link } from 'react-router-dom';
import {
  Code2,
  Sliders,
  Download,
  Key,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { Section } from '../components/ui/Section';
import { useAuth } from '../auth/AuthProvider';

export function FeaturesPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="bg-zinc-50 border-b border-zinc-200 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            Platform Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
            Engineered for developers who build in public
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            CommitFlow AI bridges the gap between raw git commits and polished social media presence. Here is how our
            deterministic analysis and AI synthesis engine works.
          </p>
        </div>
      </div>

      {/* Feature 1: Deterministic Git Diff Analysis */}
      <Section className="border-b border-zinc-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <Code2 className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Deterministic Git Diff Analysis
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Raw git diffs are noisy. They include lockfiles, compiled bundles, minified scripts, and formatting
              changes. CommitFlow AI applies deterministic filtering and AST analysis before synthesizing any content.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Noise Suppression:</strong> Automatically ignores package-lock.json, pnpm-lock.yaml, asset
                  digests, and build artifacts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Functional Change Detection:</strong> Identifies new routes, refactored database queries,
                  concurrency locks, and UI components.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Architectural Intent Extraction:</strong> Derives why a change was made, not just line counts.
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl border border-zinc-200 bg-zinc-900 text-zinc-200 p-6 font-mono text-xs shadow-lg space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>git-analysis-engine.ts</span>
                </span>
                <span className="text-[10px] text-zinc-500">Pipeline Stage 1</span>
              </div>
              <div className="space-y-1.5 text-zinc-300 leading-relaxed text-[11px]">
                <div className="text-zinc-500">// 1. Strip noise</div>
                <div>filterPatterns: ["*-lock.yaml", "dist/**", "*.min.js"]</div>
                <div className="text-zinc-500 pt-1">// 2. AST Classification</div>
                <div>
                  detectedScope: <span className="text-emerald-400">"infrastructure/redis-lock"</span>
                </div>
                <div>
                  complexityScore: <span className="text-emerald-400">"high"</span>
                </div>
                <div>
                  impactCategory: <span className="text-emerald-400">"Reliability & Concurrency"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Feature 2: Multi-Platform Tone Adaptation */}
      <Section className="border-b border-zinc-200 bg-zinc-50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-blue-700">
                  <span>LinkedIn Mode</span>
                  <span className="font-mono text-[10px] bg-blue-50 px-2 py-0.5 rounded">Technical Leadership</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Focuses on systemic tradeoffs, architecture decisions, reliability benchmarks, and engineering team
                  lessons.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-900">
                  <span>X (Twitter) Mode</span>
                  <span className="font-mono text-[10px] bg-zinc-100 px-2 py-0.5 rounded">Build In Public</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Snappy, high-velocity shipping updates, code snippets, and metric diffs designed to spark dev replies.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-pink-700">
                  <span>Instagram Mode</span>
                  <span className="font-mono text-[10px] bg-pink-50 px-2 py-0.5 rounded">Visual Dev Cards</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Visual-first slide outlines, structured syntax breakdown, and clean carousel hooks with formatted
                  hashtags.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <Sliders className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Multi-Platform Tone Adaptation
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Every social platform has different technical engagement norms. One generic post broadcasted across all
              channels looks unnatural. CommitFlow AI crafts distinct variations tailored for each channel's audience.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Audience-appropriate tone, length, and hashtag frequency.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Respects platform character constraints (280 chars for X, longform for LinkedIn).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Zero repetitive boilerplate or artificial hype.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Feature 3: Image Generation & Asset Download */}
      <Section className="border-b border-zinc-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <Download className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Image Generation & Asset Download
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Social posts with clear visual artifacts receive dramatically higher engagement. CommitFlow AI prepares
              custom graphic prompts and code snapshot cards representing the theme of your push.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Ready-to-download PNG assets paired directly with each post draft.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Architecture diagram and terminal mock concepts based on actual code.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>No automated posting: you download the asset and review it before sharing.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-100 pb-3">
                <span className="font-semibold text-zinc-800">Generated Visual Card Preview</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px]">1080x1080px</span>
              </div>
              <div className="aspect-video bg-zinc-900 rounded-lg p-5 flex flex-col justify-between text-white font-mono text-xs shadow-inner">
                <div className="flex justify-between items-center text-zinc-400 text-[10px]">
                  <span>COMMITFLOW // ARCHITECTURE</span>
                  <span>REDIS DISTRIBUTED LOCK</span>
                </div>
                <div className="space-y-1 my-auto">
                  <div className="text-emerald-400 font-bold text-sm">// Concurrency Fix</div>
                  <div className="text-zinc-300 text-xs font-sans">Atomic Mutex Lease Acquisition</div>
                  <div className="text-zinc-500 text-[11px] font-mono">SET lock:worker:1 token NX PX 15000</div>
                </div>
                <div className="text-[10px] text-zinc-500 text-right">CommitFlow AI Asset Generator</div>
              </div>
              <div className="flex justify-end">
                <button className="text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full Resolution</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Feature 4: Bring Your Own Key & Security */}
      <Section className="border-b border-zinc-200 bg-zinc-50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-3 text-xs text-zinc-700">
              <div className="font-semibold text-zinc-900 pb-2 border-b border-zinc-100 flex items-center justify-between">
                <span>Security & Credential Principles</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-bold text-zinc-900">Planned BYOK Storage:</span> In the planned settings release,
                  user-provided API keys will be stored using CommitFlow's existing backend AES-256-GCM encryption with
                  PBKDF2 key derivation.
                </div>
                <div>
                  <span className="font-bold text-zinc-900">Transient Diff Processing:</span> Code diffs are parsed
                  transiently in worker memory to extract functional summaries, avoiding permanent storage of full repository
                  source code.
                </div>
                <div>
                  <span className="font-bold text-zinc-900">Human-In-The-Loop Only:</span> CommitFlow AI contains zero
                  automated publication webhooks. You retain 100% control over what goes public.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <Key className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Bring Your Own Key (BYOK) Model
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              We believe in transparent software economics. Rather than paying artificial markups on AI token usage, the
              planned BYOK integration will allow you to connect your own OpenAI or Anthropic API key in user settings.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>You will pay the underlying model provider directly at cost.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Switch models or providers whenever better or cheaper models emerge.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Free tier includes 3 lifetime generations to verify prompt quality.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-16 bg-zinc-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Ready to streamline your developer marketing?</h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Create an account, connect your first GitHub repository, and test the analysis pipeline with 3 free lifetime
            generations.
          </p>
          <div className="pt-2">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-sm transition-colors"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-sm transition-colors"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
