'use client'
import { useState } from 'react';
interface Props {
    id:string
    name:string
    isVisible:boolean
    onClose:Function
}

const TestPopup = ({id,name,isVisible,onClose} : Props) => {
    const [header,setHeader] = useState("");
    const [message,setMessage] = useState("");
    if (!isVisible) return null;
    
    const handleClose = async () => {
        onClose();
    }

  return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4">Modal Content</h2>
            <p>This is the content of the modal.</p>
            <button onClick={handleClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              Close
            </button>
          </div>
        </div>
  );
}

export default TestPopup;
