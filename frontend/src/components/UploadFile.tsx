'use client'
import { apiBackUrl } from '@/constants';
import createUpload from '@/libs/createUpload';
import { useSession } from 'next-auth/react';
import { useState, ChangeEvent, FormEvent } from 'react';

const ImageUploadForm: React.FC = () => {
  const session = useSession();
  const user = session.data?.user;  
  console.log(user);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  // Handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);
    // Example: POST request to your server endpoint
    await createUpload(formData,user.token);

    // Clear the form
    setSelectedImage(null);
    setPreview('');
  };

  return (
    <form action={handleSubmit} className="space-y-4" encType="multipart/form-data">
      {preview && (
        <div className="w-full h-64 flex justify-center items-center">
          <img src={preview} alt="Preview" className="max-h-full" />
        </div>
      )}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Upload Image
      </button>
    </form>
  );
};

export default ImageUploadForm;