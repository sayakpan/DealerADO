"use client"

import React from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'
import SmartLink from '../utils/SmartLink'

const AboutUsPageClient = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title="About Us" />

            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-800 mb-6">Welcome to DealerADO</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                Welcome to DealerADO — your trusted partner for reliable vehicle data.
                                We understand the challenges car dealers face when it comes to verifying vehicle details, building customer trust, and closing deals quickly. That’s why we created a platform designed to simplify the process.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                With DealerADO, you no longer need to rely on scattered sources or lengthy manual checks. Our platform brings everything together in one place — allowing you to enter vehicle details, access instant insights through a clean, easy-to-use dashboard, and generate professional PDF reports that you can confidently share with your customers.
                                Whether you're validating service history, checking ownership details, or ensuring transparency before a sale, DealerADO is built to support your business at every step.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Our mission is to empower car dealers with seamless access to trusted vehicle information. We aim to eliminate guesswork, reduce risks, and make every customer interaction smoother through instant, verified insights.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                We believe that trust is the foundation of every successful dealership. By providing quick and accurate reports, our mission goes beyond data — we help dealers build credibility, strengthen customer relationships, and make confident decisions that drive long-term success.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-4">What We Do</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                DealerADO provides a user-friendly platform where dealers can quickly input vehicle details, view results, and download professional PDF reports for customers. With our wallet-based system, you get complete flexibility and control — pay only for what you use.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                We simplify complex data and present it in a way that’s actionable, easy to understand, and ready to share. This allows dealers to save time, focus on their customers, and close more deals with confidence — without worrying about technical barriers or hidden complexities.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Our Values</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold text-slate-800 mb-3">Innovation</h4>
                                    <p className="text-slate-600">
                                        We continuously improve our platform to ensure a faster, smarter, and more efficient experience for dealers.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold text-slate-800 mb-3">Reliability</h4>
                                    <p className="text-slate-600">
                                        Accuracy is at the heart of what we do. Dealers trust us to deliver dependable information every time.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold text-slate-800 mb-3">Excellence</h4>
                                    <p className="text-slate-600">
                                        From data quality to user experience, we strive for excellence in every aspect of our service.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold text-slate-800 mb-3">Trust</h4>
                                    <p className="text-slate-600">
                                        We believe strong, lasting relationships are built on trust, and we're committed to being a dependable partner for every dealer.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#B52628] text-white p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4">Get Started Today</h3>
                            <p className="text-lg mb-6">
                                Join DealerADO and experience how easy it is to access verified vehicle insights. Recharge your wallet, check vehicle details instantly, and provide your customers with professional PDF reports — all in just a few clicks.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <SmartLink href="/contact-us" className="px-6 py-3 bg-white text-[#B52628] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                                    Contact Us
                                </SmartLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPageClient