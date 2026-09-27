import { createSlice } from '@reduxjs/toolkit'
import { getStorage, setStorage } from '@/utils/storage'

const getInitialTheme = () => {
  const stored = getStorage('theme')
  if (stored === 'dark' || stored === 'light') return stored
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      setStorage('theme', state.mode)
      if (state.mode === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.style.colorScheme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.style.colorScheme = 'light'
      }
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
