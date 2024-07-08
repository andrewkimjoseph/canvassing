// app/fonts.ts
import { Sen } from 'next/font/google'

const sen = Sen({
  subsets: ['latin'],
  variable: '--font-sen'
})

export const fonts = {
    sen
}

