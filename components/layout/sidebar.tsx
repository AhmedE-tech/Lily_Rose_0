'use client'

import { ChatHistory } from '@/components/chat/chat-history'

export function Sidebar() {
  return (
    <aside className="w-80 border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:block">
      <div className="p-4 h-full overflow-y-auto">
        <ChatHistory />
      </div>
    </aside>
  )
}