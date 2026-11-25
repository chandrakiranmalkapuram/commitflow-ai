import type { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function Section({
  title,
  subtitle,
  badge,
  children,
  className = '',
  dark = false,
}: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${dark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(badge || title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            {badge && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                {badge}
              </span>
            )}
            {title && (
              <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${dark ? 'text-white' : 'text-zinc-900'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-base sm:text-lg leading-relaxed ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
