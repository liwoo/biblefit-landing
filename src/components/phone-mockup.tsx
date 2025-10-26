interface PhoneMockupProps {
  name?: string
}

export function PhoneMockup({ name = "Carl Mabaya" }: PhoneMockupProps) {
  return (
    <div className="relative h-[500px] w-[250px] sm:h-[550px] sm:w-[275px] lg:h-[600px] lg:w-[300px] rounded-[2.5rem] sm:rounded-[3rem] border-6 sm:border-8 border-gray-800 bg-gray-900 shadow-2xl">
      {/* Dynamic Island */}
      <div className="absolute left-1/2 top-2 z-20 h-6 w-24 sm:h-7 sm:w-28 lg:h-8 lg:w-32 -translate-x-1/2 rounded-full bg-black shadow-lg" />

      {/* Phone screen */}
      <div className="h-full w-full overflow-hidden rounded-[2rem] sm:rounded-[2.2rem] bg-gradient-to-b from-gray-800 to-gray-900 p-3 sm:p-4">
        {/* Summary header */}
        <div className="mb-4 sm:mb-6 mt-6 sm:mt-8 cursor-pointer rounded-xl sm:rounded-2xl bg-emerald-500 p-3 sm:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <p className="text-xs sm:text-sm font-medium text-white/90">{name}&apos;s</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Summary</h2>
          <p className="text-[10px] sm:text-xs text-emerald-100">Daily Scripture Goals</p>
        </div>

        {/* Activity Rings Section */}
        <div className="mb-3 sm:mb-4 cursor-pointer rounded-xl sm:rounded-2xl bg-gray-800 p-3 sm:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <h3 className="mb-2 sm:mb-3 text-xs sm:text-sm font-semibold text-white">
            BibleFit Activity Rings
          </h3>

          {/* Activity rings */}
          <div className="relative mx-auto mb-3 sm:mb-4 h-32 w-32 sm:h-36 sm:w-36 lg:h-40 lg:w-40">
            {/* Outer ring - Read */}
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="rgb(31 41 55)"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="rgb(239 68 68)"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.7)}`}
                strokeLinecap="round"
                className="animate-draw-ring"
                style={{ strokeDashoffset: '1000' }}
              />
            </svg>

            {/* Middle ring - Memorize */}
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="55"
                fill="none"
                stroke="rgb(31 41 55)"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r="55"
                fill="none"
                stroke="rgb(34 197 94)"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 55}`}
                strokeDashoffset={`${2 * Math.PI * 55 * (1 - 0.3)}`}
                strokeLinecap="round"
                className="animate-draw-ring-delay-1"
                style={{ strokeDashoffset: '1000' }}
              />
            </svg>

            {/* Inner ring - Meditate */}
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="40"
                fill="none"
                stroke="rgb(31 41 55)"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r="40"
                fill="none"
                stroke="rgb(59 130 246)"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.85)}`}
                strokeLinecap="round"
                className="animate-draw-ring-delay-2"
                style={{ strokeDashoffset: '1000' }}
              />
            </svg>
          </div>

          {/* Legend */}
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-gray-400">Read</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-gray-400">Memorize</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-gray-400">Meditate</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
          <div className="cursor-pointer rounded-lg sm:rounded-xl bg-gray-800 p-2 sm:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="mb-0.5 sm:mb-1 flex items-center justify-between">
              <span className="text-gray-400">Read</span>
              <span className="text-gray-500">→</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-red-500">16</div>
            <div className="text-gray-500">verses today</div>
            {/* Mini calendar grid */}
            <div className="mt-1.5 sm:mt-2 grid grid-cols-7 gap-0.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-sm ${i < 4 ? "bg-red-500/50" : "bg-gray-700"}`}
                />
              ))}
            </div>
          </div>

          <div className="cursor-pointer rounded-lg sm:rounded-xl bg-gray-800 p-2 sm:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="mb-0.5 sm:mb-1 flex items-center justify-between">
              <span className="text-gray-400">Memorize</span>
              <span className="text-gray-500">→</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-green-500">2</div>
            <div className="text-gray-500">verses today</div>
            {/* Mini calendar grid */}
            <div className="mt-1.5 sm:mt-2 grid grid-cols-7 gap-0.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-sm ${i < 2 ? "bg-green-500/50" : "bg-gray-700"}`}
                />
              ))}
            </div>
          </div>

          <div className="cursor-pointer rounded-lg sm:rounded-xl bg-gray-800 p-2 sm:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="mb-0.5 sm:mb-1 flex items-center justify-between">
              <span className="text-gray-400">Meditate</span>
              <span className="text-gray-500">→</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-blue-500">13min</div>
            <div className="text-gray-500">today</div>
            {/* Mini calendar grid */}
            <div className="mt-1.5 sm:mt-2 grid grid-cols-7 gap-0.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-sm ${i < 5 ? "bg-blue-500/50" : "bg-gray-700"}`}
                />
              ))}
            </div>
          </div>

          <div className="cursor-pointer rounded-lg sm:rounded-xl bg-gray-800 p-2 sm:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="mb-0.5 sm:mb-1 flex items-center justify-between">
              <span className="text-gray-400">Coverage</span>
              <span className="text-gray-500">→</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-500">9.5%</div>
            <div className="text-gray-500">of Bible read</div>
            {/* Mini calendar grid */}
            <div className="mt-1.5 sm:mt-2 grid grid-cols-7 gap-0.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-sm ${i < 6 ? "bg-purple-500/50" : "bg-gray-700"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
