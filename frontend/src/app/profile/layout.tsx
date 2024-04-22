import "../globals.css";
import Menu from "@/components/Menu";
import MenuBar from "@/components/MenuBar";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth/next";
import getProfile from "@/libs/getProfile";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  let profile = null;
  
  if (session) {
    profile = await getProfile(session.user.user_id,session.user.token);
  } 

  return (
    <html lang="en">
      <body className={`{inter.className} h-full text-black`}>
            <MenuBar/>
            <Menu user_name={profile? profile.username: "Guest"}  
              email={profile? profile.email : null}
              phone_number={profile? profile.phone_number : null}
              user_image={profile? profile.user_image : ""}
            />
            <div className='lg:pl-[20%] md:mt-[-9px] mt-[13px]'>
                {children}
            </div>
      </body>
    </html>
  );
}
