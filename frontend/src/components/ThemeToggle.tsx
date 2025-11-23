import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle hologram-button"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="theme-icon" size={20} />
      ) : (
        <Moon className="theme-icon" size={20} />
      )}
    </button>
  );
}
