'use client'

import Image from 'next/image'
import useWallet from '@/hooks/useWallet'
import NetworkBadge from '@/components/NetworkBadge'
import CopyButton from '@/components/CopyButton'
import BalanceCard from '@/components/BalanceCard'
import WalletButton from '@/components/WalletButton'

export default function Home() {
  const {
    account,
    ensName,
    chainId,
    ethBalance,
    usdtBalance,
    isConnecting,
    isLoadingBalances,
    isMetaMaskInstalled, // New variable
    connect,
    disconnect,
    formatAddress,
  } = useWallet()

  // Function to handle Install Click
  const handleInstall = () => {
    window.open('https://metamask.io/download/', '_blank')
  }

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      {/* ===== TOP BORDER LINE ===== */}
      <div className="w-full h-px bg-brand-green/40" />

      {/* ===== NAVBAR ===== */}
      <nav className="w-full border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="NexChain"
              width={22}
              height={22}
              className="w-[22px] h-[22px]"
              priority
            />
            <span className="font-mono text-[13px] tracking-[0.2em] uppercase text-brand-white font-medium">
              NexChain
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {account && chainId && <NetworkBadge chainId={chainId} />}
            {account && (
              <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-brand-gray">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse-dot" />
                {ensName || formatAddress(account)}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ===== MAIN ===== */}
      <main className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex-1 flex flex-col">

          {/* HERO SECTION */}
          <div className="pt-20 md:pt-32 pb-16 md:pb-24 animate-fade-in">
            <div className="max-w-3xl">
              {/* Tag */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-brand-green" />
                <span className="font-mono text-[11px] text-brand-green tracking-[0.3em] uppercase">
                  Web3 Dashboard
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-display text-brand-white font-bold mb-6 animate-slide-up stagger-1">
                Your wallet<span className="text-brand-green">.</span>
                <br />
                <span className="text-brand-gray">Your data</span>
                <span className="text-brand-green">.</span>
              </h1>

              {/* Subtext */}
              <p className="text-brand-gray text-base md:text-lg leading-relaxed max-w-lg animate-slide-up stagger-2">
                Connect your MetaMask wallet to view ETH and USDT balances
                on Ethereum Mainnet.
                <span className="text-brand-gray/50"> No tracking. No intermediaries.</span>
              </p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="w-full h-px bg-brand-border" />

          {/* DASHBOARD SECTION */}
          <div className="py-12 md:py-16 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

              {/* LEFT COLUMN — Info */}
              <div className="lg:col-span-4 animate-slide-up stagger-2">
                <p className="font-mono text-[11px] text-brand-gray tracking-[0.2em] uppercase mb-4">
                  {account ? 'Session Active' : 'Getting Started'}
                </p>
                <p className="text-brand-gray/70 text-sm leading-relaxed">
                  {account
                    ? 'Your wallet is connected and balances are synced with the Ethereum network in real-time.'
                    : 'Connect your MetaMask browser extension to read your on-chain balances. We never request transaction permissions.'
                  }
                </p>

                {/* Status indicator */}
                <div className="mt-8 pt-6 border-t border-brand-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-brand-gray tracking-wider uppercase">Status</span>
                    <span className={`font-mono text-[11px] tracking-wider uppercase ${account ? 'text-brand-green' : 'text-brand-pink'}`}>
                      {account ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-brand-gray tracking-wider uppercase">Network</span>
                    <span className="font-mono text-[11px] text-brand-gray tracking-wider uppercase">
                      {chainId === 1 ? 'ETH Mainnet' : chainId ? `Chain ${chainId}` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-brand-gray tracking-wider uppercase">Protocol</span>
                    <span className="font-mono text-[11px] text-brand-gray tracking-wider uppercase">ERC-20</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN — Wallet Card */}
              <div className="lg:col-span-8 animate-slide-up stagger-3">

                {!account ? (
                  /* ===== DISCONNECTED ===== */
                  <div className="border border-brand-border">
                    {/* Card header */}
                    <div className="px-6 py-4 border-b border-brand-border flex items-center justify-between">
                      <span className="font-mono text-[11px] text-brand-gray tracking-[0.15em] uppercase">
                        Wallet Interface
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                        <span className="font-mono text-[11px] text-brand-pink tracking-wider uppercase">
                          Offline
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="px-6 py-16 flex flex-col items-center text-center">
                      <div className="w-12 h-12 border border-brand-border flex items-center justify-center mb-6">
                        <span className="text-2xl">🦊</span>
                      </div>
                      
                      {!isMetaMaskInstalled ? (
                        <>
                          <p className="font-mono text-[12px] text-brand-pink tracking-wider uppercase mb-2">
                            MetaMask Not Detected
                          </p>
                          <p className="text-brand-gray/40 text-[12px] font-mono mb-10 max-w-xs">
                            You need to install the browser extension to use this app.
                          </p>
                          <div className="w-full max-w-xs">
                            <button
                              onClick={handleInstall}
                              className="w-full py-3.5 px-6 font-mono text-[12px] tracking-[0.15em] uppercase
                              bg-amber-500 text-brand-black font-semibold
                              hover:bg-amber-400 transition-all duration-200"
                            >
                              Install MetaMask ↗
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="font-mono text-[12px] text-brand-gray tracking-wider uppercase mb-2">
                            No wallet connected
                          </p>
                          <p className="text-brand-gray/40 text-[12px] font-mono mb-10 max-w-xs">
                            Requires MetaMask browser extension
                          </p>
                          <div className="w-full max-w-xs">
                            <WalletButton onClick={connect} loading={isConnecting}>
                              Connect Wallet
                            </WalletButton>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  /* ===== CONNECTED ===== */
                  <div className="border border-brand-border">
                    {/* Card header */}
                    <div className="px-6 py-4 border-b border-brand-border flex items-center justify-between">
                      <span className="font-mono text-[11px] text-brand-gray tracking-[0.15em] uppercase">
                        Wallet Interface
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse-dot" />
                        <span className="font-mono text-[11px] text-brand-green tracking-wider uppercase">
                          Online
                        </span>
                      </div>
                    </div>

                    {/* Address section */}
                    <div className="px-6 py-5 border-b border-brand-border animate-slide-in">
                      <p className="font-mono text-[10px] text-brand-gray/50 tracking-[0.2em] uppercase mb-2">
                        Address
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          {ensName && (
                            <p className="text-brand-white text-sm font-medium mb-0.5">{ensName}</p>
                          )}
                          <p className="font-mono text-sm text-brand-white tracking-wide">
                            {formatAddress(account)}
                          </p>
                        </div>
                        <CopyButton text={account} />
                      </div>
                    </div>

                    {/* Balances section */}
                    <div className="px-6">
                      <div className="py-4">
                        <p className="font-mono text-[10px] text-brand-gray/50 tracking-[0.2em] uppercase">
                          Balances
                        </p>
                      </div>

                      <BalanceCard
                        symbol="ETH"
                        name="Ethereum"
                        balance={ethBalance || '0'}
                        loading={isLoadingBalances}
                        delay={1}
                      />
                      <BalanceCard
                        symbol="USDT"
                        name="Tether USD"
                        balance={usdtBalance || '0'}
                        loading={isLoadingBalances}
                        delay={2}
                      />
                    </div>

                    {/* Network warning */}
                    {chainId && chainId !== 1 && (
                      <div className="mx-6 mb-4 border border-brand-pink/20 bg-brand-pink/[0.03] px-4 py-3 animate-slide-in">
                        <p className="font-mono text-[11px] text-brand-pink tracking-wider">
                          ⚠ SWITCH TO ETHEREUM MAINNET FOR USDT DATA
                        </p>
                      </div>
                    )}

                    {/* Disconnect */}
                    <div className="px-6 py-5 border-t border-brand-border">
                      <WalletButton onClick={disconnect} connected>
                        Disconnect Wallet
                      </WalletButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="NexChain"
              width={14}
              height={14}
              className="w-3.5 h-3.5 opacity-30"
            />
            <span className="font-mono text-[10px] text-brand-gray/30 tracking-[0.15em] uppercase">
              © 2026 NexChain
            </span>
          </div>
          <span className="font-mono text-[10px] text-brand-gray/20 tracking-[0.15em] uppercase">
            Next.js + Ethers.js
          </span>
        </div>
      </footer>
    </div>
  )
}