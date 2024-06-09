'use client'

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, Plus } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { headerLinks } from "@/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const [openSheet, setOpenSheet] = useState(false);

  const pathname = usePathname(); 

  return (
    <nav className="lg:hidden">
      <Sheet open={openSheet} onOpenChange={setOpenSheet}> 
        <SheetTrigger className="align-middle">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white lg:hidden">
          <Link href={'/'} onClick={() => {setOpenSheet(false)}}> 
            <Image src={"/logo.svg"} alt="logo" width={128} height={38} />
          </Link>
          <Separator className="border border-gray-50" />
          <ul className="space-y-4">
            {headerLinks.map((link) => {
                const isActive =
                (pathname === "/" && link.route === "/") ||
                pathname === link.route ||
                pathname?.startsWith(`${link.route}/`);
              return (
                <li
                  key={link.route}
                  className={`${isActive && "text-primary"}`}
                >
                  <Link
                    href={link.route}
                    onClick={() => {setOpenSheet(false)}}
                    className="hover:underline hover:underline-offset-2 font-medium text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Separator className="border border-gray-50" />
          <div className="md:hidden w-fit">
            <Button asChild className="flex md:hidden gap-2 text-white">
              <Link href={"/problems/upload"} onClick={() => {setOpenSheet(false)}}> 
                <Plus className="w-5 h-5" color="white" />
                Share Your Problem
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
