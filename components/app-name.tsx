import { cn } from "@/lib/utils";
import { useStageStore } from "@/store/store";
import { Outfit } from "next/font/google";
import Link from "next/link";

const outfit = Outfit({ weight: ["600", "700", "800"] });

export function AppName() {
  return (
    <Link
      href={"/"}
      className={cn(
        "font-[800] fixed top-6 left-6 text-3xl z-20 text-slate-700/90"
      )}
    >
      Aurora
    </Link>
  );
}
