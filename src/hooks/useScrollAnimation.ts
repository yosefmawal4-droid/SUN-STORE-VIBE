import { useEffect, useRef, RefObject } from 'react'

/**
 * Wires IntersectionObserver to every `.animate-on-scroll` element
 * in the document. Call once at the App level after mount.
 */
export function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.animate-on-scroll')

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/**
 * Returns a ref that, when attached to a DOM element, fires `callback`
 * once the element enters the viewport.
 *
 * Generic T defaults to HTMLDivElement so callers don't need a cast.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
  _options?: IntersectionObserverInit,
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      callback()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          callback()
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [callback])

  return ref
}
