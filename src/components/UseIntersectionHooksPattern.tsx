'use client'

import { useIntersection } from '@/hooks/useIntersection'
import { useRef } from 'react'

type Props = {
  flag: boolean
  onlyOnce?: boolean
  onIntersecting?: (state: boolean) => void
}
export const UseIntersectionHooksPattern = ({ flag, onlyOnce = false, onIntersecting }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null)

  useIntersection<HTMLDivElement>(
    targetRef.current,
    () => {
      if (onIntersecting) onIntersecting(flag)
    },
    onlyOnce,
  )

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
