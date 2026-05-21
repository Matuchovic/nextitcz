import { useTranslations } from 'next-intl';

const FEATURES = [
  { icon: '⚡', key: 'edge' },
  { icon: '🤖', key: 'ai' },
  { icon: '🛡️', key: 'security' },
  { icon: '📊', key: 'analytics' },
  { icon: '🔄', key: 'cicd' },
  { icon: '🌍', key: 'i18n' },
];

export function FeaturesSection() {
  const t = useTranslations('features');

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto" aria-labelledby="features-title">
      <div className="section-tag">{t('tag')}</div>
      <h2 id="features-title" className="text-3xl lg:text-[42px] font-bold tracking-[-1.5px] leading-tight mb-3.5">
        {t('title')}
      </h2>
      <p className="text-[15px] text-[var(--gray-400)] max-w-[520px] leading-relaxed font-light">
        {t('subtitle')}
      </p>

      <div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden"
        role="list"
      >
        {FEATURES.map(({ icon, key }) => (
          <div
            key={key}
            className="bg-[var(--gray-950)] p-7 hover:bg-white/[0.02] transition-colors cursor-default"
            role="listitem"
          >
            <div className="w-9 h-9 rounded-[9px] bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-base mb-4">
              {icon}
            </div>
            <div className="text-sm font-medium tracking-tight mb-1.5">
              {t(`items.${key}.name`)}
            </div>
            <div className="text-[13px] text-[var(--gray-500)] leading-relaxed">
              {t(`items.${key}.desc`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
