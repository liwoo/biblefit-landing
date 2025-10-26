import { createFileRoute, Link } from "@tanstack/react-router"
import { SiApple, SiFacebook, SiInstagram, SiTwitter, SiYoutube } from "@icons-pack/react-simple-icons"
import { BookOpen, Sparkles, Heart } from "lucide-react"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import ReCAPTCHA from "react-google-recaptcha"

import { AnimatedBackground } from "@/components/animated-background"
import { PhoneMockup } from "@/components/phone-mockup"
import { Seo } from "@/components/layout/seo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
})

export const Route = createFileRoute("/_base/")({
  component: HomePage,
})

function HomePage() {
  const [name, setName] = useState("Carl Mabaya")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Carl Mabaya",
      email: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await recaptchaRef.current?.executeAsync()

      if (!recaptchaToken) {
        toast({
          title: "Error",
          description: "Please complete the reCAPTCHA verification",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      })

      const result = await response.json() as { error?: string; success?: boolean; message?: string }

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been added to the early access list. We'll notify you when BibleFit launches!",
        })
        reset()
        setName("Carl Mabaya")
        recaptchaRef.current?.reset()
      } else {
        recaptchaRef.current?.reset()
        toast({
          title: "Error",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit. Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Seo
        title="BibleFit - Track Your Spiritual Fitness"
        description="Track Your Bible Reading Like You Track Your Steps. Close your Scripture rings every day with reading, meditation, and memorization goals."
      />

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
      <header className="relative z-10 shrink-0 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <BookOpen className="h-5 w-5 text-gray-900" />
            </div>
            <span className="text-xl font-bold text-white">BibleFit</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/features" className="text-gray-300 transition hover:text-white">
              Features
            </Link>
            <a href="https://chienda.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 transition hover:text-white">
              About Developer
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-1 items-center overflow-hidden px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
                Track Your Bible Reading Like You Track Your Steps
              </h1>
              <p className="text-base text-gray-300">
                Close your Scripture rings every day with reading, meditation, and memorization goals.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  {...register("name", {
                    onChange: (e) => setName(e.target.value),
                  })}
                  className="h-12 border-gray-600 bg-gray-800/50 text-white placeholder:text-gray-400"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Apple ID (Email Address)"
                  {...register("email")}
                  className="h-12 border-gray-600 bg-gray-800/50 text-white placeholder:text-gray-400"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Invisible reCAPTCHA */}
              {/* @ts-expect-error - ReCAPTCHA types are for React 18, but works fine with React 19 */}
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ""}
              />

              <div className="flex gap-3">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-12 flex-1 rounded-full bg-emerald-500 text-base font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"
                >
                  <SiApple className="mr-2" size={18} />
                  {isSubmitting ? "Submitting..." : "Request Early Access"}
                </Button>
                <Button size="lg" variant="outline" className="h-12 flex-1 rounded-full border-gray-600 bg-white text-base font-semibold text-gray-900 hover:bg-gray-100" asChild>
                  <Link to="/features">Find Out More</Link>
                </Button>
              </div>
            </form>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-4">
              <div className="group relative flex flex-col items-center gap-2 rounded-2xl border border-emerald-500/30 bg-gray-900/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/60 hover:bg-gray-900/90 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-emerald-500/30 bg-gray-800/50 transition-all duration-300 group-hover:border-emerald-500/60 group-hover:bg-emerald-500/20">
                  <BookOpen className="h-7 w-7 text-emerald-500" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-white">Simple Bible</p>
                  <p className="text-[10px] text-gray-400">iOS Native Bible Reading</p>
                </div>
              </div>

              <div className="group relative flex flex-col items-center gap-2 rounded-2xl border border-blue-500/30 bg-gray-900/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-blue-500/60 hover:bg-gray-900/90 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-blue-500/30 bg-gray-800/50 transition-all duration-300 group-hover:border-blue-500/60 group-hover:bg-blue-500/20">
                  <Sparkles className="h-7 w-7 text-blue-500" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-white">Guided Meditation</p>
                  <p className="text-[10px] text-gray-400">spend time reflecting on the Word</p>
                </div>
              </div>

              <div className="group relative flex flex-col items-center gap-2 rounded-2xl border border-purple-500/30 bg-gray-900/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-purple-500/60 hover:bg-gray-900/90 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-purple-500/30 bg-gray-800/50 transition-all duration-300 group-hover:border-purple-500/60 group-hover:bg-purple-500/20">
                  <Heart className="h-7 w-7 text-purple-500" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-white">Commit to Heart</p>
                  <p className="text-[10px] text-gray-400">Tools to make the Word stick</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="flex items-center justify-center">
            <div className="scale-90 lg:scale-100">
              <PhoneMockup name={name} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 shrink-0 bg-gray-950/50 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#terms" className="transition hover:text-white">
              Terms
            </a>
            <a href="#privacy" className="transition hover:text-white">
              Privacy
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="#instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:text-white"
            >
              <SiInstagram size={16} />
            </a>
            <a
              href="#facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:text-white"
            >
              <SiFacebook size={16} />
            </a>
            <a
              href="#twitter"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:text-white"
            >
              <SiTwitter size={16} />
            </a>
            <a
              href="#youtube"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:text-white"
            >
              <SiYoutube size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
