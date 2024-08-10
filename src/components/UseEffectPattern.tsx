import { useEffect, useRef } from 'react'

type Props = {
  flag: boolean
  onlyOnce?: boolean
  onIntersecting?: (state: boolean) => void
}
export const UseEffectPattern = ({ flag, onlyOnce, onIntersecting }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const isIntersectingRef = useRef(false)

  useEffect(() => {
    console.log('handle Subscribe (useEffect)')
    if (!targetRef.current) return

    const target = targetRef.current

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isIntersectingRef.current = true
          if (onIntersecting) onIntersecting(flag)
          if (onlyOnce) observer.unobserve(target)
        }
      })
    }
    const observer = new IntersectionObserver(callback)
    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [flag, onIntersecting, onlyOnce])

  return (
    <div ref={targetRef} className="bg-rose-300 p-4">
      この要素がviewportに入ると、onIntersectingが実行されます（useEffect pattern）
      <br />
      onlyOnceがtrueの場合、一度だけ実行されます
      <br />
      onIntersectingがundefinedの場合、交差してもハンドラは実行されません（この場合でも、交差フラグは評価します）
    </div>
  )
}
