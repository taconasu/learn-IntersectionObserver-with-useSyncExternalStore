'use client'

import { TestContent } from '@/components/TestContent'
import { useCallback, useState } from 'react'

export default function Home() {
  const [flag, setFlag] = useState(false)

  const handleOnIntersecting = useCallback((state: boolean) => {
    console.log('🚀 Flag is', state)
  }, [])

  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-4 items-center justify-center h-svh p-24 mb-11">
        <h1>Hello World!</h1>
        <p>flag is {flag ? 'true' : 'false'}</p>
        <button onClick={() => setFlag(!flag)}>click!</button>
      </div>
      {/* useSyncExternalStoreを試したいコンテンツ */}
      <TestContent flag={flag} onIntersecting={handleOnIntersecting} />
    </main>
  )
}
