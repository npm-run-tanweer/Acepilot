import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { NavbarDemo } from "./Navbar";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="">
      <NavbarDemo />
      <div className="bg-neutral-900 dark:bg-neutral-950 text-neutral-950 dark:text-white  font-sans w-screen">
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br dark:bg-neutral-900 bg-white w-full">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold max-w-3xl z-20"
          >
            Ace Your Learning Journey with{" "}
            <span className="text-blue-500">Acepilot</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-lg md:text-lg max-w-xl z-20"
          >
            Generate study plans, flashcards, and questions with one prompt.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 z-20"
          >
            <SignedOut>
              <SignInButton forceRedirectUrl={"/dashboard"}>
                <Button className="px-6 py-3 text-lg rounded-xl shadow-md bg-blue-600 text-white dark:bg-gray-100 dark:text-black dark:hover:bg-blue-500 dark:hover:text-white cursor-pointer">
                  Try Acepilot
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                onClick={() => {
                  navigate("/dashboard");
                }}
                className="px-6 py-3 text-lg rounded-xl shadow-md bg-blue-600 text-white dark:bg-gray-100 dark:text-black dark:hover:bg-blue-500 dark:hover:text-white cursor-pointer"
              >
                Try Acepilot
              </Button>
            </SignedIn>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
