"use client"

import React from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'

const PrivacyPolicyPageClient = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title="Privacy Policy" />
            
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                    {/* Last Updated */}
                    <div className="mb-8 pb-6 border-b border-gray-200">
                        <p className="text-sm text-gray-600">
                            <strong>Last Updated:</strong> January 2025
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="mb-8">
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                At DealerADO, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Information We Collect</h2>
                            
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Personal Information</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We may collect personal information that you provide directly to us, including but not limited to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>Name, email address, and contact information</li>
                                <li>Business information and dealer credentials</li>
                                <li>Account login credentials</li>
                                <li>Payment and billing information</li>
                                <li>Communication preferences</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Usage Information</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We automatically collect certain information about your use of our services, including:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>API usage patterns and frequency</li>
                                <li>Device information and browser type</li>
                                <li>IP address and location data</li>
                                <li>Log files and analytics data</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. How We Use Your Information</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We use the information we collect for various purposes, including:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>Providing and maintaining our API services</li>
                                <li>Processing transactions and managing your account</li>
                                <li>Communicating with you about our services</li>
                                <li>Improving our services and user experience</li>
                                <li>Ensuring security and preventing fraud</li>
                                <li>Complying with legal obligations</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Information Sharing and Disclosure</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>With your explicit consent</li>
                                <li>To comply with legal requirements or court orders</li>
                                <li>To protect our rights, property, or safety</li>
                                <li>With trusted service providers who assist in our operations</li>
                                <li>In connection with a business transfer or merger</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Data Security</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Regular security assessments and updates</li>
                                <li>Access controls and authentication mechanisms</li>
                                <li>Employee training on data protection</li>
                                <li>Incident response procedures</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Data Retention</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Your Rights</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Depending on your location, you may have certain rights regarding your personal information, including:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>The right to access your personal information</li>
                                <li>The right to correct inaccurate information</li>
                                <li>The right to delete your personal information</li>
                                <li>The right to restrict processing</li>
                                <li>The right to data portability</li>
                                <li>The right to object to processing</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Cookies and Tracking Technologies</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>Remember your preferences and settings</li>
                                <li>Analyze usage patterns and improve our services</li>
                                <li>Provide personalized content and recommendations</li>
                                <li>Ensure security and prevent fraud</li>
                            </ul>
                            <p className="text-slate-600 leading-relaxed">
                                You can control cookie settings through your browser preferences, though disabling certain cookies may affect the functionality of our services.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Third-Party Services</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Our services may contain links to third-party websites or integrate with third-party services. This Privacy Policy does not apply to these external services, and we encourage you to review their privacy policies before providing any personal information.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Changes to This Privacy Policy</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date.
                            </p>
                        </div>

                        <div className="bg-[#B52628] text-white p-8 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                            <p className="text-lg mb-4">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="space-y-2">
                                <p><strong>Email:</strong> privacy@dealerado.com</p>
                                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                                <p><strong>Address:</strong> 123 Business Street, Suite 100, City, State 12345</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicyPageClient