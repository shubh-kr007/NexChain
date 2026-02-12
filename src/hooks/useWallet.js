'use client'

import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'

const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const USDT_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
]

const STORAGE_KEY = 'nexchain_connected'

export default function useWallet() {
  const [account, setAccount] = useState(null)
  const [ensName, setEnsName] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [ethBalance, setEthBalance] = useState(null)
  const [usdtBalance, setUsdtBalance] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLoadingBalances, setIsLoadingBalances] = useState(false)
  
  // New state to track if extension exists
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true) 

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Check for MetaMask immediately on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if ethereum object exists
      if (window.ethereum) {
        setIsMetaMaskInstalled(true)
      } else {
        setIsMetaMaskInstalled(false)
      }
    }
  }, [])

  const fetchBalances = useCallback(async (address) => {
    if (typeof window === 'undefined' || !window.ethereum) return
    setIsLoadingBalances(true)

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const network = await provider.getNetwork()
      const currentChainId = Number(network.chainId)
      setChainId(currentChainId)

      const ethBal = await provider.getBalance(address)
      setEthBalance(ethers.formatEther(ethBal))

      if (currentChainId === 1) {
        try {
          const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, provider)
          const usdtBal = await usdtContract.balanceOf(address)
          const decimals = await usdtContract.decimals()
          setUsdtBalance(ethers.formatUnits(usdtBal, decimals))
        } catch {
          setUsdtBalance('0')
        }

        try {
          const ens = await provider.lookupAddress(address)
          if (ens) setEnsName(ens)
        } catch {}
      } else {
        setUsdtBalance('N/A')
      }
    } catch (err) {
      console.error('Balance fetch error:', err)
      toast.error('Failed to fetch balances')
    } finally {
      setIsLoadingBalances(false)
    }
  }, [])

  const connect = async () => {
    setIsConnecting(true)

    if (typeof window === 'undefined' || !window.ethereum) {
      setIsMetaMaskInstalled(false)
      setIsConnecting(false)
      return
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

      if (accounts.length > 0) {
        setAccount(accounts[0])
        localStorage.setItem(STORAGE_KEY, 'true')
        toast.success(`Connected ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`)
        await fetchBalances(accounts[0])
      }
    } catch (err) {
      if (err.code === 4001) {
        toast.error('User rejected connection')
      } else {
        toast.error('Connection failed')
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setEnsName(null)
    setChainId(null)
    setEthBalance(null)
    setUsdtBalance(null)
    localStorage.removeItem(STORAGE_KEY)
    toast.success('Disconnected')
  }

  // Auto-connect logic
  useEffect(() => {
    const autoConnect = async () => {
      if (
        typeof window !== 'undefined' &&
        window.ethereum &&
        localStorage.getItem(STORAGE_KEY) === 'true'
      ) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            setAccount(accounts[0])
            await fetchBalances(accounts[0])
          } else {
            localStorage.removeItem(STORAGE_KEY)
          }
        } catch {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    }
    autoConnect()
  }, [fetchBalances])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return

    const onAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnect()
      } else {
        setAccount(accounts[0])
        setEnsName(null)
        toast.success(`Switched ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`)
        fetchBalances(accounts[0])
      }
    }

    const onChainChanged = () => {
      toast.success('Network changed')
      if (account) {
        setEnsName(null)
        fetchBalances(account)
      }
    }

    window.ethereum.on('accountsChanged', onAccountsChanged)
    window.ethereum.on('chainChanged', onChainChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', onAccountsChanged)
      window.ethereum.removeListener('chainChanged', onChainChanged)
    }
  }, [account, fetchBalances])

  return {
    account,
    ensName,
    chainId,
    ethBalance,
    usdtBalance,
    isConnecting,
    isLoadingBalances,
    isMetaMaskInstalled, // Exporting this new variable
    connect,
    disconnect,
    formatAddress,
  }
}