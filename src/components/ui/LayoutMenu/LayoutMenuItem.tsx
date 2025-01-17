import React from "react";
import LayoutMenuButton from "./LayoutMenuButton";

interface LayoutMenuItemProps {
  mainTitle: string;
  menuItemData: [];
}

export default function LayoutMenuItem({}: LayoutMenuItemProps) {
  return (
    <>
      <div>
        <h1>Title</h1>
      </div>
      <nav>
        <ul>
          <li>
            <LayoutMenuButton
              icon={""}
              title={""}
              link={""}
              children={undefined}
            ></LayoutMenuButton>
          </li>
        </ul>
      </nav>
    </>
  );
}
