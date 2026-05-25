"use client";

import React from "react";
import {
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { AppData } from "../../context/AppContext";
import Link from "next/link";

const StudyMaterialShowcase = () => {
  const categories = ["Notes", "PYQ", "Important Questions", "Video Lectures", "D2D", "PECE"];

  const {
    projects,
    search,
    category,
    page,
    setPage,
    setSearch,
    setCategory,
    totalPages,
  } = AppData();

  const nextPage = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  return (
    <main className="rs-shell min-h-screen px-4 pb-16 pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-bold text-[#f59e0b]">
            JUT Diploma Resources
          </div>
          <h1 className="font-display mb-4 text-4xl font-extrabold text-white md:text-6xl">
            Buy Study Material
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-400">
            Browse branch-wise notes, PDFs, PYQs, important questions, and video
            resources. Purchase once and access your material from your account.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-80">
            <div className="rs-card sticky top-24 p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes, PYQ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none transition focus:border-[#1a56ff]/60"
                />
              </div>

              <h3 className="mb-4 flex items-center gap-2 font-bold text-white">
                <Filter className="h-5 w-5" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setCategory("")}
                  className={`w-full rounded-lg px-4 py-3 text-left transition ${
                    category === ""
                      ? "border border-[#1a56ff]/50 bg-[#1a56ff]/20 text-white"
                      : "text-gray-300 hover:bg-white/[0.06]"
                  }`}
                >
                  All Material
                </button>
                {categories.map((selectedCategory) => (
                  <button
                    key={selectedCategory}
                    onClick={() => setCategory(selectedCategory)}
                    className={`w-full rounded-lg px-4 py-3 text-left transition ${
                      category === selectedCategory
                        ? "border border-[#1a56ff]/50 bg-[#1a56ff]/20 text-white"
                        : "text-gray-300 hover:bg-white/[0.06]"
                    }`}
                  >
                    {selectedCategory}
                  </button>
                ))}
              </div>

              <a
                href="https://whatsapp.com/channel/0029VaUTY3p4CrfpY1DEPq2M"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#25D366] to-[#1ebe5d] px-4 py-3 font-bold text-white"
              >
                <MessageCircle size={18} />
                whatsapp channel
              </a>
            </div>
          </aside>

          <section className="flex-1">
            {!projects && <p className="text-center text-2xl text-white">Loading...</p>}
            {projects?.length === 0 ? (
              <div className="rs-card p-12 text-center">
                <h3 className="mb-2 text-2xl font-bold text-white">No Material Found</h3>
                <p className="text-gray-400">Try another search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects?.map((project) => (
                  <article
                    key={project._id}
                    className="rs-card overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-white/20"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-48 w-full object-cover"
                      />
                      <div className="absolute left-4 top-4 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/15 px-3 py-1 text-xs font-bold text-[#f59e0b]">
                        {project.category || "Study Material"}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
                      <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-400">
                        {project.description}
                      </p>

                      <div className="mb-5 flex flex-wrap gap-2">
                        {project.technology.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href={`/project/${project._id}`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-4 py-2.5 font-semibold text-white"
                        >
                          Details <Eye size={18} />
                        </Link>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-semibold text-white hover:bg-white/10"
                          >
                            Video <Youtube size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-sm text-gray-400">
                  Page {page} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={prevPage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>
                  <button
                    disabled={page === totalPages}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={nextPage}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default StudyMaterialShowcase;
