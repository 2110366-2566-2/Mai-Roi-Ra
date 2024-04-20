"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import LoadingLine from "@/components/LoadingLine";

const HandleLogin = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const initiateLogin = async () => {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/homepage",
      });

      if (result?.url) {
        // Successfully authenticated, redirect to the callbackUrl or home
        if (session?.user?.username === "") {
          router.replace("/auth/Oauth-register");
          return;
        }
        router.replace(result.url);
      } else {
        // Handle failed login attempt, maybe redirect to login page or show an error
        router.replace("/");
      }
    };

    // Only initiate login if there is no current session
    if (!session) {
      initiateLogin();
    }
  }, [router, session]);

  return (
    <div className="w-screen h-screen flex items-center justify-center text-center flex-col">
      <h1 className="mb-5">Loading...</h1>
      <LoadingLine />
    </div> // Show a loading message or spinner while processing
  );
};

export default HandleLogin;