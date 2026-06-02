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
    <section className="rs-shell relative min-h-[92vh] px-5 pt-28 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-bold text-[#f59e0b]">
            <GraduationCap size={18} />
            JUT Diploma Resources
          </div>

          <h1 className="font-display mb-5 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
            Premium <span className="rs-gradient-text">study material</span> for JUT Diploma
          </h1>

          <p className="mb-8 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
            Access exam-focused notes, PDFs, PYQs, important questions, and
            branch-wise resources for Diploma students. Buy the exact study
            material you need and start preparing faster.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-6 py-4 font-bold text-white shadow-lg shadow-blue-950/40 transition hover:-translate-y-1"
            >
              Browse Study Material
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://whatsapp.com/channel/0029VaUTY3p4CrfpY1DEPq2M"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-[#25D366]/40 hover:bg-[#25D366]/15"
            >
              <MessageCircle size={18} />
              Join WhatsApp channel
            </a>
          </div>
        </div>

        <div className="rs-card p-5">
          <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#1a56ff]/20 to-[#7c3aed]/18 text-white">
              <BookOpen size={22} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">JUT Diploma Study Material</h2>
              <p className="text-sm text-gray-400">Semester-wise notes, PYQs, and resources for all branches.</p>
            </div>
          </div>

          <div className="grid gap-4">
            {semesters.map((group) => (
              <div key={group.year} className="">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-200">{group.year}</h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {group.items.map((s) => (
                    <Link
                      href={`/projects?semester=${s.slug}`}
                      key={s.slug}
                      className="rs-card flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.03] p-3 text-sm font-semibold text-white transition transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-[#1a56ff]/20 to-[#7c3aed]/18 text-white text-lg">
                        {s.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span>{s.label}</span>
                          <span className="rounded-full bg-white/6 px-2 py-0.5 text-xs font-medium text-gray-200">Free & Paid</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-400">Notes, PYQs, PDFs, and curated resources</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-gray-300">
            Free and premium study materials are updated regularly for all semesters and branches.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://whatsapp.com/channel/0029VaUTY3p4CrfpY1DEPq2M"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-4 py-2 text-sm font-bold text-white shadow transition hover:scale-[1.01]"
            >
              Join WhatsApp Channel → Get Free Updates
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
