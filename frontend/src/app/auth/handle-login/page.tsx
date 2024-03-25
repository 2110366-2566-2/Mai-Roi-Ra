"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import LoadingLine from "@/components/LoadingLine";

const HandleLogin = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // Check if the user is already authenticated
    // if (session) {
    //   router.replace("/homepage");
    //   return;
    // }

    const initiateLogin = async () => {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/homepage",
      });
      console.log("HELLO", result)
      if (result?.url) {
        // Successfully authenticated, redirect to the callbackUrl or home
        console.log(session?.user?.username,'skdjfhlasjdhflajsdh')
        if(session?.user?.username == ""){
          router.replace("/auth/Oauth-register");
          return ;
        }
        router.replace(result.url);
      } else {
        // Handle failed login attempt, maybe redirect to login page or show an error
        router.replace("/");
      }
    };

    initiateLogin();
  }, [router, session]);

  return (
    <div className="w-screen h-screen flex items-center justify-center text-center flex-col">
        <h1 className="mb-5">Loading...</h1>
        <LoadingLine />
      </div> // Show a loading message or spinner while processing
  );
};

export default HandleLogin;