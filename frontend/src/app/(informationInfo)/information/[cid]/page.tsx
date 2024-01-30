import Image from "next/image";
import getCampground from "@/libs/getCampground";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UpdateCampGroundForm from "@/components/admin/UpdateCampGroundForm";
import DeleteCampgroundForm from "@/components/admin/DeleteCampGroundForm";
import styles from "@/styles/FontPage.module.css"
import { revalidateTag } from "next/cache";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { redirect } from "next/navigation"

export default async function CampgroundDetailPage({
  params,
}: {
  params: { cid: string };
}) {

  revalidateTag(`/campground/${params.cid}`)
  const campgroundDetail = await getCampground(params.cid);
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.token) {
    redirect('/');
  }
  const profile = session ? await getUserProfile(session.user.token) : null;
  return (
    <main className={`${styles.campgroundFont} w-screen text-white p-5 mt-[50px] dark:bg-slate-100 dark:text-black`}>
      <Suspense fallback={
                <div className="w-screen h-screen">
                    <p className={`${styles.allFont} relative text-[40px] font-bold 
            text-center mt-[130px] text-white dark:text-black`}>Loading...</p>
                    <LinearProgress />
                </div>
            }>
      <div className="pl-[10%] w-full flex flex-row justify-center mt-[60px]">
        <Image
          src={campgroundDetail.data.picture}
          alt="Campground Picture"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[40%] dark:border-slate-900"
        />
        <div className="flex-grow flex flex-col justify-start items-center mt-[3%]">
          <div className="text-[30px] lg:text-[50px] mb-5 font-extrabold">
            {campgroundDetail.data.name}
          </div>
          <div className="text-[20px] lg:text-[30px] font-light ml-[30px]">
            <span className="font-bold pr-4">Location :</span>
            <span>{campgroundDetail.data.address}
              <span>{campgroundDetail.data.province}, {campgroundDetail.data.district}</span></span>
            <div className="mt-3 text-[20px] lg:text-[30px]">
              <span className="font-bold pr-4">Postal Code : </span>
              <span>{campgroundDetail.data.postalcode}</span>
            </div>
            <div className="mt-3 text-[20px] lg:text-[30px]">
              <span className="font-bold pr-4">Tel : </span>
              <span>{campgroundDetail.data.tel}</span>
            </div>
          </div>
        </div>
      </div>

      {
        (profile?.data.role == "admin") ?
          <div className="pt-[40px] mt-[100px]">
            <div className={`${styles.Roboto} text-center text-white dark:text-black font-bold text-[3.5vw]`}>
              <h1>👑 Hello Admin 👑</h1>
              <div className="mt-[20px] text-[1vw] text-gray-100 dark:text-gray-900 opacity-80 font-light ">
                <p className="text-[25px] font-semibold mb-5">You can update and delete campground here !</p>
                <p className="text-[20px] mb-3">The constraints on updating new campground are ...</p>
                <div className="text-[20px] space-y-3">
                  <li>Campground Name length can't be more than 50 lengths</li>
                  <li>Campground Name can't be the same as the existed one</li>
                  <li>Postal code length can't be more than 5 lengths</li>
                  <li>The picture must be in google drive form</li>
                </div>
              </div>
            </div>
            <div className="my-[50px] px-[90px]">
              <UpdateCampGroundForm cid={params.cid}
                cName={campgroundDetail.data.name}
                cProvince={campgroundDetail.data.province}
                cDistrict={campgroundDetail.data.district}
                cPostalCode={campgroundDetail.data.postalcode}
                cTel={campgroundDetail.data.tel}
                cPicture={campgroundDetail.data.picture}
                token={session.user.token} cAddress={campgroundDetail.data.address} />
              <DeleteCampgroundForm cid={params.cid} token={session.user.token} />
            </div>

          </div>

          :
          null
      }
      </Suspense>
    </main>
  );
}
