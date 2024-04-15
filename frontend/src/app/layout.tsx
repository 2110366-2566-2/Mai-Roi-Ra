import type { Metadata } from 'next'
import './globals.css'
import NextAuthProvider from '@/provider/NextAuthProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
// import ReduxProvider from '@/redux/ReduxProvider'

export const metadata: Metadata = {
  title: 'Mai-Roi-Ra',
  description: 'Powered by Pubpab',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`{inter.className} dark:bg-slate-100`}>
        {/* <ReduxProvider> */}
          <NextAuthProvider session={session}>
            {children}
          </NextAuthProvider>
        {/* </ReduxProvider> */}
      </body>
    </html>
  )
}
