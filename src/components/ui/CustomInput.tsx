"use client";

import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomInputProps {
  label?: string;
  error?: string;
  as?: "input" | "textarea" | "select";
  options?: SelectOption[];
  multiple?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function CustomInput({
  label,
  error,
  as = "input",
  options = [],
  multiple = false,
  className = "",
  ...props
}: CustomInputProps) {
  return (
    <div className="w-full mb-3">
      {label && <label className="block font-semibold mb-1">{label}</label>}

      {as === "textarea" && (
        <textarea
          className={`w-full border p-2 rounded focus:outline-none ${className}`}
          {...props}
        />
      )}

      {as === "select" && (
        <select
          className={`w-full border p-2 rounded focus:outline-none ${className}`}
          multiple={multiple}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {as === "input" && (
        <input
          className={`w-full border p-2 rounded focus:outline-none ${className}`}
          {...props}
        />
      )}

      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </div>
  );
}
