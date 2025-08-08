"use client"

import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { LogOut } from "lucide-react"
import { useAuth } from "@/lib/utils"
import Navbar from "./Navbar"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const { user, signOut, isAuthenticated } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      })
      navigate("/")
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) {
    return null // Don't render layout if not authenticated
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Use the proper Navbar component with avatar dropdown */}
      <Navbar />

      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default MainLayout
