"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "basic";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  let baseClasses =
    "inline-flex items-center px-4 py-2 rounded-md font-medium focus:outline-none";

  switch (variant) {
    case "primary":
      baseClasses += " bg-primary text-white hover:bg-accent";
      break;
    case "secondary":
      baseClasses += " bg-secondary text-text hover:bg-primary";
      break;
    case "ghost":
      baseClasses += " bg-transparent hover:bg-neutral/10";
      break;
    case "basic":
      baseClasses +=
        " bg-white border-2 text-primary w-full hover:bg-primary hover:border-primary hover:text-white";
      break;
    default:
      break;
  }

  return (
    <button type="button" className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
