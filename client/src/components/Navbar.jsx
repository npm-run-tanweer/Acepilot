"use client";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar";
import { useState } from "react";
import { ModeToggle } from './mode-toggle';
 
export function NavbarDemo() {
  const navItems = [
    {
      name: "Resume",
      link: "#resume",
    },
    {
      name: "Cover Letter",
      link: "#cover-letter",
    },
    {
      name: "Services",
      link: "#services",
    },
    {
      name: "Help",
      link: "#help"
    }
  ];
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  return (
    <div className="relative w-full text-neutral-800">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo/>
          <ModeToggle/>
        </NavBody>
 
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
 
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative dark:text-neutral-900 hover:bg-gray-700"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full gap-4">
              <SignedOut>
                <SignInButton forceRedirectUrl={"/onboarding/step1"}>
                  <NavbarButton className='w-[50%] text-blue-600 text-lg font-[Inter] px-2 py-2 rounded-lg transition-all duration-300 cursor-none border-1 border-blue-500'>Login</NavbarButton>
                </SignInButton>
                <SignUpButton forceRedirectUrl={"/onboarding/step1"}>
                  <NavbarButton className='w-[50%] text-lg font-[Inter] bg-blue-500 !text-white px-2 py-2 rounded-lg transition-all duration-300 cursor-none hover:!text-blue-500 hover:bg-white'>Sign Up</NavbarButton>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton/>
              </SignedIn>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
 
      {/* Navbar */}
    </div>
  );
}