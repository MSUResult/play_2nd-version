"use client";
import { Camera, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
// Import your server action here
import { createUserInMongo } from "@/lib/actions/Signupform";

const Singupform = () => {
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
  ];

  const router = useRouter();
  const inputRef = useRef(null);
  const [stateValue, setStateValue] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Call Server Action directly
      const resData = await createUserInMongo({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        avatar: user.photoURL,
        provider: "google",
      });

      if (resData.success) {
        alert("Google Login Success ✅");
        router.push("/");
        router.refresh(); // Refresh to update the server-side state/cookies
      } else {
        alert(resData.message || "Signup failed");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Email Signup Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const age = formData.get("age");
    const state = stateValue; // Use state from the dropdown
    const avatarFile = formData.get("avatar");

    try {
      // Create user in Firebase first
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      // Prepare data for the Server Action
      // Note: We pass the File object (avatar) directly if your server action supports it
      const resData = await createUserInMongo({
        uid: user.uid,
        name,
        email,
        age,
        state,
        avatar: avatarFile, // The file from input type="file"
        provider: "email",
      });

      if (resData.success) {
        alert(resData.message);
        router.push("/");
        router.refresh();
      } else {
        alert(resData.message || "Signup Failed");
      }
    } catch (error) {
      console.error("Form Submit Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setStateValue(value);
    if (value.trim() !== "") {
      const matches = indianStates.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredStates(matches);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".state-wrapper")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <main className="min-h-screen bg-slate-400">
      <section className="w-full flex items-center justify-center p-4">
        <form
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6"
          onSubmit={handleFormSubmit}
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-purple-900 via-purple-500 to-purple-400 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-sm text-gray-500">Join our community today</p>
          </div>

          <div
            className="relative w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300 cursor-pointer hover:scale-105 transition"
            onClick={() => inputRef.current.click()}
          >
            <User size={40} className="text-gray-500" />
            <span className="absolute bottom-0 right-0 bg-purple-600 p-1.5 rounded-full">
              <Camera size={16} stroke="white" />
            </span>
            <input
              type="file"
              name="avatar"
              ref={inputRef}
              className="hidden"
              accept="image/*"
            />
          </div>

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex gap-2 w-full">
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="relative w-2/3 state-wrapper">
              <input
                type="text"
                placeholder="State"
                autoComplete="off"
                value={stateValue}
                onChange={handleStateChange}
                onFocus={() => stateValue && setShowDropdown(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              {showDropdown && filteredStates.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto z-50">
                  {filteredStates.map((state, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setStateValue(state);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-purple-100 transition"
                    >
                      {state}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-purple-700 w-full p-4 rounded-2xl font-bold text-white hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Signup With Email"}
          </button>
        </form>
      </section>

      <div className="w-full flex justify-center mt-6">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full max-w-md bg-white text-black border border-gray-300 hover:bg-gray-100 p-4 rounded-2xl font-bold shadow-lg transition disabled:opacity-50"
        >
          Sign Up with Google
        </button>
      </div>
    </main>
  );
};

export default Singupform;
