import { Toaster } from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';

export function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)',
          color: theme === 'light' ? '#000000' : '#ffffff',
          border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          boxShadow: theme === 'light' 
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            : '0 10px 25px -5px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
          fontSize: '14px',
          fontWeight: '500',
          padding: '12px 16px',
        },
        success: {
          iconTheme: {
            primary: theme === 'light' ? '#000000' : '#ffffff',
            secondary: theme === 'light' ? '#ffffff' : '#000000',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: theme === 'light' ? '#ffffff' : '#000000',
          },
        },
        loading: {
          iconTheme: {
            primary: theme === 'light' ? '#000000' : '#ffffff',
            secondary: theme === 'light' ? '#ffffff' : '#000000',
          },
        },
      }}
    />
  );
}
