// src/contexts/ConfigContext.tsx
import { createContext, useContext, type ReactNode } from 'react'

interface ConfigContextType {
  BACKEND_URI: string
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

interface ConfigProviderProps {
  children: ReactNode
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

  return (
    <ConfigContext.Provider value={{ BACKEND_URI }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}
