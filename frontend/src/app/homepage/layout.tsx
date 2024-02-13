import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
// import ReduxProvider from '@/redux/ReduxProvider'
import MenuBar from '@/components/MenuBar'

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
            <div className="lg:w-[0px] lg:h-[0px] md:w-[50px] md:h-[50px] h-[25px] w-[25px]">
              <MenuBar onDevice="Tablet"/>
            </div>
            <div className='lg:pl-[20%]'>
                {children}
            </div>
      </body>
    </html>
  )
}
