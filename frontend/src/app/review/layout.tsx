import "../globals.css";
import Menu from "@/components/Menu";
import MenuBar from "@/components/MenuBar";


export default async function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`{inter.className} h-full text-black`}>
            <MenuBar/>
            <Menu/>
            <div className='lg:pl-[20%] md:mt-0 mt-[20px] lg:mr-24 border-r-[1px]'>
                {children}
            </div>
      </body>
    </html>
  );
}