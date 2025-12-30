import { useCallback, useEffect, useState } from 'react'

export const useTimedSuccess = (durationMs: number = 5000) => {
  const [visible, setVisible] = useState(false)

  const trigger = useCallback(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return

    const id = window.setTimeout(() => {
      setVisible(false)
    }, durationMs)

    return () => window.clearTimeout(id)
  }, [visible, durationMs])

  return { visible, trigger, hide: () => setVisible(false) }
}
