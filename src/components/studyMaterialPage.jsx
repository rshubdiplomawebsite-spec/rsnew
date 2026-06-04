import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, FileText, Video } from "lucide-react";

export const semesterCatalog = [
  {
    slug: "1st-semester",
    label: "1st Semester",
    year: "1st Year",
    description: "Common subjects, branch notes, PYQs, and study resources for the first semester.",
    branches: [
      { slug: "automobile", label: "Automobile", emoji: "🚗" },
      { slug: "chemistry", label: "Chemistry", emoji: "🧪" },
      { slug: "civil", label: "Civil", emoji: "🏗️" },
      { slug: "computer", label: "Computer", emoji: "💻" },
      { slug: "ece", label: "ECE", emoji: "📡" },
      { slug: "ee", label: "EE", emoji: "⚡" },
      { slug: "math", label: "Math", emoji: "📐" },
      { slug: "mechanical", label: "Mechanical", emoji: "⚙️" },
      { slug: "metallurgical", label: "Metallurgical", emoji: "🧲" },
      { slug: "mining", label: "Mining", emoji: "⛏️" },
      { slug: "physics", label: "Physics", emoji: "🔬" },
    ],
  },
  {
    slug: "2nd-semester",
    label: "2nd Semester",
    year: "1st Year",
    description: "Second semester notes, PYQs, and branch-wise study material in the same format.",
    branches: [
      { slug: "automobile", label: "Automobile", emoji: "🚗" },
      { slug: "chemistry", label: "Chemistry", emoji: "🧪" },
      { slug: "civil", label: "Civil", emoji: "🏗️" },
      { slug: "computer", label: "Computer", emoji: "💻" },
      { slug: "ece", label: "ECE", emoji: "📡" },
      { slug: "ee", label: "EE", emoji: "⚡" },
      { slug: "math", label: "Math", emoji: "📐" },
      { slug: "mechanical", label: "Mechanical", emoji: "⚙️" },
      { slug: "metallurgical", label: "Metallurgical", emoji: "🧲" },
      { slug: "mining", label: "Mining", emoji: "⛏️" },
      { slug: "physics", label: "Physics", emoji: "🔬" },
    ],
  },
  {
    slug: "3rd-semester",
    label: "3rd Semester",
    year: "2nd Year",
    description: "Third semester branch resources, notes, and PYQ packs for continued prep.",
    branches: [
      { slug: "civil", label: "Civil", emoji: "🏗️" },
      { slug: "cse", label: "CSE", emoji: "💻" },
      { slug: "ece", label: "ECE", emoji: "📡" },
      { slug: "ee", label: "EE", emoji: "⚡" },
      { slug: "me", label: "ME", emoji: "⚙️" },
    ],
  },
  {
    slug: "4th-semester",
    label: "4th Semester",
    year: "2nd Year",
    description: "Fourth semester notes, PYQs, and branch-specific revision material.",
    branches: [
      { slug: "ce", label: "CE", emoji: "🏗️" },
      { slug: "cse", label: "CSE", emoji: "💻" },
      { slug: "ece", label: "ECE", emoji: "📡" },
      { slug: "ee", label: "EE", emoji: "⚡" },
      { slug: "me", label: "ME", emoji: "⚙️" },
    ],
  },
  {
    slug: "5th-semester",
    label: "5th Semester",
    year: "3rd Year",
    description: "Advanced semester notes, previous-year questions, and focused revision packs.",
    branches: [
      { slug: "civil", label: "Civil", emoji: "🏗️" },
      { slug: "computer", label: "Computer", emoji: "💻" },
      { slug: "ece", label: "ECE", emoji: "📡" },
      { slug: "ee", label: "EE", emoji: "⚡" },
      { slug: "mechanical", label: "Mechanical", emoji: "⚙️" },
    ],
  },
  {
    slug: "6th-semester",
    label: "6th Semester",
    year: "3rd Year",
    description: "Final semester resources, branch notes, and PYQ practice material.",
    branches: [
      { slug: "civil", label: "Civil", emoji: "🏗️" },
      { slug: "computer", label: "Computer", emoji: "💻" },
      { slug: "ece", label: "ECE", emoji: "📡" },
      { slug: "ee", label: "EE", emoji: "⚡" },
      { slug: "mechanical", label: "Mechanical", emoji: "⚙️" },
    ],
  },
];

export default function StudyMaterialPage({ semester }) {
  return (
    <main className="rs-shell min-h-screen px-4 pb-16 pt-28 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-bold text-[#f59e0b]">
            <GraduationCap size={16} />
            JUT Diploma Study Material
          </div>
          <h1 className="font-display text-4xl font-extrabold md:text-6xl">{semester.label}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">{semester.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {semester.branches.map((branch) => (
            <Link
              key={`${semester.slug}-${branch.slug}`}
              href={`/study-material/${semester.slug}/${branch.slug}`}
              className="rs-card group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#1a56ff]/40 hover:bg-white/[0.07]"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a56ff]/20 to-[#7c3aed]/15 text-2xl shadow-lg shadow-blue-950/40">
                  {branch.emoji}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-blue-200">{semester.year}</p>
                  <h2 className="text-xl font-bold text-white">{branch.label}</h2>
                </div>
              </div>
              <p className="text-sm text-gray-300">Open notes, PYQs, important questions, and lecture material for {branch.label}.</p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-200">
                <span>Click to open</span>
                <span className="rounded-full bg-[#1a56ff]/15 px-3 py-1 text-xs font-semibold text-blue-100">Branch Page</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export function BranchMaterialPage({ semester, branch }) {
  const resources = [
    { title: "Notes", icon: <BookOpen size={18} />, text: "Chapter-wise notes, theory summary, and revision points for this branch." },
    { title: "PYQ", icon: <FileText size={18} />, text: "Previous year question papers and exam-oriented practice questions." },
    { title: "Important Questions", icon: <FileText size={18} />, text: "Most expected questions and short notes for fast revision." },
    { title: "Video Lectures", icon: <Video size={18} />, text: "Lecture links and video resources for simplified understanding." },
  ];

  return (
    <main className="rs-shell min-h-screen px-4 pb-16 pt-28 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/study-material/${semester.slug}`}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
        >
          <ArrowLeft size={16} />
          Back to {semester.label}
        </Link>

        <div className="rs-card rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-200">{semester.label}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">{branch.label} Study Material</h1>
          <p className="mt-4 max-w-3xl text-gray-300">This branch page is now connected to the new Next.js route. You can plug in the exact old HTML links later, but the structure and navigation are ready.</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {resources.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="mb-3 flex items-center gap-2 text-[#f59e0b]">
                  {item.icon}
                  <h2 className="text-xl font-bold text-white">{item.title}</h2>
                </div>
                <p className="text-sm text-gray-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
