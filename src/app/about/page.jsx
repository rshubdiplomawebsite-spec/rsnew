"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ClipboardList, GraduationCap, Users } from "lucide-react";

export default function AboutPage() {
  const points = [
    {
      icon: BookOpen,
      title: "Exam-Focused Learning",
      text: "Concept-based notes, PDFs, and revision resources made for Diploma semester exams.",
    },
    {
      icon: ClipboardList,
      title: "PYQ & VVI Questions",
      text: "Previous year questions and important questions organized for quick practice.",
    },
    {
      icon: GraduationCap,
      title: "JUT Diploma Support",
      text: "Resources for Jharkhand University of Technology Diploma students across branches.",
    },
    {
      icon: Users,
      title: "Student Community",
      text: "WhatsApp groups and video guidance to keep students connected and updated.",
    },
  ];

  return (
    <main className="rs-shell min-h-screen px-5 pb-16 pt-28">
      <section className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-bold text-[#f59e0b]">
          About RS Hub Study Material
        </div>
        <h1 className="font-display mb-5 text-4xl font-extrabold text-white md:text-6xl">
          Learn Smart, <span className="rs-gradient-text">Score Better</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-300">
          RS Hub Study Material is a dedicated learning platform for Polytechnic
          students who want clear, simple, and exam-focused study material. Our
          mission is to simplify technical education with notes, important
          questions, PYQs, videos, and last-minute preparation guidance.
        </p>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2">
        {points.map((point) => {
          const Icon = point.icon;
          return (
            <div key={point.title} className="rs-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a56ff]/15 text-[#f59e0b]">
                <Icon size={24} />
              </div>
              <h2 className="mb-3 text-xl font-bold text-white">{point.title}</h2>
              <p className="leading-7 text-gray-400">{point.text}</p>
            </div>
          );
        })}
      </section>

      <section className="mx-auto mt-12 max-w-4xl rs-card p-8 text-center">
        <h2 className="font-display mb-4 text-3xl font-bold text-white">
          Premium Material, Simple Access
        </h2>
        <p className="mb-6 leading-7 text-gray-400">
          Browse the material, purchase through the website, and access your
          purchased notes from your account.
        </p>
        <Link
          href="/projects"
          className="inline-flex rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-6 py-3 font-bold text-white"
        >
          Browse Study Material
        </Link>
      </section>
    </main>
  );
}
