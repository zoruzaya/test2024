"use client";

import { useState } from "react";

import { Eye } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import type { InputProps } from "./ui/input";

export const PasswordInput = (props: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="relative ">
      <Input {...props} type={isPasswordVisible ? "text" : "password"} />
      <Button
        onClick={(e) => {
          e.preventDefault();
          setIsPasswordVisible((prev) => !prev);
        }}
        variant="link"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded"
        size="icon"
      >
        <Eye className="h-4 w-4" color={isPasswordVisible ? "gray" : "blue"} />
      </Button>
    </div>
  );
};
