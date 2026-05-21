'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { gsap } from 'gsap';
import { DeviceMockup } from '@/components/ui/device-mockup';

const METRICS = [
  { num: '200+', label: 'KLIENTŮ' },
  { num: '99.99%', label: 'DOSTUPNOST' },
  { num: '42ms', label: 'AVG LATENCE' },
  { num: '8+ let', label: 'NA TRHU' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export function HeroSection() {
  const t = useTranslations('hero');
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orb1.current || !orb2.current || !orb3.current) return;
    gsap.to(orb1.current, { x: 20, y: -30, scale: 1.05, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2.current, { x: -15, y: 20, scale: 0.95, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
    gsap.to(orb3.current, { x: 10, y: -15, scale: 1.08, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4 });
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10 px-6"
      aria-label="Úvod"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Orbs */}
        <div
          ref={orb1}
          className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          ref={orb2}
          className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          ref={orb3}
          className="absolute top-1/2 left-2/3 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,214,160,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full px-3 py-1.5 mb-7 text-[11px] text-[var(--accent)] font-mono tracking-wide animate-pulse-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Platforma v2.4.1 · Dostupnost 99.99%
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-2.5px] leading-[1.0] max-w-4xl mb-5"
        >
          {t('title1')}&nbsp;
          <span className="gradient-text">{t('title2')}</span>
          <br />
          <span className="gradient-text-muted">{t('title3')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-base lg:text-lg text-[var(--gray-400)] max-w-xl leading-relaxed font-light mb-10"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex gap-2.5 flex-wrap justify-center mb-16">
          <Link
            href="/auth/register"
            className="text-sm font-medium px-6 py-3 rounded-xl btn-primary shadow-[0_0_40px_rgba(79,142,247,0.35)]"
          >
            {t('cta_primary')} →
          </Link>
          <Link
            href="/dashboard"
            className="text-sm px-6 py-3 rounded-xl btn-ghost backdrop-blur-sm"
          >
            {t('cta_secondary')}
          </Link>
        </motion.div>

        {/* Device mockup */}
        <motion.div
          variants={item}
          className="w-full max-w-2xl mb-16"
        >
          <DeviceMockup />
        </motion.div>

        {/* Metrics */}
        <motion.div variants={item} className="flex gap-8 flex-wrap justify-center" role="list">
          {METRICS.map((m, i) => (
            <div key={m.label} className="flex items-center gap-8">
              {i > 0 && <div className="w-px h-8 bg-white/[0.08]" aria-hidden="true" />}
              <div className="text-center" role="listitem">
                <div className="text-2xl font-bold tracking-[-1.5px] leading-none text-white">{m.num}</div>
                <div className="text-[10px] text-[var(--gray-500)] mt-1 font-mono tracking-wide">{m.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
