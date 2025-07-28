"use client"
import Image from 'next/image'
import ServiceHeader from "@/components/ui/serviceHeader"

const SettingsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title="Settings" />
            {/* Settings Content */}
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-[20px] p-6 shadow-sm">
                    <div className="flex flex-col justify-center items-end gap-5">
                        {/* Change Password Setting */}
                        <div className="self-stretch flex justify-between items-center cursor-pointer">
                            <div className="flex justify-start items-center gap-3">
                                {/* Background Circle with Password Icon */}
                                <div className="w-[50px] h-[50px] rounded-full bg-[#F9EEEE] flex items-center justify-center relative">
                                    <Image src="/images/settings/change-password.svg" alt="Change Password" width={20} height={20} className="w-5 h-5" />
                                </div>
                                {/* Text Content */}
                                <div className="text-slate-700 text-lg font-semibold">Change Password</div>
                            </div>
                            {/* Arrow Icon */}
                            <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.42578 14.6L6.85912 9.16669C7.50078 8.52502 7.50078 7.47503 6.85912 6.83336L1.42578 1.40002"
                                    stroke="#2A394A"
                                    strokeWidth="1.25"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        {/* Divider Line */}
                        <div className="w-full h-0 opacity-5 border-t border-black"></div>
                        {/* Deactivate Account Setting */}
                        <div className="self-stretch flex justify-between items-center cursor-pointer">
                            <div className="flex justify-start items-center gap-3">
                                {/* Background Circle with Deactivate Icon */}
                                <div className="w-[50px] h-[50px] rounded-full bg-[#F9EEEE] flex items-center justify-center relative">
                                    <Image src="/images/settings/deactivate-account.svg" alt="Deactivate Account" width={20} height={20} className="w-5 h-5" />
                                </div>
                                {/* Text Content */}
                                <div className="text-slate-700 text-lg font-semibold">Deactivate My Account</div>
                            </div>
                            {/* Arrow Icon */}
                            <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.42578 14.6L6.85912 9.16669C7.50078 8.52502 7.50078 7.47503 6.85912 6.83336L1.42578 1.40002"
                                    stroke="#2A394A"
                                    strokeWidth="1.25"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
