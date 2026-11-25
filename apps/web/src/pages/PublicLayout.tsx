import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { GitBranch, Menu, X, ArrowRight, ShieldCheck, Terminal, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';

export function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Top utility alert / BYOK announcement banner */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
              BYOK SaaS
            </span>
            <span>Bring Your Own Key architecture • 3 lifetime generations included on free accounts</span>
          </div>
          {user ? (
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-1 font-medium text-white hover:text-emerald-400 transition-colors"
            >
              Go to Dashboard <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <Link
              to="/register"
              className="hidden sm:inline-flex items-center gap-1 font-medium text-white hover:text-emerald-400 transition-colors"
            >
              Start drafting <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-sm group-hover:bg-zinc-800 transition-colors">
              <GitBranch className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-zinc-900 flex items-center gap-1">
                CommitFlow <span className="text-emerald-600 font-semibold text-xs tracking-normal">AI</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono -mt-1">Git → Social Content</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Auth / Dashboard CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-2 rounded-md transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-zinc-700 hover:text-zinc-950 px-3.5 py-2 rounded-md hover:bg-zinc-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-2 rounded-md transition-colors shadow-sm inline-flex items-center gap-1.5"
                >
                  Get Started Free
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 bg-white px-4 pt-2 pb-6 space-y-3">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? 'bg-zinc-100 text-zinc-900 font-semibold'
                      : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2">
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>Open Dashboard</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 px-4 text-sm font-medium text-zinc-800 bg-zinc-50 hover:bg-zinc-100 rounded-md border border-zinc-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 px-4 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md shadow-sm"
                  >
                    Get Started Free (3 Generations)
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Professional Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 text-zinc-600 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand column */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-zinc-900 flex items-center justify-center text-white">
                  <GitBranch className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-bold text-zinc-900 tracking-tight">CommitFlow AI</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Transforming developer code changes into platform-ready social content for engineering builders.
              </p>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero automated posting • Full human review</span>
              </div>
            </div>

            {/* Product navigation */}
            <div>
              <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-3">Product</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/features" className="hover:text-zinc-950 transition-colors">
                    Features & Analysis
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="hover:text-zinc-950 transition-colors">
                    Git Push Workflow
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-zinc-950 transition-colors">
                    Frequently Asked Questions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Target platforms */}
            <div>
              <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-3">
                Supported Platforms
              </h3>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>LinkedIn (Professional Updates)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
                  <span>X / Twitter (Build in Public)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-600"></span>
                  <span>Instagram (Code Cards & Stories)</span>
                </li>
              </ul>
            </div>

            {/* Security & BYOK Architecture */}
            <div>
              <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-3">Architecture</h3>
              <p className="text-xs text-zinc-500 mb-2">
                CommitFlow AI uses a Bring-Your-Own-Key (BYOK) model so you can use your own AI provider keys at cost.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-zinc-700 bg-white border border-zinc-200 px-2.5 py-1.5 rounded">
                <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                <span>Free Tier: 3 Lifetime Runs</span>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>© {new Date().getFullYear()} CommitFlow AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {user ? (
                <Link to="/dashboard" className="hover:text-zinc-900 transition-colors font-medium">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="hover:text-zinc-900 transition-colors">
                    App Login
                  </Link>
                  <Link to="/register" className="hover:text-zinc-900 transition-colors">
                    Create Account
                  </Link>
                </>
              )}
              <span className="text-zinc-400">•</span>
              <span>Manual Review Only</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
