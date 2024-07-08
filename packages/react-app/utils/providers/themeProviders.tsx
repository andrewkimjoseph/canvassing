// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
// import canvassingTheme from '../theme/theme'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider
  // theme={canvassingTheme} 

  >{children}</ChakraProvider>
}