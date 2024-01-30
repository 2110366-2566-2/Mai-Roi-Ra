'use client'
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import userRegister from "@/libs/userRegister";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !email || !tel || !password || !confirmPassword) {
            setError("All fields are necessary");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Please enter a valid email address");
            return;
          }
        if (password.length < 6) {
            setError("Password has to be at least 6 characters long");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        try {
            const response = await userRegister(name, email, tel, password);
            console.log("Registration successful");
            router.push("/auth/signin");
        } catch (err) {
            setError("Register Failed. Might be because of duplicated email")
            console.log("Error during registration: ", err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <div className="grid place-items-center h-screen">
            <Image className="blur-sm"
            src="/images/informationBg.jpg"
            alt="Sky Background"
            fill={true}/>
            <div className="relative shadow-lg p-5 rounded-lg border-t-4 border-cyan-400 bg-white text-black">
                <h1 className="text-xl font-bold my-4">Register</h1>
                <form className="flex flex-col gap-3" onSubmit={handleRegister}>
                    <input
                        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(val) => setName(val.target.value)}
                    />
                    <input
                        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(val) => setEmail(val.target.value)}
                    />
                    <input
                        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg"
                        type="text"
                        placeholder="Tel"
                        value={tel}
                        onChange={(val) => setTel(val.target.value)}
                    />
                    <div className="relative">
                        <input
                            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(val) => setPassword(val.target.value)}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Password Confirmation"
                            value={confirmPassword}
                            onChange={(val) => setConfirmPassword(val.target.value)}
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button className="bg-cyan-600 text-white border-2 border-cyan-600 border-opacity-100 
                    font-semibold py-2 px-2 rounded-lg z-3 transform transition-colors duration-300 hover:bg-white hover:text-cyan-600 cursor-pointer">
                        Register
                    </button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded">
                            {error}
                        </div>
                    )}
                    <Link href={'/auth/signin'} className="text-sm mt-3 text-right">
                        Already have an account? <span className="underline text-cyan-700">Sign In Here!</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
