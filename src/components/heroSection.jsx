"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, MessageCircle } from "lucide-react";

export default function Hero() {
  const semesters = [
    {
      year: "🎓 1st Year",
      items: [
        { emoji: "📘", label: "1st Semester", slug: "1st-semester" },
        { emoji: "📗", label: "2nd Semester", slug: "2nd-semester" },
      ],
    },
    {
      year: "🎓 2nd Year",
      items: [
        { emoji: "📙", label: "3rd Semester", slug: "3rd-semester" },
        { emoji: "📕", label: "4th Semester", slug: "4th-semester" },
      ],
    },
    {
      year: "🎓 3rd Year",
      items: [
        { emoji: "📓", label: "5th Semester", slug: "5th-semester" },
        { emoji: "📔", label: "6th Semester", slug: "6th-semester" },
      ],
    },
  ];

  return (
    <section className="rs-shell relative min-h-[92vh] px-5 py-10 text-white sm:px-6 md:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 py-8 lg:grid-cols-[1.2fr_0.95fr] lg:py-16">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-bold text-[#f59e0b]">
            <GraduationCap size={18} />
            JUT Diploma Resources
          </div>

          <h1 className="font-display max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Premium <span className="rs-gradient-text">study material</span> for JUT Diploma
          </h1>

          <p className="max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
            Access exam-focused notes, PDFs, PYQs, important questions, and
            semester-wise resources for Diploma students. Buy the exact study
            material you need and start preparing faster.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/projects"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-6 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition duration-300 hover:-translate-y-1 sm:w-auto"
            >
              Browse Study Material
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://whatsapp.com/channel/0029VaUTY3p4CrfpY1DEPq2M"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-[#25D366]/40 hover:bg-[#25D366]/15 sm:w-auto"
            >
              <MessageCircle size={18} />
              Join WhatsApp channel
            </a>
          </div>
        </div>

        <div className="rs-card w-full rounded-2xl border border-white/8 bg-white/[0.04] p-6 md:p-8 backdrop-blur-md">
          <div className="mb-6 flex flex-col items-start gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a56ff]/25 to-[#7c3aed]/20 text-white shadow-lg shadow-blue-500/20">
                <BookOpen size={24} className="animate-pulse" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-bold md:text-3xl">JUT Diploma Study Material</h2>
                <p className="text-xs text-gray-400 sm:text-sm">Semester-wise notes, PYQs, and resources for all branches.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:gap-6">
            {semesters.map((group) => (
              <div key={group.year} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#1a56ff] to-[#7c3aed]"></div>
                  <h3 className="text-lg font-bold text-gray-100 md:text-xl">{group.year}</h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                  {group.items.map((s) => (
                    <Link
                      href={`/study-material/${s.slug}`}
                      key={s.slug}
                      className="rs-card group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-4 sm:p-5 transition-all duration-300 ease-out hover:border-white/20 hover:bg-gradient-to-br hover:from-[#1a56ff]/10 hover:to-[#7c3aed]/8 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a56ff]/0 to-[#7c3aed]/0 opacity-0 transition-opacity duration-300 group-hover:from-[#1a56ff]/5 group-hover:to-[#7c3aed]/3 group-hover:opacity-100"></div>
                      
                      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-start">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1a56ff]/20 to-[#7c3aed]/15 text-2xl shadow-md transition-transform group-hover:scale-110">
                          {s.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-sm font-bold text-white md:text-base">{s.label}</span>
                            <span className="w-fit rounded-full bg-gradient-to-r from-[#1a56ff]/20 to-[#7c3aed]/15 px-3 py-1 text-xs font-semibold text-blue-200 shadow-sm">
                              Free & Paid
                            </span>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-gray-400 md:text-sm">
                            Complete notes, PYQs, PDFs & curated resources
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-white/8 bg-gradient-to-r from-[#1a56ff]/8 to-[#7c3aed]/6 p-4 sm:p-5">
              <p className="text-center text-sm leading-relaxed text-gray-300 md:text-base">
                Free and premium study materials are updated regularly for all semesters and branches.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="https://whatsapp.com/channel/0029VaUTY3p4CrfpY1DEPq2M"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 sm:w-auto"
              >
                <MessageCircle size={18} />
                Join WhatsApp Channel → Get Free Updates
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
