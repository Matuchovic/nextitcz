'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const METRICS = [
  { num: '200+', label: 'KLIENTŮ' },
  { num: '99.99%', label: 'DOSTUPNOST' },
  { num: '42ms', label: 'AVG LATENCE' },
  { num: '8+ let', label: 'NA TRHU' },
];

const NEWS = [
  { tag: 'NOVÉ', text: 'AI Dashboard v3.0 — real-time predikce s Claude AI', time: '2h' },
  { tag: 'RELEASE', text: 'Edge CDN — latence snížena na 18ms globálně', time: '5h' },
  { tag: 'UPDATE', text: 'WebGL renderer 2.0 — 60fps na všech zařízeních', time: '1d' },
  { tag: 'CASE', text: 'E-shop CZ — konverze +340% po redesignu', time: '2d' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center overflow-hidden bg-black">
      
      {/* Animated glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full -top-60 -left-60"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full -bottom-40 -right-40"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)', filter: 'blur(100px)' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 flex flex-col items-center w-full max-w-6xl">

        {/* Badge */}
        <motion.div variants={item}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
          style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.1)' }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ boxShadow: '0 0 8px #34d399' }}
          />
          <span className="text-[11px] font-mono text-white/50">Platforma v2.4.1</span>
          <span className="text-white/20">·</span>
          <span className="text-[11px] font-mono text-white/50">99.99% uptime</span>
          <span className="text-white/20">·</span>
          <span className="text-[11px] font-mono text-emerald-400">LIVE</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={item}
          className="font-black tracking-[-4px] leading-[0.92] mb-6 max-w-5xl"
          style={{ fontSize: 'clamp(48px,7.5vw,100px)' }}
        >
          <span style={{ color: '#fff', textShadow: '0 0 40px rgba(255,255,255,0.3)' }}>Platformy </span>
          <motion.span
            style={{
              background: 'linear-gradient(135deg,#818cf8 0%,#a855f7 45%,#f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.5))',
            }}
            animate={{ filter: ['drop-shadow(0 0 30px rgba(168,85,247,0.5))', 'drop-shadow(0 0 50px rgba(168,85,247,0.8))', 'drop-shadow(0 0 30px rgba(168,85,247,0.5))'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            nové generace
          </motion.span>
          <br />
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>pro váš byznys.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={item} className="text-white/35 max-w-xl leading-relaxed mb-10 font-light" style={{ fontSize: 'clamp(14px,1.4vw,18px)' }}>
          Prémiové webové platformy, mobilní aplikace a AI systémy.{' '}
          <span className="text-white/55">Přesně tak, jak si představujete budoucnost.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex gap-3 mb-16 flex-wrap justify-center">
          <Link href="/auth/register">
            <motion.button
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 30px rgba(139,92,246,0.4)' }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 50px rgba(139,92,246,0.7)' }}
              whileTap={{ scale: 0.97 }}
            >
              Spustit projekt →
            </motion.button>
          </Link>
          <Link href="/dashboard">
            <motion.button
              className="px-8 py-3.5 rounded-xl text-sm font-medium text-white/60"
              style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)' }}
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.97 }}
            >
              Prohlédnout demo
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="flex gap-12 mb-16 flex-wrap justify-center">
          {METRICS.map((m, i) => (
            <div key={m.label} className="flex items-center gap-12">
              {i > 0 && <div className="w-px h-8 bg-white/[0.08]" />}
              <div className="text-center">
                <div className="font-black tracking-[-2px] text-white" style={{ fontSize: 'clamp(22px,2.5vw,36px)', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>{m.num}</div>
                <div className="text-[10px] font-mono text-white/25 tracking-widest mt-1">{m.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Device mockup */}
        <motion.div variants={item} className="w-full max-w-3xl mb-16">
          <RotatingBorderMockup />
        </motion.div>

        {/* News */}
        <motion.div variants={item} className="w-full">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-mono text-white/20 tracking-widest">LATEST</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {NEWS.map((n, i) => (
              <motion.div
                key={n.tag}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="rounded-xl p-4 cursor-default"
                style={{ background: 'rgba(255,255,255,0.025)', border: '0.5px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}
                whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.04)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded"
                    style={{ color: '#818cf8', background: 'rgba(129,140,248,0.1)', border: '0.5px solid rgba(129,140,248,0.2)' }}>
                    {n.tag}
                  </span>
                  <span className="text-[9px] font-mono text-white/20 ml-auto">{n.time}</span>
                </div>
                <p className="text-[12px] text-white/45 leading-relaxed">{n.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function RotatingBorderMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let angle = 0;
    let id: number;
    const tick = () => {
      angle = (angle + 1.2) % 360;
      el.style.background = `conic-gradient(from ${angle}deg, transparent 60%, rgba(139,92,246,0.8) 75%, rgba(99,102,241,1) 85%, rgba(52,211,153,0.5) 92%, transparent 100%)`;
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, []);

  const CARDS = [
    { label: 'PŘÍJMY / MĚS.', val: '€284k', delta: '+18.4%', glow: '#818cf8' },
    { label: 'AKTIVNÍ UŽIVATELÉ', val: '12,847', delta: '+6.2%', glow: '#c084fc' },
    { label: 'PROJEKTY LIVE', val: '237', delta: '+3 dnes', glow: '#34d399' },
  ];

  return (
    <div className="relative p-[1px] rounded-2xl" ref={ref}>
      <div className="relative rounded-[15px] overflow-hidden" style={{ background: 'rgba(4,4,4,0.97)' }}>
        <div className="flex items-center gap-1.5 px-4 h-9 border-b border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" style={{ boxShadow: '0 0 5px #ff5f57' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" style={{ boxShadow: '0 0 5px #febc2e' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" style={{ boxShadow: '0 0 5px #28c840' }} />
          <span className="ml-auto text-[10px] text-white/15 font-mono">nextit.tech — dashboard · LIVE</span>
        </div>
        <div className="p-5 grid grid-cols-3 gap-3">
          {CARDS.map(card => (
            <motion.div key={card.label} className="rounded-xl p-4 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${card.glow}44,transparent)` }} />
              <div className="text-[9px] font-mono text-white/25 tracking-wide mb-2">{card.label}</div>
              <div className="text-xl font-black text-white" style={{ textShadow: `0 0 16px ${card.glow}88` }}>{card.val}</div>
              <div className="text-[10px] font-mono mt-1" style={{ color: card.glow }}>▲ {card.delta}</div>
            </motion.div>
          ))}
          <div className="col-span-2 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)' }}>
            <div className="text-[9px] font-mono text-white/25 mb-3">NASAZENÍ · REAL-TIME</div>
            {[
              { name: 'nextit-api v3.2.1', s: 'LIVE', c: '#34d399' },
              { name: 'dashboard-ui v1.8.0', s: 'DEPLOY', c: '#818cf8' },
              { name: 'mobile-app v2.0.4', s: 'LIVE', c: '#34d399' },
            ].map(d => (
              <div key={d.name} className="flex items-center justify-between mb-2 last:mb-0">
                <span className="text-[11px] text-white/50 font-mono">{d.name}</span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded"
                  style={{ color: d.c, background: `${d.c}15`, border: `0.5px solid ${d.c}33`, textShadow: `0 0 8px ${d.c}` }}>{d.s}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-4 flex flex-col justify-center items-center" style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)' }}>
            <div className="text-[9px] font-mono text-white/25 mb-2">LATENCE API</div>
            <motion.div className="text-2xl font-black text-white"
              style={{ textShadow: '0 0 20px rgba(52,211,153,0.7)' }}
              animate={{ textShadow: ['0 0 20px rgba(52,211,153,0.7)', '0 0 40px rgba(52,211,153,1)', '0 0 20px rgba(52,211,153,0.7)'] }}
              transition={{ duration: 3, repeat: Infinity }}>
              42ms
            </motion.div>
            <div className="text-[9px] font-mono text-emerald-400 mt-1">P99 · výborné</div>
          </div>
        </div>
      </div>
    </div>
  );
}
