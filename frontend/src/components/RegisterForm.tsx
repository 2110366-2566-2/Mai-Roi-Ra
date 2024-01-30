"use client";
import styles from "@/styles/FontPage.module.css";

export default function RegisterForm() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg border-2 p-8 w-1/2 h-auto">
        <div className="w-full">
          <div className={`${styles.Roboto} text-2xl mb-6 text-gray-800`}>
            Create an account
          </div>
        </div>
        <div className="w-full">
          <form className="space-y-4">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Phone number"
              />
            </div>
            <div>
              <div style={{ color: "#1EA1F1" }}>Use Email</div>
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white px-4 py-4 rounded-lg hover:bg-blue-600"
              style={{ backgroundColor: "#1EA1F1" }}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
