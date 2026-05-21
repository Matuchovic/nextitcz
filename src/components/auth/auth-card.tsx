export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full max-w-[400px] rounded-[20px] p-9 overflow-hidden"
      style={{
        background: 'rgba(12,12,12,0.9)',
        border: '0.5px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
      }}
      role="main"
    >
      {/* Top shine */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
      {children}
    </div>
  );
}
