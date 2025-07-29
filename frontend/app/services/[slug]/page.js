"use client"

import React, { useState, useEffect, use } from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'
import { getServiceBySlug } from '@/services/services'

const ServicePage = ({ params }) => {
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Unwrap params using React.use()
    const resolvedParams = use(params)
    const { slug } = resolvedParams

    useEffect(() => {
        const fetchService = async () => {
            try {
                setLoading(true)
                const serviceData = await getServiceBySlug(slug)
                setService(serviceData)
            } catch (err) {
                setError(err.message)
                console.error("Error fetching service:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchService()
    }, [slug])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <ServiceHeader title="Loading..." />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg text-gray-600">Loading service...</div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <ServiceHeader title="Error" />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="text-red-800">Error loading service: {error}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title={service?.name || "Service"} />

            {/* Service Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                {/* Mobile & Tablet: Stacked Layout */}
                <div className="flex flex-col items-center gap-4 sm:gap-6 xl:hidden">
                    {/* Service Form */}
                    {service?.form_fields && service.form_fields.length > 0 && (
                        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl px-3 sm:px-4 md:px-5 py-4 sm:py-5 md:py-6 lg:py-7 bg-white rounded-lg sm:rounded-xl md:rounded-[20px] shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] flex flex-col justify-start items-start gap-3 sm:gap-4">
                            <div className="w-full flex flex-col gap-3 sm:gap-4">
                                {service.form_fields.map((field, index) => (
                                    <div key={index} className="w-full p-2 sm:p-3 border-b border-stone-300 flex flex-col justify-start items-start gap-2 sm:gap-2.5">
                                        <div className="text-zinc-500 text-xs sm:text-sm font-normal">
                                            {field.label}
                                        </div>
                                        <div className="text-slate-700 text-lg sm:text-xl md:text-2xl font-medium w-full">
                                            {field.input_type === 'text' && (
                                                <input
                                                    type="text"
                                                    name={field.key}
                                                    placeholder={field.placeholder}
                                                    required={field.is_required}
                                                    className="w-full bg-transparent border-none outline-none text-slate-700 text-lg sm:text-xl md:text-2xl font-medium placeholder:text-slate-400"
                                                    defaultValue="WB20BK5454"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Submit Button */}
                                <div className="w-full h-10 sm:h-12 p-2 sm:p-2.5 bg-red-700 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.20)] flex justify-center items-center gap-2.5">
                                    <button
                                        className="w-full h-full bg-transparent border-none text-white text-sm sm:text-base font-semibold capitalize cursor-pointer hover:bg-red-800 transition-colors duration-200"
                                        onClick={() => console.log('Fetch Details clicked')}
                                    >
                                        Fetch Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Service Details Title */}
                    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl text-slate-700 text-lg sm:text-xl md:text-2xl font-bold">
                        Service Details:
                    </div>

                    {/* Service Details Results */}
                    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl min-h-[300px] sm:min-h-[400px] md:min-h-[542px] px-3 sm:px-4 py-3 sm:py-3.5 bg-white rounded-lg sm:rounded-xl shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] border border-gray-200 flex flex-col justify-start items-start gap-3 sm:gap-4 md:gap-5">
                        {/* Result Items */}
                        {[1, 2, 3, 4].map((item) => (
                            <React.Fragment key={item}>
                                <div className="w-full flex justify-start items-start gap-2 sm:gap-3">
                                    <div className="text-slate-700 text-sm sm:text-base font-bold shrink-0 mt-0.5">{item}.</div>
                                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 md:gap-0">
                                        <div className="text-slate-700 text-sm sm:text-base font-bold">Req No.</div>
                                        <div className="opacity-60 text-slate-700 text-xs sm:text-sm font-normal leading-none break-all">12WB20BK545434</div>
                                    </div>
                                </div>
                                <div className="w-full h-0 opacity-5 border-t border-black"></div>
                                <div className="w-full opacity-60 text-slate-700 text-xs sm:text-sm font-normal leading-tight">
                                    Lorem ipsum dolor sit amet consectetur. Cras elementum eleifend feugiat donec purus feugiat dui. Porta mattis consectetur sed nullam. Aliquet scelerisque ornare sed viverra ac.
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Desktop/Large Screen: Side by Side Layout */}
                <div className="hidden xl:flex xl:justify-center xl:items-start xl:gap-8 2xl:gap-12">
                    {/* Left Side - Service Form */}
                    <div className="flex flex-col gap-6">
                        {service?.form_fields && service.form_fields.length > 0 && (
                            <div className="w-[500px] 2xl:w-[570px] px-5 py-7 bg-white rounded-[20px] shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] flex flex-col justify-start items-start gap-4">
                                <div className="w-full flex flex-col gap-4">
                                    {service.form_fields.map((field, index) => (
                                        <div key={index} className="w-full p-3 border-b border-stone-300 flex flex-col justify-start items-start gap-2.5">
                                            <div className="text-zinc-500 text-sm font-normal">
                                                {field.label}
                                            </div>
                                            <div className="text-slate-700 text-2xl font-medium w-full">
                                                {field.input_type === 'text' && (
                                                    <input
                                                        type="text"
                                                        name={field.key}
                                                        placeholder={field.placeholder}
                                                        required={field.is_required}
                                                        className="w-full bg-transparent border-none outline-none text-slate-700 text-2xl font-medium placeholder:text-slate-400 focus:placeholder:text-slate-300 transition-colors duration-200"
                                                        defaultValue="WB20BK5454"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Submit Button */}
                                    <div className="w-full h-12 p-2.5 bg-red-700 rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.20)] flex justify-center items-center gap-2.5">
                                        <button
                                            className="w-full h-full bg-transparent border-none text-white text-base font-semibold capitalize cursor-pointer hover:bg-red-800 transition-colors duration-200"
                                            onClick={() => console.log('Fetch Details clicked')}
                                        >
                                            Fetch Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Side - Service Details */}
                    <div className="flex flex-col gap-6">
                        {/* Service Details Title */}
                        <div className="w-[500px] 2xl:w-[570px] text-slate-700 text-2xl font-bold">
                            Service Details:
                        </div>

                        {/* Service Details Results */}
                        <div className="w-[500px] 2xl:w-[570px] px-4 py-3.5 bg-white rounded-xl shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] border border-gray-200 flex flex-col justify-start items-start gap-5">
                            {/* Result Items */}
                            {[1, 2, 3, 4].map((item) => (
                                <React.Fragment key={item}>
                                    <div className="w-full flex justify-start items-center gap-3">
                                        <div className="text-slate-700 text-base font-bold">{item}.</div>
                                        <div className="flex-1 flex justify-between items-center">
                                            <div className="text-slate-700 text-base font-bold">Req No.</div>
                                            <div className="opacity-60 text-slate-700 text-sm font-normal leading-none">12WB20BK545434</div>
                                        </div>
                                    </div>
                                    <div className="w-full h-0 opacity-5 border-t border-black"></div>
                                    <div className="w-full opacity-60 text-slate-700 text-sm font-normal leading-tight">
                                        Lorem ipsum dolor sit amet consectetur. Cras elementum eleifend feugiat donec purus feugiat dui. Porta mattis consectetur sed nullam. Aliquet scelerisque ornare sed viverra ac.
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicePage