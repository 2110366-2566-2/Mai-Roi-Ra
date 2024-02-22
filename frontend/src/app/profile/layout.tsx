import "../globals.css";
import Menu from "@/components/Menu";
import MenuBar from "@/components/MenuBar";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`{inter.className} h-full text-black`}>
            <MenuBar/>
            <Menu/>
            <div className='lg:pl-[20%] md:mt-[-9px] mt-[13px]'>
                {children}
            </div>
      </body>
    </html>
  );
}
