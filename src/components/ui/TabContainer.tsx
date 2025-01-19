"use client";
import React, { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabContainerProps {
  tabs: Tab[];
  initialTabIndex?: number;
}

export default function TabContainer({
  tabs,
  initialTabIndex = 0,
}: TabContainerProps) {
  const [activeIndex, setActiveIndex] = useState(initialTabIndex);

  return (
    <div>
      <div className="flex space-x-2 border-b-2 overflow-y-auto">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-2 transition ${
              activeIndex === idx
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-neutral hover:text-text"
            }`}
            onClick={() => setActiveIndex(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 bg-background">
        {tabs[activeIndex]?.content ?? <div>No Content</div>}
      </div>
    </div>
  );
}
