'use client'
export const request = async <T>(url: string, init: RequestInit = {}) => {
  const res = await fetch(url, init)
  return (await res.json()) as T
}
