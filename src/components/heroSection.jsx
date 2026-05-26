"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, MessageCircle } from "lucide-react";

export default function Hero() {
  const branches = [
    "EE / EEE",
    "Mechanical",
    "Computer Science",
    "ECE",
    "Civil",
    "Mining",
    "Automobile",
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
           Free & Premium <span className="rs-gradient-text">study material</span> for JUT Diploma
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
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f59e0b]/15 text-[#f59e0b]">
              <BookOpen size={22} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">Branch Wise Material</h2>
              <p className="text-sm text-gray-400">Notes, PYQs, PDFs, and videos</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {branches.map((branch) => (
              <Link
                href="/projects"
                key={branch}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-white transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
              >
                {branch}
              </Link>
            ))}
          </div>
          <p className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-gray-300">
            Remaining subjects, notes, PDFs and important questions are updated
            regularly for all branches.
          </p>
        </div>
      </div>
    </section>
  );
}
