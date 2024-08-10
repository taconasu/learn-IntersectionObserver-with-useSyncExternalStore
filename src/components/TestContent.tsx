'use client'

import { useCallback, useRef, useSyncExternalStore } from 'react'

type Props = {
  flag: boolean
  onIntersecting: (state: boolean) => void
}
export const TestContent = ({ flag, onIntersecting }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const isIntersectingRef = useRef(false)

  const subscribe = useCallback((callback: () => void) => {
    console.log('handle Subscribe')
    if (!targetRef.current) return () => {}

    const target = targetRef.current

    const handleIntersecting = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isIntersectingRef.current = true
          callback()
        }
      })
    }
    const observer = new IntersectionObserver(handleIntersecting)
    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [])

  const getSnapshot = () => {
    if (!isIntersectingRef.current) return
    console.log('Run getSnapshot')

    onIntersecting(flag)
    isIntersectingRef.current = false
  }

  useSyncExternalStore(subscribe, getSnapshot, getSnapshot) // 第三引数はServerSide向け( https://ja.react.dev/reference/react/useSyncExternalStore#parameters )

  return <div ref={targetRef}>test</div>
}
