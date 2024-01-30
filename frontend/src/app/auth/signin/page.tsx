'use client'
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "@/styles/FontPage.module.css"

export default function SignIn() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });
            if (res?.error) {
                setError(res?.error)
                return
            }
            router.replace('/')
            // I don't know how to fix this one but this works
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            setError("Sign in failed. Account isn't existed.")
        }
    }


    return (
        <div className="text-black bg-white w-screen h-screen flex justify-center items-center">
            <div className={`${styles.Actor} text-center w-[500px] h-[450px] bg-red-50`}>
                <div className={`${styles.Roboto} w-full text-[42px] font-bold`}>
                    Log in to MAI-ROI-RA
                </div>

                <div className="w-[80%] content-center space-y-[30px]">
                    <form action="">   
                        <div>
                            <input className="w-full h-[60px] rounded-md text-[20px] border-gray-200 border-[1px]
                            indent-[20px]" 
                            type="text" placeholder="Phone number, email address"/> 
                        </div>

                        <div>
                            <input className="w-full h-[60px] rounded-md text-[20px] border-gray-200 border-[1px]
                            indent-[20px]" 
                            type="password" placeholder="Password"/>
                        </div>
                    </form>
                </div>

                <div>
                    <button className="rounded-full text-white bg-sky-500 w-full h-[50px] text-[18px]">
                        Log in
                    </button>
                </div>

                <div className="place-items-end w-full">
                    Sign up
                </div>
            </div>
        </div>
//         <div className="grid place-items-center h-screen">
//             <Image className="blur-sm"
//             src="/images/informationBg.jpg"
//             alt="Sky Background"
//             fill={true}/>
//             <div className="relative shadow-lg p-5 rounded-lg border-t-4 border-cyan-400 bg-white text-black">
//                 <h1 className="text-xl font-bold my-4">Sign-in</h1>
//                 <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
//                     <input className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg" type="text" placeholder="Email"
//                         value={email} onChange={val => setEmail(val.target.value)} />
//                     <div className="relative">
//                         <input
//                             className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(val) => setPassword(val.target.value)}
//                         />
//                         <button
//                             type="button"
//                             onClick={togglePasswordVisibility}
//                             className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </button>
//                     </div>
//                     <button className="bg-cyan-600 text-white border-2 border-cyan-600 border-opacity-100
//   font-semibold py-2 px-2 rounded-lg z-3 
//   transform transition-colors duration-300 hover:bg-white hover:text-cyan-600 cursor-pointer">Sign In</button>
//                     {
//                         error && (
//                             <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded">
//                                 {error}
//                             </div>
//                         )
//                     }
//                     <Link href={'/auth/register'} className="text-sm mt-3 text-right">
//                         Don't have an account ? <span className="underline text-cyan-700"> Register Here !</span>
//                     </Link>
//                 </form>
//             </div>
//         </div>
    )
}