'use client'

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
    
  const pathname = usePathname();

  return (
    <ul className="hidden lg:flex gap-10">
      {headerLinks.map((link) => {
          const isActive =
          (pathname === "/" && link.route === "/") ||
          pathname === link.route ||
          pathname?.startsWith(`${link.route}/`);

        return (
          <li key={link.route} className={`${isActive && "text-primary"}`}>
            <Link
              href={link.route}
              className="hover:underline hover:underline-offset-2 font-medium text-sm"
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
