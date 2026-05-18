/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useCallback, useSyncExternalStore } from 'react'

export type UserRole = 'member' | 'admin'

export const USER_ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'member', label: 'Member' },
  { value: 'admin', label: 'Admin' },
]

const STORAGE_KEY = 'userRole'
const EVENT_NAME = 'userRoleChanged'

const read = (): UserRole => {
  if (typeof window === 'undefined') return 'member'
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'admin' ? 'admin' : 'member'
}

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener(EVENT_NAME, onStoreChange)
  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener(EVENT_NAME, onStoreChange)
  }
}

export const useUserRole = () => {
  const role = useSyncExternalStore(subscribe, read, () => 'member' as UserRole)

  const setRole = useCallback((next: UserRole) => {
    localStorage.setItem(STORAGE_KEY, next)
    window.dispatchEvent(new Event(EVENT_NAME))
  }, [])

  return { role, setRole }
}
