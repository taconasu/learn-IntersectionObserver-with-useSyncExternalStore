'use client'

import { TestContent } from '@/components/TestContent'
import { useCallback, useState } from 'react'

export default function Home() {
  const [enabledIntersection, setEnabledIntersection] = useState(false)
  const [onlyOnce, setOnlyOnce] = useState(false)

  const handleOnIntersecting = useCallback((state: boolean) => {
    console.log('🚀 Enabled Intersection is', state)
  }, [])

  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-4 items-center justify-center h-svh p-24 mb-11">
        <h1>Hello World!</h1>
        <p>
          enabled intersection is{' '}
          {enabledIntersection ? 'true（onIntersectingを実行します）' : 'false（onIntersectingを実行しません）'}
        </p>
        <button
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => setEnabledIntersection(!enabledIntersection)}
        >
          click!
        </button>
        <p>onlyOnce is {onlyOnce ? 'true（交差時の処理を一度だけ実行します）' : 'false（交差のたびに処理を実行します）'}</p>
        <button
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => setOnlyOnce(!onlyOnce)}
        >
          toggle only once!
        </button>
      </div>
      {/* useSyncExternalStoreを試したいコンテンツ */}
      <TestContent
        flag={enabledIntersection}
        onlyOnce={onlyOnce}
        onIntersecting={enabledIntersection ? handleOnIntersecting : undefined}
      />
    </main>
  )
}
