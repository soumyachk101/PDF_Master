"use client";

import Link from "next/link";
import {
  FileStack,
  Scissors,
  Zap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Star,
  Layers,
  Sparkles,
  Search,
  Lock,
  RefreshCw,
  Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const tools = [
    { title: "Merge PDF", description: "Combine multiple documents into one master PDF in seconds.", icon: <FileStack className="w-6 h-6" />, link: "/merge", color: "violet" },
    { title: "Split PDF", description: "Extract pages or separate a large PDF into manageable files.", icon: <Scissors className="w-6 h-6" />, link: "/split", color: "orange" },
    { title: "Compress PDF", description: "Extreme optimization for maximum compression with zero quality loss.", icon: <Zap className="w-6 h-6" />, link: "/compress", color: "blue" },
    { title: "Convert PDF", description: "Transform DOCX, XLSX and PPTX files into professional PDFs.", icon: <RefreshCw className="w-6 h-6" />, link: "/convert", color: "green" },
    { title: "Secure PDF", description: "Add military-grade encryption and password protection to your files.", icon: <Lock className="w-6 h-6" />, link: "/protect", color: "rose" },
    { title: "Organize PDF", description: "Rearrange, rotate, and delete pages with a simple drag & drop.", icon: <Layout className="w-6 h-6" />, link: "/organize", color: "indigo" },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-slate-950">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 animate-pulse delay-700" />

        <div className="container relative z-10 mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-bold text-violet-400 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-4 h-4 fill-violet-400" />
            <span className="uppercase tracking-[0.1em]">AI-Powered PDF Intelligence</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl md:text-7xl font-black tracking-tight text-white mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Everything your <span className="text-gradient">PDFs</span> ever needed.
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-slate-400 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Professional tools to merge, split, compress, and secure your documents. Fast, private, and stunningly simple.
          </p>

          <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button size="lg" className="h-16 px-10 text-lg font-black rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.03] transition-all shadow-2xl shadow-violet-600/20 group" asChild>
              <Link href="/auth/register">
                Start For Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" className="h-16 px-10 text-lg font-black rounded-2xl border-2 border-slate-800 bg-slate-900/50 text-white hover:bg-slate-800 transition-all shadow-xl backdrop-blur-md" asChild>
              <Link href="/tools">Explorer All Tools</Link>
            </Button>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="mt-24 relative max-w-5xl mx-auto animate-in fade-in zoom-in duration-1000 delay-700">
            <div className="glass-dark rounded-[2.5rem] p-4 shadow-3xl ring-1 ring-white/10 overflow-hidden group">
              <div className="aspect-[16/9] rounded-[1.5rem] bg-indigo-950/50 border border-white/5 flex items-center justify-center relative overflow-hidden">
                {/* Mock UI elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="size-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-xl mb-6 animate-float">
                    <Layers className="size-10 text-violet-400" />
                  </div>
                  <div className="h-3 w-48 bg-white/20 rounded-full mb-3" />
                  <div className="h-3 w-32 bg-white/10 rounded-full" />
                </div>
                {/* Floating mini cards */}
                <div className="absolute top-1/4 left-1/4 glass p-4 rounded-2xl hidden md:block animate-float animation-delay-500">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-500 size-5" />
                    <div className="h-2 w-20 bg-slate-200 rounded-full" />
                  </div>
                </div>
                <div className="absolute bottom-1/4 right-1/4 glass p-4 rounded-2xl hidden md:block animate-float">
                  <div className="flex items-center gap-3">
                    <Zap className="text-blue-500 size-5 fill-blue-500" />
                    <div className="h-2 w-24 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Trusted by industry leaders in document management</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="h-8 w-24 bg-slate-300 dark:bg-slate-800 rounded-lg" />
            <div className="h-8 w-32 bg-slate-300 dark:bg-slate-800 rounded-lg" />
            <div className="h-8 w-28 bg-slate-300 dark:bg-slate-800 rounded-lg" />
            <div className="h-8 w-36 bg-slate-300 dark:bg-slate-800 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Built for speed, styled for impact.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Why settle for clunky PDF editors? PDFMaster combines industrial strength with a design that feels like second nature.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, idx) => (
              <Link
                href={tool.link}
                key={idx}
                className="group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col items-start gap-6"
              >
                <div className={`p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 group-hover:bg-violet-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm`}>
                  {tool.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 transition-colors">{tool.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{tool.description}</p>
                </div>
                <div className="mt-4 flex items-center text-sm font-black text-violet-600 group-hover:translate-x-2 transition-transform duration-500">
                  Get Started <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Security Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-block p-4 rounded-3xl bg-violet-600/20 text-violet-400">
                <ShieldCheck className="size-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Your data, encrypted and isolated.</h2>
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                We process over 2 million documents every month with zero data breaches. Your files are encrypted with AES-256 and purged automatically from our memory after 1 hour.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Military-grade AES-256 encryption",
                  "GDPR and HIPAA compliant architecture",
                  "Automatic file purging after processing",
                  "Zero data storage policy"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-slate-200">
                    <div className="size-5 rounded-full bg-violet-600 flex items-center justify-center text-[10px]">
                      <CheckCircle2 className="size-3 text-white fill-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Active Users", val: "2M+", desc: "Global professionals" },
                { label: "Files Processed", val: "50M+", desc: "With 99% success" },
                { label: "Uptime SLA", val: "99.9%", desc: "Enterprise reliability" },
                { label: "Tool Rating", val: "4.9/5", desc: "Top-rated suite" }
              ].map((stat, i) => (
                <div key={i} className="glass-dark p-8 rounded-[2rem] border border-white/10 hover:border-violet-500/40 transition-colors group">
                  <div className="text-3xl font-black text-white mb-2 group-hover:text-violet-400 transition-colors uppercase tracking-tight">{stat.val}</div>
                  <div className="text-sm font-black text-slate-200 mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-500">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[3rem] bg-gradient-to-br from-violet-600 to-indigo-700 p-12 md:p-24 overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-900/40 rounded-full blur-[60px] -ml-24 -mb-24" />

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <Star className="size-16 text-violet-200 fill-violet-200 mx-auto mb-8 animate-pulse" />
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Ready to master your documents?</h2>
              <p className="text-xl text-violet-100 mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
                Join 2 million users and experience the fastest, most professional way to work with PDFs. It's free to start.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" className="h-16 px-12 text-lg font-black rounded-2xl bg-white text-violet-700 hover:bg-slate-100 shadow-xl" asChild>
                  <Link href="/auth/register">Create Free Account</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-black rounded-2xl border-2 border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                  <Link href="/">View Pricing</Link>
                </Button>
              </div>
              <p className="mt-8 text-sm font-bold text-violet-200 tracking-wide uppercase">No credit card required • Instant access</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
