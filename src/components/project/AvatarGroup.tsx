import React from "react";
import Avatar from "../ui/Avatar";

interface User {
  id: number | string;
  name: string;
  avatar?: string;
}

interface AvatarGroupProps {
  users: User[];
  maxCount?: number;
}

export default function AvatarGroup({ users, maxCount = 5 }: AvatarGroupProps) {
  const displayedUsers = users.slice(0, maxCount);
  const remainder = users.length - maxCount;

  return (
    <div className="flex -space-x-2">
      {displayedUsers.map((user) => (
        <div key={user.id} className="border-2 border-white rounded-full">
          <Avatar src={user.avatar} alt={user.name} />
        </div>
      ))}
      {remainder > 0 && (
        <div className="w-8 h-8 rounded-full bg-neutral flex items-center justify-center text-white text-xs border-2 border-white">
          +{remainder}
        </div>
      )}
    </div>
  );
}
