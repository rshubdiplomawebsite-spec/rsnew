"use client";

import React from "react";
import { ArrowUpRight, BookOpen, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "./loading";

const LatestMaterials = ({ projects }) => {
  const router = useRouter();

  if (!projects) return <Loading />;

  return (
    <section className="relative bg-[#050510] px-5 py-16">
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">
            Latest Study Material
          </h2>
          <div className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#1a56ff] to-[#7c3aed]"></div>
        </div>
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          Premium notes, PYQs, and exam resources uploaded for JUT Diploma students.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rs-card flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            <div className="absolute top-4 left-4 z-10 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/15 px-3 py-1 text-xs font-bold text-[#f59e0b]">
              Premium
            </div>

            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-52 object-cover"
              />
            </div>

            <div className="flex flex-col justify-between h-full p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technology.map((topic, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/project/${project._id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-4 py-2.5 text-center font-semibold text-white transition-all duration-300 sm:w-1/2"
                >
                  <BookOpen size={17} />
                  View
                </Link>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-center font-semibold text-white transition-all duration-300 hover:bg-white/10 sm:w-1/2"
                  >
                    <Youtube size={17} />
                    Video
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button
          className="group rounded-lg border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#1a56ff]/50 hover:bg-[#1a56ff]/20"
          onClick={() => router.push("/projects")}
        >
          <span className="flex items-center gap-2">
            View All Material
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </section>
  );
};

export default LatestMaterials;
