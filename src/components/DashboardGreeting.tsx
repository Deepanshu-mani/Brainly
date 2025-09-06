import { useTheme } from '../contexts/ThemeContext';

interface DashboardGreetingProps {
  username: string | undefined;
  memoryCount: number;
}

export function DashboardGreeting({ username, memoryCount }: DashboardGreetingProps) {
  const { theme } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="mb-8">
      <h1 className={`text-6xl font-bold mb-4 pb-2 tracking-tight capitalize ${
        theme === 'light'
          ? 'bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent'
          : 'bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent '
      }`}>
        {getGreeting()} {username || 'there'}
      </h1>
      <p className={`text-xl font-medium ${
        theme === 'light' ? 'text-black/60' : 'text-white/60'
      }`}>
        {memoryCount} memories saved
      </p>
    </div>
  );
}
