import { useCallback, useRef, useSyncExternalStore } from 'react'

export const useIntersection = <E extends HTMLElement>(
  element: E | null,
  handler: () => void | undefined,
  onlyOnce: boolean = false,
) => {
  const isIntersectingRef = useRef(false)

  const subscribe = useCallback(
    (callback: () => void) => {
      console.log('handle Subscribe (useSyncExternalStore)')
      if (!element) return () => {}

      const handleIntersecting = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersectingRef.current = true
            callback()
            if (onlyOnce) observer.unobserve(element)
          }
        })
      }
      const observer = new IntersectionObserver(handleIntersecting)
      observer.observe(element)

      return () => {
        observer.unobserve(element)
      }
    },
    [element, onlyOnce],
  )

  const getSnapshot = () => {
    if (!isIntersectingRef.current) return
    console.log('Run getSnapshot（useSyncExternalStore）')

    if (handler) handler()

    isIntersectingRef.current = false
  }

  useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
