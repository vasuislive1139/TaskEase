"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { UserProfile } from "./types"

interface UserContextType {
  user: UserProfile | null
  updateUser: (user: UserProfile) => void
  vegOnly: boolean
  setVegOnly: (vegOnly: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const defaultUser: UserProfile = {
  user_id: 1,
  name: "Guest User",
  email: "guest@foodhub.com",
  phone: "+91 98765-43210",
  address: "House No. 123, Sector 15-D, Chandigarh, 160015",
  preferences: {
    vegOnly: false,
    theme: "default",
  },
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [vegOnly, setVegOnlyState] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile")
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      setVegOnlyState(parsedUser.preferences.vegOnly)
    } else {
      setUser(defaultUser)
    }
  }, [])

  const updateUser = (newUser: UserProfile) => {
    setUser(newUser)
    localStorage.setItem("userProfile", JSON.stringify(newUser))
  }

  const setVegOnly = (value: boolean) => {
    setVegOnlyState(value)
    if (user) {
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, vegOnly: value },
      }
      updateUser(updatedUser)
    }
  }

  return <UserContext.Provider value={{ user, updateUser, vegOnly, setVegOnly }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
