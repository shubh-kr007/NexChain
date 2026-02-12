import Spinner from './Spinner'

export default function WalletButton({ onClick, loading, connected, children }) {
  if (connected) {
    return (
      <button
        onClick={onClick}
        className="w-full py-3.5 px-6 font-mono text-[12px] tracking-[0.15em] uppercase
          border border-brand-border text-brand-gray
          hover:text-brand-pink hover:border-brand-pink/40 hover:bg-brand-pink/[0.03]
          transition-all duration-200"
      >
        {children}
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full py-3.5 px-6 font-mono text-[12px] tracking-[0.15em] uppercase
        bg-brand-green text-brand-black font-semibold
        hover:bg-brand-green/90
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all duration-200
        flex items-center justify-center gap-3"
    >
      {loading ? (
        <>
          <Spinner size="sm" />
          <span>Connecting</span>
          <span className="animate-blink">_</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}