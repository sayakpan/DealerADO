"use client"

import React, { useState } from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'
import { User } from 'lucide-react'
import { getUserDetails } from '@/lib/auth'

const ProfilePage = () => {
    const { firstName, lastName, mobile, email, role } = getUserDetails()

    const handleInputChange = (field, value) => {
        // Update the profile data state
    }

    return (
        <div className="min-h-screen bg-white">
            <ServiceHeader title="My Profile" />

            {/* Profile Content */}
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex justify-center">
                    <div className="w-full max-w-[1170px] relative">
                        {/* Profile Icon - Positioned to overlap header */}
                        <div className="flex justify-center mb-8 -mt-20 md:-mt-28 relative z-10">
                            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full shadow-[0px_6px_6px_2px_rgba(0,0,0,0.30)] outline-3 outline-white bg-gray-200 flex items-center justify-center">
                                <User className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-gray-600" />
                            </div>
                        </div>

                        {/* Profile Information Form */}
                        <div className="">
                            <div className="flex flex-col gap-5 md:gap-7">
                                {/* First Row - Dealership Name and Name */}
                                <div className="flex flex-col lg:flex-row gap-5 md:gap-7">
                                    <div className="flex-1 p-3 border-b border-stone-300 flex flex-col gap-2.5">
                                        <label className="text-zinc-500 text-sm font-normal">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={firstName + ' ' + lastName || 'Not Added'}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="text-slate-700 text-xl cursor-not-allowed font-semibold bg-transparent border-none outline-none focus:ring-0 p-0"
                                            disabled
                                        />
                                    </div>
                                    <div className="flex-1 p-3 border-b border-stone-300 flex flex-col gap-2.5">
                                        <label className="text-zinc-500 text-sm font-normal">
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            value={role || 'Not Assigned'}
                                            onChange={(e) => handleInputChange('role', e.target.value)}
                                            className="text-slate-700 text-xl cursor-not-allowed font-semibold bg-transparent border-none outline-none focus:ring-0 p-0"
                                            disabled
                                        />
                                    </div>
                                </div>

                                {/* Second Row - Mobile and Email */}
                                <div className="flex flex-col lg:flex-row gap-5 md:gap-7">
                                    <div className="flex-1 p-3 border-b border-stone-300 flex flex-col gap-2.5">
                                        <label className="text-zinc-500 text-sm font-normal">
                                            Mobile no.
                                        </label>
                                        <div className="flex items-center gap-2.5">
                                            {mobile && (
                                                <>
                                                    <div className="text-slate-700 text-xl font-semibold">
                                                        +91
                                                    </div>
                                                    <div className="w-5 h-0 rotate-90 opacity-10 border-t border-black"></div>
                                                </>
                                            )}
                                            <input
                                                type="tel"
                                                value={mobile || 'Not Added'}
                                                onChange={(e) => handleInputChange('mobile', e.target.value)}
                                                className="text-slate-700 text-xl font-semibold cursor-not-allowed bg-transparent border-none outline-none focus:ring-0 p-0 flex-1"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 p-3 border-b border-stone-300 flex flex-col gap-2.5">
                                        <label className="text-zinc-500 text-sm font-normal">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={email || 'Not Added'}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="text-slate-700 text-xl font-semibold cursor-not-allowed bg-transparent border-none outline-none focus:ring-0 p-0"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <div className="flex items-start">
                                <div className="mr-3 mt-0.5">
                                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-amber-800 mb-1">Edit Account Details</h3>
                                    <p className="text-sm text-amber-700">
                                        Your profile information is currently read-only. Contact your administrator to make changes.
                                    </p>
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
