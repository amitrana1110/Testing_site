"use client";

import Link from "next/link";
import { useState } from "react";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import { usePathname } from "next/navigation";
import defaultNavItems from "@/data/headerData.json";

export const navItems = defaultNavItems;

function Header({ items = defaultNavItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <MaxWidthContainer className="py-0! px-0!">
        <div className="flex items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <Link href="/" className="h2 font-semibold tracking-tight">
            Rana<span className="text-[#F5A800]">Taxi</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`text-[15px] transition-colors ${
                      isActive(item.path)
                        ? "font-bold text-black"
                        : "font-medium text-gray-500 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Call Now Button */}
            <button className="flex items-center gap-2 bg-black text-white text-[15px] font-semibold px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors">
              <span className="w-6 h-6 aspect-square">
                <img
                  src="/icons/fluent_call-32-call.svg"
                  alt="phone icon"
                  width={24}
                  height={24}
                />
              </span>
              <span>Call Now</span>
            </button>
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen
              ? "max-h-80 border-t border-gray-100"
              : "max-h-0"
          }`}
        >
          <ul className="flex flex-col px-6 py-4 gap-4">
            {items.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-[15px] py-1 transition-colors ${
                    isActive(item.path)
                      ? "font-bold text-black"
                      : "font-medium text-gray-500"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Call Now — mobile */}
            <li>
              <button className="mt-2 w-full flex items-center justify-center gap-2 bg-black text-white font-semibold px-5 py-3 rounded-xl">
                <span className="w-6 h-6 aspect-square">
                  <img
                    src="/icons/fluent_call-32-call.svg"
                    alt="phone icon"
                    width={24}
                    height={24}
                  />
                </span>
                <span>Call Now</span>
              </button>
            </li>
          </ul>
        </div>
      </MaxWidthContainer>
    </header>
  );
}

export default Header;