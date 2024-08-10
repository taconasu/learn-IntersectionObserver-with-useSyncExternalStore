'use client'

import { useCallback, useRef, useSyncExternalStore } from 'react'

type Props = {
  flag: boolean
  onlyOnce?: boolean
  onIntersecting?: (state: boolean) => void
}
export const TestContent = ({ flag, onlyOnce = false, onIntersecting }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const isIntersectingRef = useRef(false)

  const subscribe = useCallback(
    (callback: () => void) => {
      console.log('handle Subscribe (useSyncExternalStore)')
      if (!targetRef.current) return () => {}

      const target = targetRef.current

      const handleIntersecting = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersectingRef.current = true
            callback()
            if (onlyOnce) observer.unobserve(target)
          }
        })
      }
      const observer = new IntersectionObserver(handleIntersecting)
      observer.observe(target)

      return () => {
        observer.unobserve(target)
      }
    },
    [onlyOnce],
  )

  const getSnapshot = () => {
    if (!isIntersectingRef.current) return
    console.log('Run getSnapshot（useSyncExternalStore）')

    if (onIntersecting) onIntersecting(flag)

    isIntersectingRef.current = false
  }

  useSyncExternalStore(subscribe, getSnapshot, getSnapshot) // 第三引数はServerSide向け( https://ja.react.dev/reference/react/useSyncExternalStore#parameters )

  return (
    <div ref={targetRef} className="bg-violet-300 p-4">
      この要素がviewportに入ると、onIntersectingが実行されます（useSyncExternalStore pattern）
      <br />
      onlyOnceがtrueの場合、一度だけ実行されます
      <br />
      onIntersectingがundefinedの場合、交差してもハンドラは実行されません（この場合でも、交差フラグは評価します）
    </div>
  )
}
