const VALID_VARIANTS = ['up', 'left', 'right', 'zoom']

export const vReveal = {
  mounted(el, binding) {
    const opts = typeof binding.value === 'object' && binding.value !== null ? binding.value : {}
    const variant = VALID_VARIANTS.includes(opts.variant) ? opts.variant : 'up'
    const delay = typeof opts.delay === 'number' ? opts.delay : typeof binding.value === 'number' ? binding.value : 0

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      return
    }

    el.classList.add('reveal-init', `reveal-${variant}`)
    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )

    el._revealObserver = observer
    observer.observe(el)
  },

  unmounted(el) {
    if (el._revealObserver) {
      el._revealObserver.disconnect()
      delete el._revealObserver
    }
  }
}
