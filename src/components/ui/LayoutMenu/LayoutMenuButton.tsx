import React from "react";

interface LayoutMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  title: string;
  link: string;
  children: React.ReactNode;
}

export default function LayoutMenuButton({
  icon,
  title,
  link,
  children,
  ...props
}: LayoutMenuButtonProps) {
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 rounded-md font-medium focus:outline-none"
        {...props}
      >
        <i className="ri-notification-line" />
        {children}
      </button>
    </>
  );
}
