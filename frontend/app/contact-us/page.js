'use client'

import ServiceHeader from '@/components/ui/serviceHeader'
import { Phone, MessageCircle, Mail, ArrowRight } from 'lucide-react'
import React from 'react'

const ContactUsPage = () => {
    const handleCallUs = () => {
        window.open('tel:+1234567890', '_self')
    }

    const handleWhatsApp = () => {
        window.open('https://wa.me/1234567890', '_blank')
    }

    const handleEmail = () => {
        window.open('mailto:contact@dealerado.com', '_self')
    }

    const handleDirection = () => {
        window.open('https://maps.google.com/?q=102+N+Rucker+Ave,+Rolla,+MO+65401,+United+States', '_blank')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title="Contact Us" />

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="w-full max-w-[1167px] mx-auto flex flex-col gap-5">

                    {/* Connect with section */}
                    <div className="w-full px-4 py-5 bg-white rounded-[20px] shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] flex flex-col gap-5">
                        <div className="text-slate-700 text-2xl font-bold">
                            Connect with
                        </div>

                        <div className="flex flex-col md:flex-row gap-7">
                            {/* Call Us Button */}
                            <button
                                onClick={handleCallUs}
                                className="flex-1 h-12 px-5 py-2.5 bg-[#B52628] rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] flex justify-between items-center hover:bg-[#9e2123] transition-colors"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Phone className="w-5 h-5 text-white" strokeWidth={1.375} />
                                    <div className="text-white text-sm font-semibold capitalize">
                                        call Us
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white" strokeWidth={1.25} />
                            </button>

                            {/* WhatsApp Button */}
                            <button
                                onClick={handleWhatsApp}
                                className="flex-1 h-12 px-5 py-2.5 bg-[#2A394A] rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] flex justify-between items-center hover:bg-[#1f2a36] transition-colors"
                            >
                                <div className="flex items-center gap-2.5">
                                    <MessageCircle className="w-5 h-5 text-white" strokeWidth={1.3} />
                                    <div className="text-white text-sm font-semibold capitalize">
                                        WhatsApp Us
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white" strokeWidth={1.25} />
                            </button>

                            {/* Email Button */}
                            <button
                                onClick={handleEmail}
                                className="flex-1 h-12 px-5 py-2.5 bg-[#B52628] rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] flex justify-between items-center hover:bg-[#9e2123] transition-colors"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Mail className="w-5 h-5 text-white" strokeWidth={1.5} />
                                    <div className="text-white text-sm font-semibold capitalize">
                                        Email
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white" strokeWidth={1.25} />
                            </button>
                        </div>
                    </div>

                    {/* Our Address section */}
                    <div className="w-full px-4 py-5 bg-white rounded-[20px] shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                            <div className="text-slate-700 text-2xl font-bold">
                                Our Address
                            </div>
                            <div className="opacity-60 text-slate-700 text-sm font-normal leading-tight">
                                102 N Rucker Ave, Rolla, MO 65401, United States
                            </div>
                        </div>

                        <button
                            onClick={handleDirection}
                            className="w-full h-12 p-2.5 bg-[#B52628] rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.20)] flex justify-center items-center gap-2.5 hover:bg-[#9e2123] transition-colors"
                        >
                            <div className="text-white text-base font-semibold capitalize">
                                Direction
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ContactUsPage