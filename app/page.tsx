'use client'

import { useAuth } from '@/contexts/auth-context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mic, MessageCircle, Sparkles } from 'lucide-react'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !loading) {
      router.push('/chat')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-900/10 to-pink-900/10">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="h-20 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full border-4 border-background"></div>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Lily Rose
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent AI companion with voice capabilities. 
            Experience natural conversations powered by advanced AI.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <Card className="bg-secondary/50 border-border">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle>Smart Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Engage in meaningful conversations with an AI that understands context and emotions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border-border">
            <CardHeader>
              <div className="h-12 w-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-pink-400" />
              </div>
              <CardTitle>Voice Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Talk naturally with voice recognition and lifelike text-to-speech responses.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border-border">
            <CardHeader>
              <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle>Always Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Remembers your preferences and adapts to your communication style over time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Auth Buttons */}
        <div className="text-center space-y-4">
          <div className="space-x-4">
            <Button 
              size="lg" 
              onClick={() => router.push('/login')}
              className="px-8"
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => router.push('/register')}
              className="px-8"
            >
              Create Account
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Start your journey with Lily Rose today
          </p>
        </div>
      </div>
    </div>
  )
}