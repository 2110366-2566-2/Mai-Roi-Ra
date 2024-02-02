'use client'
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "@/styles/FontPage.module.css"
import Link from "next/link";
import Image from "next/image";

const SignInForm = () => {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [errorUser,setErrorUser] = useState<number>(0);
    const [errorPassword,setErrorPassword] = useState<number>(0);

    const ErrorUser = [
        "Error: Please fill your phone number or email address",
        "Error: Not phone number or email address format",
        "Error: This username did not register yet"
    ];

    const ErrorPassword = [
        "Error: Please fill your password",
        "Error: Wrong password"
    ];

    const router = useRouter();
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(false);
        setErrorUser(0);
        setErrorPassword(0);

        if (user == ""){
            setErrorUser(1);
            setError(true);
            setPassword("");
            console.log("Error: Plase fill your phone number or email adress");
        } else if (password == ""){
            setErrorPassword(1);
            setError(true);
            setPassword("");
            console.log("Error: PLease fill your password");
        } else if (user.length < 10 || user.slice(-10) != "@gmail.com" 
        || (user.length == 10 && user[0] == '0' && !isNaN(Number(user))) ) {
            setErrorUser(2);
            setError(true);
            setPassword("");
            return;
            console.log("Error: Not phone number or email address format");
        } else {
            // try {
            //     const res = await signIn("credentials", {
            //         user,
            //         password,
            //         redirect: false
            //     });
            //     if (res?.error) {
            //         setError(res?.error);
            //         return;
            //     }
            //     router.replace('/')
            //     // I don't know how to fix this one but this works
            //     setTimeout(() => {
            //         window.location.reload();
            //     }, 1000);
            // } catch (error) {
            //     setError("Sign in failed. Account isn't existed.");
            // }
        }       
    }

    return (
        <div className="text-black bg-white w-screen h-screen flex justify-center items-center">

            <div className={`${styles.Roboto} text-center lg:w-[450px] lg:h-[450px] md:w-[350px] md:h-[350]`}>

                <div className="lg:w-[60px] lg:h-[60px] md:w-[50px] md:h-[50px] sm:w-[40px] sm:h-[40px] h-[30px] w-[30px]">
                        <Image src="/img/icon_sunlight.png"
                        alt="Failed To Load Image"
                        width={1000}
                        height={1000}/>
                </div>

                <div className="w-full lg:text-[42px] md:text-[35px] sm:text-[30px] text-[25px] mt-[10px] font-black">
                    Log in to MAI-ROI-RA
                </div>
                
                <form onSubmit={handleSubmit}>  
                    <div className="mt-[20px] w-full lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">
                     
                        <div>
                            <input className="w-full lg:h-[60px] md:h-[55px] sm:h-[50px] h-[45px] rounded-md border-gray-200 
                            border-[1px] indent-[20px]" 
                            type="text" placeholder="Phone number, email address" value={user} onChange={(e) => {setUser(e.target.value)}}/>

                            {
                               errorUser ? <div className="w-full text-start mt-[5px] text-red-600 lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px]">
                                    {ErrorUser[errorUser-1]}
                                </div> : null
                            }
                        </div>

                        <div className="mt-[20px]">
                            <input className="w-full lg:h-[60px] md:h-[55px] sm:h-[50px] h-[45px] rounded-md border-gray-200 
                            border-[1px] indent-[20px]" 
                            type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>

                            {
                               errorPassword ? <div className="w-full text-start mt-[5px] text-red-600 lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px]">
                                    {ErrorPassword[errorPassword-1]}
                                </div> : null
                            }
                        </div>
                    
                    </div>

                    <div className="mt-[20px]">
                        <button type="submit" className="rounded-full text-white hover:bg-sky-600 bg-sky-500 w-full 
                        lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] lg:h-[50px] md:h-[45px] sm:h-[40px] h-[35px]">
                            Log in
                        </button>
                    </div>
                </form>

                <div className="flex justify-end w-full text-sky-500 mt-[30px] 
                    lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">
                    <Link href="/auth/register" className="hover:text-sky-600 hover:underline">
                        Sign up
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default SignInForm;