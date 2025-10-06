import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'
import { ChatProvider } from '@/contexts/chat-context'
import { VoiceProvider } from '@/contexts/voice-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lily Rose AI - Your Personal Assistant',
  description: 'A sophisticated AI assistant with voice capabilities',
  manifest: '/manifest.json',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <ChatProvider>
            <VoiceProvider>
              {children}
            </VoiceProvider>
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  )
}