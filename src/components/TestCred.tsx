import type { RefObject } from "react";

interface TestCredProps {
  emailRef: RefObject<HTMLInputElement | null>;
  passwordRef: RefObject<HTMLInputElement | null>;
}

export function TestCred({ emailRef, passwordRef }: TestCredProps) {
  return (
    <button
      className="relative mx-auto w-32 h-8 flex items-center justify-center overflow-hidden text-sm text-white/60 rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-white/10 group"
      onClick={() => {
        if (emailRef.current) emailRef.current.value = "mani@gmail.com";
        if (passwordRef.current) passwordRef.current.value = "mani123";
      }}
    >
      <span className="absolute inset-0 flex w-[200%] items-center justify-center transition-transform duration-300 ease-in-out group-hover:-translate-x-1/2">
        <span className="w-32 text-center">⋮</span>
        <span className="w-32 text-center">Use Test Cred</span>
      </span>
    </button>
  );
}