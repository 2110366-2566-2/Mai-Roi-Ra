import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
// import ReduxProvider from '@/redux/ReduxProvider'
import MenuBar from '@/components/MenuBar'

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

  return (
    <html lang="en">
      <body className={`{inter.className} h-full text-black`}>
            <MenuBar onDevice="PC"/>
            <div className="lg:w-[0px] lg:h-[0px] w-[50px] h-[50px]">
              <MenuBar onDevice="Tablet"/>
            </div>
            <div className='lg:pl-[20%]'>
                {children}
            </div>
      </body>
    </html>
  )
}
