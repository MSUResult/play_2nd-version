"use client"
import { useAuth } from "@/context/userContext";
import { Flame, Heart, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const ExplorePage = ({ users = [] }) => {

  const router = useRouter()

  const handleClick = (opponentId: string)=> {
    router.push(`/play/record/${opponentId}`)
    }

 



  return (
    <main className="min-h-screen w-full px-6 py-8 bg-[#f4f7f6] text-[#1a1a1a]">
      
      {/* HEADER SECTION */}
      <section className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="py-2.5 px-5 bg-white shadow-sm border border-gray-100 text-sm font-bold flex items-center gap-2 rounded-full">
          <Heart size={18} fill="#ff4d4d" stroke="none" className="animate-pulse" />
          <span>12 Likes</span>
        </div>
        <div className="group cursor-pointer flex items-center gap-3">
          <span className="font-bold text-sm hidden sm:block">My Profile</span>
          <div className="rounded-full flex items-center justify-center bg-black text-white w-12 h-12 ring-4 ring-white shadow-lg group-hover:scale-110 transition-transform">
            You
          </div>
        </div>
      </section>

      {/* BANNER SECTION */}
      <section className="max-w-7xl mx-auto bg-gradient-to-br from-[#00DDAA] to-[#009988] rounded-[32px] min-h-[160px] mt-8 flex flex-col sm:flex-row gap-6 items-center px-10 py-6 justify-between relative overflow-hidden shadow-xl shadow-teal-100">
        {/* Background Decorative Element */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <span className="text-xs font-bold tracking-widest text-white/80 uppercase">Happening Now</span>
          </div>
          <h1 className="font-black text-3xl text-white tracking-tight">LIVE SEMINAR</h1>
          <p className="text-white/90 font-medium">Connect with our top dating coaches</p>
        </div>
        
        <button className="relative z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md p-5 rounded-2xl transition-all active:scale-90 border border-white/30 group">
           <Flame fill="white" stroke="none" className="group-hover:scale-125 transition-transform" />
        </button>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mt-12 mb-6">
          <div>
             <h2 className="text-3xl font-black tracking-tight">Active Challengers</h2>
             <p className="text-gray-500 font-medium">Ready to start a conversation?</p>
          </div>
          <button className="text-teal-600 font-bold hover:underline cursor-pointer">View all</button>
        </div>

        {/* Updated Grid with Gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {users.map((user) => (
            
            <div 
              key={user._id} 
              className="group flex flex-col bg-white p-3 rounded-[24px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-teal-100"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[18px]">
                <Image 
                  src={user.avatar} 
                  alt={user.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4">
                   <p className="text-white font-bold text-2xl drop-shadow-md">{user.name}</p>
                   <div className="flex items-center gap-1 text-white/80 text-xs font-medium">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online Now
                   </div>
                </div>
              </div>

              <button onClick={(e) => handleClick(user._id)} className="bg-[#1a1a1a] hover:bg-teal-600 active:scale-95 transition-all text-white font-bold w-full mt-4 py-4 rounded-[16px] flex items-center justify-center gap-2">
                Challenge
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="h-20" /> {/* Bottom spacer */}
    </main>
  );
};

export default ExplorePage;