import { createFileRoute, Link } from "@tanstack/react-router"
import { BookOpen, Sparkles, Heart, ArrowLeft } from "lucide-react"

import { AnimatedBackground } from "@/components/animated-background"
import { Seo } from "@/components/layout/seo"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/_base/features")({
  component: FeaturesPage,
})

function FeaturesPage() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Seo
        title="Features - BibleFit"
        description="Discover BibleFit Features - Simple Bible reading, guided meditation, and memorization tools to track your spiritual fitness"
      />

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
      <header className="relative z-10 shrink-0 bg-gray-950/50 px-4 sm:px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <BookOpen className="h-5 w-5 text-gray-900" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">BibleFit</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white lg:text-6xl">
            Features That Transform Your Faith Journey
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300">
            Everything you need to build a consistent Bible habit and track your spiritual growth
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 space-y-12 sm:space-y-16 md:space-y-24 px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          {/* Feature 1: Simple Bible */}
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/20">
                <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-500" />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Simple Bible</h2>
                <p className="text-lg sm:text-xl text-emerald-400">iOS Native Bible Reading</p>
                <p className="text-base sm:text-lg text-gray-300">
                  Experience the Word like never before with our beautifully designed, native iOS Bible reader.
                  Optimized for reading comfort with adjustable fonts, themes, and seamless navigation.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Multiple translations at your fingertips</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Offline reading - take the Word anywhere</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Smart bookmarks and highlighting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Track your daily reading progress</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-64 sm:h-80 md:h-96 w-full rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex h-full flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
                  <BookOpen className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-emerald-500" />
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">Beautiful Reading Experience</p>
                  <p className="text-sm sm:text-base text-gray-400">Clean, distraction-free interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl">
          {/* Feature 2: Guided Meditation */}
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 flex items-center justify-center lg:order-1">
              <div className="h-64 sm:h-80 md:h-96 w-full rounded-3xl border border-blue-500/30 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex h-full flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
                  <Sparkles className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-blue-500" />
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">Deepen Your Understanding</p>
                  <p className="text-sm sm:text-base text-gray-400">Reflect on Scripture meaningfully</p>
                </div>
              </div>
            </div>
            <div className="order-1 flex flex-col justify-center space-y-4 sm:space-y-6 lg:order-2">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border-2 border-blue-500/50 bg-blue-500/20">
                <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-blue-500" />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Guided Meditation</h2>
                <p className="text-lg sm:text-xl text-blue-400">Spend time reflecting on the Word</p>
                <p className="text-base sm:text-lg text-gray-300">
                  Go beyond just reading - truly meditate on Scripture with guided reflections,
                  thought-provoking questions, and dedicated time to let the Word speak to your heart.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <span>Daily meditation prompts and questions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <span>Timer to help you slow down and reflect</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <span>Journal your insights and revelations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <span>Build a habit of deeper Bible study</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl">
          {/* Feature 3: Commit to Heart */}
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border-2 border-purple-500/50 bg-purple-500/20">
                <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-purple-500" />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Commit to Heart</h2>
                <p className="text-lg sm:text-xl text-purple-400">Tools to make the Word stick</p>
                <p className="text-base sm:text-lg text-gray-300">
                  Hide God&apos;s Word in your heart with powerful memorization tools. Use proven techniques
                  like spaced repetition, flashcards, and audio practice to make Scripture a permanent part of your life.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-purple-500" />
                    <span>Smart spaced repetition system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-purple-500" />
                    <span>Interactive verse flashcards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-purple-500" />
                    <span>Audio playback for memorization on-the-go</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-purple-500" />
                    <span>Track verses mastered over time</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-64 sm:h-80 md:h-96 w-full rounded-3xl border border-purple-500/30 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex h-full flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
                  <Heart className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-purple-500" />
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">Remember Forever</p>
                  <p className="text-sm sm:text-base text-gray-400">Scripture that stays with you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/30 bg-gray-900/80 p-6 sm:p-8 md:p-12 text-center backdrop-blur-sm">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-white">
            Ready to Transform Your Bible Habit?
          </h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-gray-300">
            Join the waitlist and be the first to know when BibleFit launches
          </p>
          <Button size="lg" className="h-12 sm:h-14 rounded-full bg-emerald-500 px-6 sm:px-8 text-base sm:text-lg font-semibold text-white hover:bg-emerald-600" asChild>
            <Link to="/">Request Early Access</Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 shrink-0 bg-gray-950/50 px-4 sm:px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <p className="text-xs sm:text-sm text-gray-400">© 2024 BibleFit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
