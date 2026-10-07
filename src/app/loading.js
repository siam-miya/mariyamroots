"use client";

import Image from "next/image";
import React from "react";
import mainLogo from "../assets/images/mainLogo.png"

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* Logo / Brand Mark */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-primary/10" />

          <div className="absolute inset-1 rounded-full border-[2px] border-transparent border-t-secondary border-r-secondary animate-spin" />

          <div className="flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_35px_rgba(7,69,6,0.18)]">
            <span className="text-xl font-extrabold tracking-tight text-white">
               <Image src={mainLogo} height={100} width={120} alt="logo"/>
            </span>
          </div>
        </div>

        {/* Brand */}
        <h2 className="mt-6 text-lg font-extrabold tracking-[0.12em] text-primary">
          Mariyam Roots
        </h2>

        {/* Loading text */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-xs font-medium tracking-[0.25em] text-gray-400">
            LOADING
          </span>

          <span className="flex gap-1">
            <span className="h-1 w-1 animate-bounce rounded-full bg-secondary [animation-delay:0ms]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-secondary [animation-delay:150ms]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-secondary [animation-delay:300ms]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;