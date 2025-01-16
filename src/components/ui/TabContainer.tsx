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
      <div className="flex space-x-2 border-b border-neutral p-2">
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

      {/* Tab Content */}
      <div className="mt-4">
        {tabs[activeIndex]?.content ?? <div>No Content</div>}
      </div>
    </div>
  );
}
