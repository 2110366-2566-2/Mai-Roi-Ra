"use client";
import React, { useState, useEffect } from "react";
import { apiBackUrl } from "@/constants";
import { FaCamera } from "react-icons/fa";

const ProfileImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("/img/profile_picture.png"); // Default profile picture

  // When the selectedImage changes, upload the image
  useEffect(() => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const uploadImage = async () => {
        try {
          const response = await fetch(`${apiBackUrl}/upload`, {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            setPreview(data.imageUrl); // Update the preview image with the URL from the backend
          } else {
            // Handle errors if the response is not ok
            console.error("Upload failed");
          }
        } catch (error) {
          // Handle the error if the fetch fails
          console.error("Error uploading the image:", error);
        }
      };

      uploadImage();
    }
  }, [selectedImage]);

  // Handle file selection and preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  return (
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 bg-gray-500 rounded-full flex justify-center items-center">
        <FaCamera className="text-white text-xl" />
      </div>
      <img
        src={preview}
        alt="Profile"
        className="relative z-10 cursor-pointer w-full h-full rounded-full object-cover transition duration-300 ease-in-out hover:opacity-30"
        onClick={() => document.getElementById("image-input")?.click()}
      />
      <input
        id="image-input"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImage;
