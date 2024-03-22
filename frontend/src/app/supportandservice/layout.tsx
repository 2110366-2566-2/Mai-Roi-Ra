import { Inter } from "next/font/google";
import "../globals.css";
import MenuBar from "@/components/MenuBar";
import Menu from "@/components/Menu";
import AdminSupportAndService from "@/components/AdminSupportAndService";
import UserSupportAndService from "@/components/UserSupportAndService";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("successfully");
  
  console.log(session);
  return (
    <html lang="en">
      <body className={`{inter.className} h-screen text-black`}>
        <MenuBar />
        <Menu />
        <div className="lg:pl-[20%] md:mt-0 mt-[20px]">
          {session?.user.role == "ADMIN" ? (
          <AdminSupportAndService></AdminSupportAndService>
        ) : (
          <UserSupportAndService></UserSupportAndService>
        )}
         {children}
        </div>
      </body>
    </html>
  );
}
