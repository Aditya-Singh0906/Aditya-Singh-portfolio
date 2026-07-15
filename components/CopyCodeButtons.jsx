'use client'
import { useEffect } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CopyCodeButtons() {
  useEffect(() => {
    const blocks = document.querySelectorAll('pre')
    blocks.forEach(pre => {
      if (pre.dataset.copyAdded) return
      pre.dataset.copyAdded = '1'
      pre.style.position = 'relative'
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.setAttribute('aria-label', 'Copy code')
      btn.className = 'absolute top-2 right-2 rounded-md border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white text-[10px] mono uppercase tracking-widest px-2 py-1 transition'
      btn.innerText = 'Copy'
      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code')
        const text = code ? code.innerText : pre.innerText
        try {
          await navigator.clipboard.writeText(text)
          btn.innerText = 'Copied'
          setTimeout(() => { btn.innerText = 'Copy' }, 1500)
        } catch { /* noop */ }
      })
      pre.appendChild(btn)
    })
  }, [])
  return null
}
