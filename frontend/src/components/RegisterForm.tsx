"use client";

export default function RegisterForm() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg border-2 p-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
            Create an account
          </h2>
        </div>
        <div>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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
