import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'NexChain — Web3 Wallet Dashboard',
  description: 'Connect. View. Own your data.',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0c1416',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              borderRadius: '0px',
              padding: '14px 18px',
              maxWidth: '380px',
            },
            success: {
              iconTheme: {
                primary: '#48d597',
                secondary: '#080f11',
              },
            },
            error: {
              iconTheme: {
                primary: '#fb6e88',
                secondary: '#080f11',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}