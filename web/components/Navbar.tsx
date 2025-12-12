"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname() || "";
  const nav = [
    "resume",
    "posts",
    "experiences",
    "projects",
    "certificates",
    "events",
    "publications",
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ml-bg/70 backdrop-blur-md border-b border-white/10">
      <nav className="container flex items-center justify-between h-16">
        <div className="font-mono text-ml-vision text-xl tracking-wide">
          Mohit ML Lab
        </div>

        <ul className="flex items-center space-x-6">
          {nav.map((n) => {
            const active = pathname.includes(`/${n}`);
            return (
              <li key={n} className="list-none">
                <Link
                  href={`/${n}`}
                  className={`transition-colors text-sm ${
                    active
                      ? "text-ml-vision"
                      : "text-gray-300 hover:text-ml-vision"
                  }`}
                >
                  {n.charAt(0).toUpperCase() + n.slice(1)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
