'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Copy failed')
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="font-mono text-[11px] tracking-wider px-2.5 py-1 border border-brand-border
        text-brand-gray hover:text-brand-green hover:border-brand-green/30
        transition-all duration-150 uppercase"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}