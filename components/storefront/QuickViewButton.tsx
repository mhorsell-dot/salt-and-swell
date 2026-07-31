"use client";

import { Eye } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function QuickViewButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
      absolute
      left-1/2
      bottom-6
      -translate-x-1/2

      rounded-full
      bg-white/95
      backdrop-blur-xl

      px-6
      py-3

      font-semibold
      text-sm

      shadow-xl

      transition-all
      duration-300

      opacity-0
      group-hover:opacity-100

      hover:scale-105
      "
    >
      <span className="flex items-center gap-2">
        <Eye className="h-4 w-4" />
        Quick View
      </span>
    </button>
  );
}
