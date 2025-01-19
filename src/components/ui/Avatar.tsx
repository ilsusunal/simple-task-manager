import Image from "next/image";
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
    <Image
      src={src || "/default-avatar.png"}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover border-2 border-primary"
    />
  );
}
