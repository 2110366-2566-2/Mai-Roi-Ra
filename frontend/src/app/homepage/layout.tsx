import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import NextAuthProvider from '@/provider/NextAuthProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
// import ReduxProvider from '@/redux/ReduxProvider'
import MenuBar from '@/components/mairoira/MenuBar'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`{inter.className} h-full text-black`}>
        {/* <ReduxProvider> */}
          <NextAuthProvider session={session}>
            <MenuBar />
            <div className='lg:pl-[20%]'>
                {children}
            </div>
          </NextAuthProvider>
        {/* </ReduxProvider> */}
      </body>
    </html>
  )
}
