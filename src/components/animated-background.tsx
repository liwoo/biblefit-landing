export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Glowy green orbs */}
      <div className="absolute left-[20%] top-[20%] h-96 w-96 animate-pulse-slow rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute bottom-[10%] right-[25%] h-80 w-80 animate-pulse-slower rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="absolute left-[60%] top-[40%] h-72 w-72 animate-pulse-slow rounded-full bg-green-500/10 blur-3xl" />
    </div>
  )
}
