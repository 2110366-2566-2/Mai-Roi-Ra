import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FAQlist from "@/components/FAQlist";

export default async function SupportAndServicePage() {
  const session = await getServerSession(authOptions);

  console.log("successfully");
  console.log(session);

  return (
    <main className="bg-white text-black h-full">
      <FAQlist/>
    </main>
  );
}
