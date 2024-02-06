import './globals.css'
import GlobalState from '@/context/index'
import NextAuthProvider from '@/auth-provider/index'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Netflix Clone</title>
        <link rel="icon" href="favicon.ico" />
      </head>
      <body>
        <NextAuthProvider>
          <GlobalState>{children}</GlobalState>
        </NextAuthProvider>
      </body>
    </html>   
  )
}
