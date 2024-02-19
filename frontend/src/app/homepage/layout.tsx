import { Inter } from 'next/font/google'
import '../globals.css'
import MenuIcon from '@mui/icons-material/Menu';
import MenuBar from '@/components/MenuBar'
import MenuPopup from '@/components/MenuPopup'
import Menu from '@/components/Menu';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`{inter.className} h-screen text-black`}>
            <MenuBar/>
            <Menu/>
            <div className='lg:pl-[20%] md:mt-0 mt-[20px]'>
                {children}
            </div>
      </body>
    </html>
  )
}
