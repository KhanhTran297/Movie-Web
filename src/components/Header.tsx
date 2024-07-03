"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-center items-center gap-5 mt-5 mb-5">
      <Link
        href={"/"}
        className=" cursor-pointer hover:text-red-500"
        style={pathname === "/" ? { color: "red" } : { color: "white" }}
      >
        Home
      </Link>
      <Link
        href={"/movies"}
        className=" text-white cursor-pointer hover:text-red-500"
        style={pathname === "/movies" ? { color: "red" } : { color: "white" }}
      >
        Movies
      </Link>
    </div>
  );
};

export default Header;
