import type { ReactNode } from "react";
import { ThemeToggle } from "../../ui/ThemeToggle";
import { useTheme } from "../../contexts/ThemeContext";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-300 ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#000000",
      }}
    >
      {/* Theme-based Background Pattern */}
      {theme === "light" ? (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      ) : (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#000000",
            backgroundImage: `
              radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "30px 30px",
            backgroundPosition: "0 0",
          }}
        />
      )}

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <main className="relative z-10">{children}</main>
    </div>
  );
}
