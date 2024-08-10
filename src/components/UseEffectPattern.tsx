import { useEffect, useRef } from 'react'

type Props = {
  flag: boolean
  onlyOnce?: boolean
  onIntersecting?: (state: boolean) => void
}
export const UseEffectPattern = ({ flag, onlyOnce, onIntersecting }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const intersectedRef = useRef(false)

  useEffect(() => {
    console.log('handle Subscribe (useEffect)')
    if (!targetRef.current || (intersectedRef.current && onlyOnce)) return

    const target = targetRef.current

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectedRef.current = true
          if (onIntersecting) onIntersecting(flag)
        }
      })
    }
    const observer = new IntersectionObserver(callback)
    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
    // NOTE: 依存配列を空にすることで交差時の無限ループは防げるが、そうすると初回描画時のstateの状態でしか評価できなくなる
  }, [flag, onIntersecting, onlyOnce])

  useEffect(() => {
    // 途中からonlyOnceフラグをfalse（監視し続ける状態）に変更した場合、制御用のフラグをfalseにする
    if (!onlyOnce) intersectedRef.current = false
  }, [onlyOnce])

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
