import MenuReport from '@/components/MenuReport';
import MenuBar from '@/components/MenuBar'


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`{inter.className} h-screen text-black`}>
            <MenuBar/>
            
            <div className='lg:pl-[20%] md:mt-0 mt-[20px]'>
                {children}
            </div>
      </body>
    </html>
  )
}
