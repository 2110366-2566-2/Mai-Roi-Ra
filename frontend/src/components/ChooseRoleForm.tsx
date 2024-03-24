import { use } from "chai";
import React from "react";

export default function ChooseRoleForm({ role, setRole, setOpenChooseRoleForm, handleUpdateRole, username, setUsername }: { role: string, setRole: Function, setOpenChooseRoleForm: Function, handleUpdateRole: Function, username: string, setUsername: Function }) {
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
      };
    return (
        <>
            <h1 className="text-center mt-2">Select your role</h1>
            <div className="relative">
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
                    placeholder="Address"
                />
                {username && (
                    <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
                        Username
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 bg-gray-100 p-10 my-10 rounded-lg">
                <div className="flex items-center justify-center gap-8">
                    <div
                        className={`text-center w-[150px] h-[150px] bg-white cursor-pointer flex items-center justify-center text-black hover:bg-yellow-200 rounded-lg shadow-xl ${role == "USER" ? "!bg-[#FFAE27] !text-white" : ""}`}
                        onClick={() => setRole("USER")}
                    >
                        User
                    </div>
                    <div
                        className={`text-center w-[150px] h-[150px] bg-white cursor-pointer flex items-center justify-center text-black hover:bg-yellow-200 rounded-lg shadow-xl ${role == "ORGANIZER" ? "!bg-[#FFAE27] !text-white" : ""}`}
                        onClick={() => setRole("ORGANIZER")}
                    >
                        Organizer
                    </div>
                </div>
                <p className="text-center mt-4 text-gray-400">Please note, you can only make a selection once.</p>
            </div>
            <div className="flex justify-center items-center gap-3 mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setOpenChooseRoleForm(false)}
                >
                    Back
                </button>
                <button className="bg-[#F2D22E] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleUpdateRole()}
                >
                    Done
                </button>
            </div>
        </>
    );
}
