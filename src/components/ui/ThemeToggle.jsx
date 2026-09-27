import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/redux/slices/themeSlice';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-pressed={mode === 'dark'}
      aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="p-2 rounded hover:bg-alt-surface focus-visible:outline-accent-text"
    >
      {mode === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
