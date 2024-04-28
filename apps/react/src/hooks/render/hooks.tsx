import { useCallback, useEffect, useRef, useState } from 'react'

// Based off a tweet and codesandbox:
// https://mobile.twitter.com/hieuhlc/status/1164369876825169920

function useKeyPress(
  targetKey: string,
  onKeyDown: () => void,
  onKeyUp: () => void
): void {
  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) onKeyDown()
    },
    [onKeyDown, targetKey]
  )

  const upHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) onKeyUp()
    },
    [onKeyUp, targetKey]
  )

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [downHandler, upHandler])
}

const useAnimationFrame = (
  enabled: boolean,
  callback: (time: number, delta: number) => void,
  deps: React.DependencyList
): void => {
  const frame = useRef<number>()
  const last = useRef(performance.now())
  const init = useRef(performance.now())

  const animate = () => {
    const now = performance.now()
    const time = (now - init.current) / 1000
    const delta = (now - last.current) / 1000
    callback(time, delta)
    last.current = now
    frame.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (!enabled) return
    frame.current = requestAnimationFrame(animate)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, deps)
}

export { useAnimationFrame, useKeyPress }
