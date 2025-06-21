"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FaceitButtonProps {
  variant: "long" | "short";
}

const handleLogin = () => {
  window.location.href = "/api/auth/faceit/login";
};

const FaceitButton = ({ variant = "long" }: FaceitButtonProps) => {
  return (
    <Button
      onClick={handleLogin}
      type={"button"}
      className={`bg-[#FF5500] hover:bg-[#FF6900] ${variant === "long" ? "p-2 lg:p-4" : ""}`}
    >
      <Image
        src="/images/faceit_white.webp"
        alt="Faceit logo"
        width={25}
        height={25}
      />
      {variant === "long" && (
        <span className="hidden md:inline-block ml-4 text-[#EBEFF3] font-bold">
          Login With Faceit
        </span>
      )}
    </Button>
  );
};

export default FaceitButton;
