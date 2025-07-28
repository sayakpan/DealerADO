"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ServiceHeader from '@/components/ui/serviceHeader'

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        dealershipName: "CarCare Dealership",
        name: "Phillip Vaccaro",
        mobile: "9876543210",
        email: "carcare@gmail.com",
        profileImage: "https://placehold.co/180x180"
    })

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div className="min-h-screen bg-white">
            <ServiceHeader title="My Profile" />

            {/* Profile Content */}
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex justify-center">
                    <div className="w-full max-w-[1170px] relative">
                        {/* Profile Image - Positioned to overlap header */}
                        <div className="flex justify-center mb-8 -mt-20 md:-mt-28 relative z-10">
                            <Image
                                // src={profileData.profileImage || '/images/profile/default.png'}
                                src='/images/homepage/testi-1.png'
                                alt="Profile"
                                width={180}
                                height={180}
                                className="size-40 md:size-44 rounded-full shadow-[0px_6px_6px_2px_rgba(0,0,0,0.30)] outline-3 outline-white object-cover"
                            />
                        </div>

                        {/* Profile Information Form */}
                        <div className="">
                            <div className="flex flex-col gap-7">
                                {/* First Row - Dealership Name and Name */}
                                <div className="flex flex-col lg:flex-row gap-7">
                                    <div className="flex-1 p-3 border-b border-stone-300 flex flex-col gap-2.5">
                                        <label className="text-zinc-500 text-sm font-normal">
                                            Dealership Name
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.dealershipName}
                                            onChange={(e) => handleInputChange('dealershipName', e.target.value)}
                                            className="text-slate-700 text-xl font-semibold bg-transparent border-none outline-none focus:ring-0 p-0"
                                        />
                                    </div>
                                    <div className="flex-1 p-3 border-b border-stone-300 flex flex-col gap-2.5">
                                        <label className="text-zinc-500 text-sm font-normal">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="text-slate-700 text-xl font-semibold bg-transparent border-none outline-none focus:ring-0 p-0"
                                        />
                                    </div>
                                </div>

                                {/* Second Row - Mobile and Email */}
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex-1 p-3 border-b border-stone-300 flex flex-col gap-2.5">
                                        <label className="text-zinc-500 text-sm font-normal">
                                            Mobile no.
                                        </label>
                                        <div className="flex items-center gap-2.5">
                                            <div className="text-slate-700 text-xl font-semibold">
                                                +91
                                            </div>
                                            <div className="w-5 h-0 rotate-90 opacity-10 border-t border-black"></div>
                                            <input
                                                type="tel"
                                                value={profileData.mobile}
                                                onChange={(e) => handleInputChange('mobile', e.target.value)}
                                                className="text-slate-700 text-xl font-semibold bg-transparent border-none outline-none focus:ring-0 p-0 flex-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 p-3 border-b border-stone-300 flex flex-col gap-2.5">
                                        <label className="text-zinc-500 text-sm font-normal">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="text-slate-700 text-xl font-semibold bg-transparent border-none outline-none focus:ring-0 p-0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage