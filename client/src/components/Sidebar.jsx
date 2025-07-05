"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBook,
  IconBrandTabler,
  IconChevronLeftPipe,
  IconChevronRightPipe,
  IconFolder,
  IconFolderOpen,
  IconSelector,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { animate, easeInOut, motion } from "motion/react";
import { cn } from "../lib/utils";
import { NavbarDemo } from "./Navbar";
import { useUser } from "@clerk/clerk-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Dashboard from "./Dashboard";

export function SidebarDemo() {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user);
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/sign-out",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [menu, showMenu] = useState(false);
  const menuVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in</div>;
  
  return (
    <div
      className={cn(
        "sticky top-0 flex h-screen flex-col border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800"
        // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto mx-auto">
            {open ? <Logo /> : <LogoIcon />}
          </div>
          <div className="flex flex-col justify-between w-full">
            {open ? (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                className="flex items-center justify-between"
              >
                <SidebarLink
                  link={{
                    label: user.fullName,
                    href: "#",
                    icon: (
                      <img
                        src={user.imageUrl}
                        className="h-7 w-7 shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                    ),
                  }}
                />
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    showMenu(!menu);
                  }}
                >
                  <IconSelector />
                </button>
              </motion.div>
            ) : (
              <div>
                <img
                  src={user.imageUrl}
                  className="h-7 w-7 shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              </div>
            )}
            {menu && (
              <motion.div
                key="menu"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
              >
                <div className="h-[1px] bg-gray-400 mb-2" />
                <div className="flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 text-2xl font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Acepilot
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};
