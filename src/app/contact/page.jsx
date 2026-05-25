"use client";

import React from "react";
import { Mail, MessageCircle, Phone, Youtube } from "lucide-react";

export default function ContactPage() {
  const contacts = [
    {
      label: "WhatsApp",
      value: "+91 7783063989",
      href: "https://wa.me/917783063989",
      icon: MessageCircle,
    },
    {
      label: "Email",
      value: "rshubdiploma@gmail.com",
      href: "mailto:rshubdiploma@gmail.com",
      icon: Mail,
    },
    {
      label: "Phone",
      value: "+91 7783063989",
      href: "tel:+917783063989",
      icon: Phone,
    },
    {
      label: "YouTube",
      value: "@Rshubdiploma",
      href: "https://www.youtube.com/@Rshubdiploma",
      icon: Youtube,
    },
  ];

  return (
    <main className="rs-shell min-h-screen px-5 pb-16 pt-28">
      <section className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-bold text-[#f59e0b]">
          Get In Touch
        </div>
        <h1 className="font-display mb-5 text-4xl font-extrabold text-white md:text-6xl">
          Contact <span className="rs-gradient-text">RS Hub Study Material</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-300">
          Need help with notes, purchased material, PYQs, or branch guidance?
          Reach out directly.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rs-card flex items-center gap-4 p-6 transition hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a56ff]/15 text-[#f59e0b]">
                <Icon size={23} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{contact.label}</p>
                <p className="font-semibold text-white">{contact.value}</p>
              </div>
            </a>
          );
        })}
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <a
          href="https://chat.whatsapp.com/BaYThHd1Kvt9VfyEfVB9Ur"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#25D366] to-[#1ebe5d] px-6 py-5 text-lg font-bold text-white shadow-lg shadow-green-950/30"
        >
          <MessageCircle size={22} />
          Join Common WhatsApp Group
        </a>
      </section>
    </main>
  );
}
