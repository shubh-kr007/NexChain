'use client'

const NETWORKS = {
  1: { name: 'MAINNET', safe: true },
  5: { name: 'GOERLI', safe: false },
  11155111: { name: 'SEPOLIA', safe: false },
  137: { name: 'POLYGON', safe: false },
  42161: { name: 'ARBITRUM', safe: false },
  10: { name: 'OPTIMISM', safe: false },
}

export default function NetworkBadge({ chainId }) {
  const network = NETWORKS[chainId] || { name: `CHAIN-${chainId}`, safe: false }

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider">
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          network.safe
            ? 'bg-brand-green animate-pulse-dot'
            : 'bg-brand-pink animate-pulse-dot'
        }`}
      />
      <span className={network.safe ? 'text-brand-green' : 'text-brand-pink'}>
        {network.name}
      </span>
    </div>
  )
}