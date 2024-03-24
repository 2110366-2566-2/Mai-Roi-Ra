import React from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import OrganizerIcon from '@mui/icons-material/SendTimeExtension';
import UserIcon from '@mui/icons-material/Accessibility';

export default function ChooseRoleForm({ role, setRole, setOpenChooseRoleForm, handleUpdateRole, username, setUsername }: { role: string, setRole: Function, setOpenChooseRoleForm: Function, handleUpdateRole: Function, username: string, setUsername: Function }) {
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
      };
    return (
        <>
            <h1 className="text-center my-2 mb-4">Select your role</h1>
            <div className="relative">
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
                    placeholder="Username"
                    required
                />
                {username && (
                    <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
                        Username
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 bg-gray-100 p-10 mb-10 mt-5 rounded-lg">
                <div className="flex items-center justify-center gap-8">
                    <div
                        className={`text-center w-[150px] h-[150px] bg-white cursor-pointer flex items-center justify-center text-black hover:bg-yellow-200 rounded-lg shadow-xl ${role == "USER" ? "!bg-[#FFAE27] !text-white" : ""}`}
                        onClick={() => setRole("USER")}
                    >   
                        <div className="flex flex-col items-center justify-between">
                        <UserIcon className="text-6xl"/>
                        <span className="mt-2">User</span>
                        </div>
                    </div>
                    <div
                        className={`text-center w-[150px] h-[150px] bg-white cursor-pointer flex items-center justify-center text-black hover:bg-yellow-200 rounded-lg shadow-xl ${role == "ORGANIZER" ? "!bg-[#FFAE27] !text-white" : ""}`}
                        onClick={() => setRole("ORGANIZER")}
                    >
                        <div className="flex flex-col items-center justify-between">
                        <OrganizerIcon className="text-6xl"/>
                        <span className="mt-2">Organizer</span>
                        </div>
                    </div>
                </div>
                <p className="text-center mt-4 text-gray-400">Please note, you can only make a selection once.</p>
            </div>
            <div className="flex justify-center items-center gap-3 mt-2">
                <button className="bg-white hover:bg-[#F2D22E]0 text-black font-bold py-2 px-4 rounded text-center border border-[#F2D22E]"
                    onClick={() => setOpenChooseRoleForm(false)}
                >
                    <KeyboardBackspaceIcon className="text-sm mr-2"/> Back
                </button>
                {username === "" 
                ? 
                <button className="bg-gray-300 text-white font-bold py-2 px-4 rounded cursor-not-allowed w-32 ml-32" disabled>
                    Done
                </button>
                :
                <button className="bg-[#F2D22E] hover:bg-[#FFAE27] text-white font-bold py-2 px-4 rounded w-32 ml-32"
                    onClick={() => handleUpdateRole()}
                >
                    Done
                </button>}
                
            </div>
        </>
    );
}
