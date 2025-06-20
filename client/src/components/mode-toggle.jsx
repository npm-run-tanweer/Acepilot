import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ModeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer dark:hover:bg-neutral-700 hover:bg-gray-100 border-1 border-gray-400 dark:border-white h-10 w-10 flex justify-center items-center rounded-full transition duration-300"
    >
      {isDark ? <Sun size={20}/> : <Moon size={20}/>}
      <p className="sr-only">Toggle theme</p>
    </button>
  );
}
