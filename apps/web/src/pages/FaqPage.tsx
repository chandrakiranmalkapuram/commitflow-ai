import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight, HelpCircle } from 'lucide-react';
import { Section } from '../components/ui/Section';

interface FaqItem {
  question: string;
  answer: string;
  category: 'Product' | 'Security & BYOK' | 'Pricing';
}

const faqs: FaqItem[] = [
  {
    category: 'Product',
    question: 'Does CommitFlow AI automatically publish to my social accounts?',
    answer:
      'No. CommitFlow AI has zero automated publishing capabilities. We believe developer social media should always remain under strict human control to protect your engineering reputation. You review generated drafts in your dashboard, 1-click copy the text, download visual assets, and post them manually.',
  },
  {
    category: 'Product',
    question: 'Which social platforms are supported?',
    answer:
      'CommitFlow AI generates tailored content for LinkedIn (longform technical context and engineering lessons), X / Twitter (short, punchy build-in-public dev notes), and Instagram (structured code cards and carousel post outlines).',
  },
  {
    category: 'Product',
    question: 'How does CommitFlow AI handle large commits or lockfiles?',
    answer:
      'Our deterministic git analysis engine filters out dependency lockfiles (e.g. package-lock.json, pnpm-lock.yaml), compiled bundles, minified scripts, and formatting changes. It isolates functional AST changes so your generated posts highlight architectural logic rather than dependency churn.',
  },
  {
    category: 'Security & BYOK',
    question: 'What is the Bring-Your-Own-Key (BYOK) model?',
    answer:
      'Rather than paying inflated per-token markups, planned BYOK settings will let you supply your own OpenAI or Anthropic API key. Generations will run directly against your provider quota at direct cost, with the ability to rotate or revoke your key at any time.',
  },
  {
    category: 'Security & BYOK',
    question: 'How will API keys and repository code be protected?',
    answer:
      'CommitFlow’s existing backend encryption utility uses AES-256-GCM with PBKDF2-derived keys for credential persistence. When user-provided BYOK key storage launches in settings, credentials will be stored encrypted. For repository analysis, commit diff metadata is processed in worker memory to extract functional summaries rather than retaining full repository clones.',
  },
  {
    category: 'Security & BYOK',
    question: 'Can I choose which repositories CommitFlow AI tracks?',
    answer:
      'Yes. You have granular per-repository toggle switches in your dashboard. You can track a single open-source side project while keeping all other private client or proprietary repositories completely untracked.',
  },
  {
    category: 'Pricing',
    question: 'What is included in the free plan?',
    answer:
      'Every new CommitFlow AI account receives a lifetime allowance of 3 complete generations across all supported platforms. No credit card is required to sign up or test your first three code pushes.',
  },
  {
    category: 'Pricing',
    question: 'When will paid subscription tiers be introduced?',
    answer:
      'Paid monthly subscription tiers designed for active daily builders and engineering teams will launch in subsequent phases of our roadmap. The current phase focuses on core web stability, GitHub repository management, and prompt fidelity.',
  },
];

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Product', 'Security & BYOK', 'Pricing'];

  const filteredFaqs =
    selectedCategory === 'All' ? faqs : faqs.filter((faq) => faq.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-zinc-50 border-b border-zinc-200 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            Frequently Asked Questions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
            Everything you need to know about CommitFlow AI
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Clear, honest answers about our BYOK security model, git webhook architecture, and human-in-the-loop workflow.
          </p>
        </div>
      </div>

      {/* FAQ Filter & List */}
      <Section className="border-b border-zinc-200">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-lg border border-zinc-200 bg-white overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-50/70 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-zinc-900">{faq.question}</span>
                    <span className="text-zinc-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center mx-auto text-zinc-700">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900">Have a technical question not answered here?</h2>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl mx-auto">
            You can test the entire workflow with our 3 free lifetime generations. No credit card required.
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-colors"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
