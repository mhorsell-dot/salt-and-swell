export const tokens = {
  layout: {
    container: "max-w-[1500px]",
    content: "max-w-7xl",
    section: "py-32",
    sectionLarge: "py-40",
  },

  radius: {
    sm: "rounded-xl",
    md: "rounded-2xl",
    lg: "rounded-[32px]",
    xl: "rounded-[40px]",
    full: "rounded-full",
  },

  shadow: {
    soft: "shadow-sm",
    medium: "shadow-md",
    large: "shadow-xl",
  },

  typography: {
    eyebrow: "text-xs uppercase tracking-[0.45em]",
    heading: "font-black tracking-[-0.05em]",
    body: "leading-8 text-neutral-600",
  },

  animation: {
    fast: "duration-300",
    normal: "duration-500",
    slow: "duration-700",
  },

  colours: {
    cream: "bg-[#F7F5F0]",
    white: "bg-white",
    black: "bg-black",
  },
} as const;
