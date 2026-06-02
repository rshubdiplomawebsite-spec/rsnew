"use client";

import React from "react";
import { FileText, MessageCircle, Video, ClipboardList } from "lucide-react";

const features = [
  {
    title: "Premium Notes & PDFs",
    icon: FileText,
    description:
      "Clean chapter-wise resources for quick revision and regular semester preparation.",
  },
  {
    title: "PYQ & Important Questions",
    icon: ClipboardList,
    description:
      "Previous year questions and exam-focused questions arranged for semester-wise practice.",
  },
  {
    title: "Video Guidance",
    icon: Video,
    description:
      "Preparation videos, career guidance, and last-minute strategy support from RS Hub Study Material.",
  },
  {
    title: "Student Community",
    icon: MessageCircle,
    description:
      "WhatsApp groups for common updates and branch-specific student discussions.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#050510] px-6 py-16 md:px-16 xl:px-32">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">
          Everything a Diploma Student Needs
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Semester-wise notes, PYQs, PDFs, videos, and instant access for focused
          diploma preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
          <div
            key={feature.title}
            className="rs-card p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a56ff]/15 text-[#f59e0b]">
              <Icon size={24} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-white">
              {feature.title}
            </h3>
            <p className="text-sm leading-6 text-gray-400">
              {feature.description}
              </p>
          </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
