import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

export default function Avatar({
  src,
  alt = "avatar",
  size = 40,
}: AvatarProps) {
  return (
    <img
      src={src || "/default-avatar.png"}
      alt={alt}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}
