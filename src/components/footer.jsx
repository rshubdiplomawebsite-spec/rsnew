"use client";

import React from "react";
import Link from "next/link";
import Logo from "./logo";
import { Instagram, Youtube, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Study Material", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/term-and-condition" },
    { name: "Refund Policy", href: "/refund-and-return" },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#050510]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-5 inline-flex">
              <Logo />
            </Link>
            <p className="max-w-md leading-7 text-gray-400">
              RS Hub Study Material helps JUT Diploma students prepare with premium
              notes, PYQs, important questions, videos, and semester-wise study
              resources.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.youtube.com/@Rshubdiploma"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 p-3 text-gray-300 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube size={21} />
              </a>
              <a
                href="https://wa.me/917783063989"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 p-3 text-gray-300 hover:text-white"
                aria-label="WhatsApp"
              >
                <MessageCircle size={21} />
              </a>
              <a
                href="mailto:rshubdiploma@gmail.com"
                className="rounded-lg border border-white/10 bg-white/5 p-3 text-gray-300 hover:text-white"
                aria-label="Email"
              >
                <Mail size={21} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 p-3 text-gray-300 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={21} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-display text-lg font-bold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-display text-lg font-bold text-white">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          © {currentYear} <span className="rs-gradient-text font-bold">RS Hub Study Material</span> · Made for JUT Diploma Students
        </div>
      </div>
    </footer>
  );
};

export default Footer;
