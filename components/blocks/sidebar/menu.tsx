"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const Menu = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <button type="button" onClick={() => setIsMobile(true)}>
      <HamburgerMenuIcon className="size-8 text-gray-600" />
    </button>
  );
};
