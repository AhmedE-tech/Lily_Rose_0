'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, History, Mic, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/helpers'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    { icon: MessageCircle, label: 'Chat', href: '/chat' },
    { icon: Mic, label: 'Voice', href: '/chat/voice' },
    { icon: History, label: 'History', href: '/history' },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-3/4 bg-background border-r border-border">
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LR</span>
                </div>
                <span className="font-semibold">Lily Rose</span>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    router.push(item.href)
                    setIsOpen(false)
                  }}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}