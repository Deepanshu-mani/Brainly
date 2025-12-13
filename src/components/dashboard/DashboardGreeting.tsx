import { useTheme } from "@/contexts/ThemeContext";

interface DashboardGreetingProps {
  username: string | undefined;
  memoryCount: number;
}

export function DashboardGreeting({
  username,
  memoryCount,
}: DashboardGreetingProps) {
  const { theme } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-baseline justify-between gap-4">
        <h1
          className={`text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight capitalize ${theme === "light"
              ? "bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent "
            }`}
        >
          {getGreeting()} {username || "there"}
        </h1>
        <p
          className={`text-sm sm:text-base font-medium whitespace-nowrap ${theme === "light" ? "text-black/60" : "text-white/60"
            }`}
        >
          {memoryCount} memories saved
        </p>
      </div>
    </div>
  );
}
