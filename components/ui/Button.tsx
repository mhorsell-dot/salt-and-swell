"use client";

import Link from "next/link";
import clsx from "clsx";
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = LinkProps | NativeButtonProps;

const styles = {
  primary: "bg-black text-white hover:bg-neutral-800",
  secondary: "border border-black bg-white text-black hover:bg-black hover:text-white",
  ghost: "bg-transparent text-black hover:bg-neutral-100",
};

function isLink(props: ButtonProps): props is LinkProps {
  return typeof (props as LinkProps).href === "string";
}

export default function Button(props: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] transition-all duration-300",
    styles[props.variant ?? "primary"],
    props.className,
  );

  if (isLink(props)) {
    const { children, variant, className, href, ...rest } = props;

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, variant, className, ...rest } = props;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
