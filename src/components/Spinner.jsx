export default function Spinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-3.5 h-3.5 border-[1.5px]',
    md: 'w-5 h-5 border-[1.5px]',
    lg: 'w-7 h-7 border-[2px]',
  }

  return (
    <div
      className={`${sizes[size]} border-brand-green/20 border-t-brand-green rounded-full animate-spin-slow`}
    />
  )
}