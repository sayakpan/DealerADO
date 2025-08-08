"use client"

import React from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'

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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-4">What We Do</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Our Values</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold text-slate-800 mb-3">Innovation</h4>
                                    <p className="text-slate-600">
                                        Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold text-slate-800 mb-3">Reliability</h4>
                                    <p className="text-slate-600">
                                        Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold text-slate-800 mb-3">Excellence</h4>
                                    <p className="text-slate-600">
                                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold text-slate-800 mb-3">Trust</h4>
                                    <p className="text-slate-600">
                                        Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#B52628] text-white p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4">Get Started Today</h3>
                            <p className="text-lg mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="px-6 py-3 bg-white text-[#B52628] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                                    Contact Us
                                </button>
                                <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#B52628] transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPageClient