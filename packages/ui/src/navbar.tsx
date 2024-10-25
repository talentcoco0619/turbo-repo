"use client";

import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
}

export const Navbar = ({ children }: NavbarProps) => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-8 border-b border-[#FFFFFF] h-16">
      <div className="flex items-center">
        <h1 className="hidden md:block text-xl md:text-3xl font-bold text-primary">
          {children}
        </h1>
      </div>
    </div>
  );
};
