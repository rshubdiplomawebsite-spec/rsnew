"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppData } from "../context/AppContext";
import Logo from "./logo";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();

  const { user, isAuth, loading } = AppData();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Study Material" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#050510]/85 backdrop-blur-lg">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold text-gray-300 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {isAuth && (
              <Link
                href="/purchased-items"
                className="relative text-sm font-semibold text-gray-300 transition-colors duration-200 hover:text-white"
              >
                My Notes
              </Link>
            )}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="relative text-sm font-semibold text-[#f59e0b] transition-colors duration-200 hover:text-white"
              >
                Admin
              </Link>
            )}
          </nav>

          {loading ? (
            ""
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              {isAuth ? (
                <button
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] font-semibold text-white shadow-lg transition duration-200 hover:scale-105"
                  onClick={() => router.push("/profile")}
                >
                  {user?.name?.slice(0, 1).toUpperCase()}
                </button>
              ) : (
                <button
                  onClick={() => router.push("/login")}
                  className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:border-[#1a56ff]/50 hover:bg-[#1a56ff]/20"
                >
                  Student Login
                </button>
              )}
            </div>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`md:hidden absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 bg-[#050510]/95 backdrop-blur-md border-t border-white/10 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-6">
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuth && (
                <Link
                  href="/purchased-items"
                  className="text-lg font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Notes
                </Link>
              )}
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-lg font-medium text-[#f59e0b] transition-colors duration-200 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {isAuth ? (
                <button
                  className="mx-auto mt-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] text-lg font-bold text-white shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/profile");
                  }}
                >
                  {user?.name?.slice(0, 1).toUpperCase()}
                </button>
              ) : (
                <button
                  className="mt-4 w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:border-[#1a56ff]/50 hover:bg-[#1a56ff]/20"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/login");
                  }}
                >
                  Student Login
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
