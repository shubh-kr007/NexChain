export default function BalanceCard({ symbol, name, balance, loading, delay = 0 }) {
  return (
    <div
      className={`
        border-t border-brand-border py-5 animate-slide-up
        ${delay === 1 ? 'stagger-3' : delay === 2 ? 'stagger-4' : 'stagger-2'}
      `}
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 border border-brand-border flex items-center justify-center">
            <span className="font-mono text-xs text-brand-gray">{symbol}</span>
          </div>
          <div>
            <p className="text-brand-white text-sm font-medium">{name}</p>
            <p className="font-mono text-[11px] text-brand-gray tracking-wider mt-0.5">
              {symbol}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="text-right">
          {loading ? (
            <div className="flex flex-col items-end gap-1.5">
              <div className="h-5 w-28 bg-white/[0.03] border border-brand-border animate-pulse" />
              <div className="h-3 w-16 bg-white/[0.02] border border-brand-border animate-pulse" />
            </div>
          ) : (
            <>
              <p className="text-brand-white font-mono text-lg font-medium tracking-tight">
                {balance === 'N/A' ? '—' : parseFloat(balance).toFixed(4)}
              </p>
              <p className="font-mono text-[11px] text-brand-gray tracking-wider mt-0.5">
                {balance === 'N/A' ? 'MAINNET ONLY' : symbol}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}