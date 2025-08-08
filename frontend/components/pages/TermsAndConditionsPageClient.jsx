"use client"

import React from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'

const TermsAndConditionsPageClient = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title="Terms and Conditions" />
            
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
                                Welcome to DealerADO. These Terms and Conditions ("Terms") govern your use of our API services and platform. By accessing or using our services, you agree to be bound by these Terms.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                By creating an account, accessing, or using DealerADO services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our services.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Eligibility and Account Registration</h2>
                            
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Eligibility Requirements</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                To use our services, you must:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>Be a verified car dealer with valid business credentials</li>
                                <li>Be at least 18 years of age</li>
                                <li>Have the legal authority to enter into this agreement</li>
                                <li>Provide accurate and complete registration information</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Account Security</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Service Description</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                DealerADO provides B2B API services specifically designed for verified car dealers. Our services include:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>Access to premium automotive APIs</li>
                                <li>Credit-based wallet system for API usage</li>
                                <li>Vehicle information and verification services</li>
                                <li>Data analytics and reporting tools</li>
                                <li>Customer support and technical assistance</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Payment Terms and Wallet System</h2>
                            
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Credit-Based System</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Our services operate on a prepaid credit system. You must maintain sufficient credits in your wallet to access API services. Credits are deducted per API call based on our published pricing.
                            </p>

                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Payment and Refunds</h3>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>All payments are processed securely through approved payment methods</li>
                                <li>Credits are non-refundable once purchased</li>
                                <li>Unused credits do not expire but may be subject to account inactivity policies</li>
                                <li>We reserve the right to modify pricing with 30 days' notice</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Acceptable Use Policy</h2>
                            
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Permitted Uses</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                You may use our services only for legitimate business purposes related to automotive dealing and in compliance with all applicable laws.
                            </p>

                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Prohibited Activities</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                You agree not to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>Use our services for any illegal or unauthorized purpose</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Reverse engineer, decompile, or disassemble our software</li>
                                <li>Share your account credentials with unauthorized parties</li>
                                <li>Exceed reasonable API usage limits or engage in abusive behavior</li>
                                <li>Use our services to compete with or harm our business</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Data Usage and Privacy</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Your use of our services is also governed by our Privacy Policy. You acknowledge that:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>We collect and process data as described in our Privacy Policy</li>
                                <li>You are responsible for complying with data protection laws</li>
                                <li>You will not use our services to collect personal data unlawfully</li>
                                <li>We may monitor usage for security and compliance purposes</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Intellectual Property Rights</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                All content, features, and functionality of our services are owned by DealerADO and are protected by copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive license to use our services in accordance with these Terms.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Service Availability and Modifications</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We strive to provide reliable service but cannot guarantee 100% uptime. We reserve the right to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>Modify, suspend, or discontinue services with reasonable notice</li>
                                <li>Perform maintenance and updates as necessary</li>
                                <li>Implement security measures that may affect service availability</li>
                                <li>Update these Terms with 30 days' notice for material changes</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Limitation of Liability</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                To the maximum extent permitted by law, DealerADO shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of our services.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">10. Indemnification</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                You agree to indemnify and hold harmless DealerADO from any claims, damages, losses, or expenses arising from your use of our services, violation of these Terms, or infringement of any third-party rights.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">11. Termination</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Either party may terminate this agreement at any time. We may suspend or terminate your account immediately for violation of these Terms. Upon termination:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li>Your access to services will be discontinued</li>
                                <li>Unused credits may be forfeited</li>
                                <li>You must cease all use of our services</li>
                                <li>Provisions regarding liability and indemnification survive termination</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">12. Governing Law and Dispute Resolution</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                These Terms are governed by the laws of [Jurisdiction]. Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization].
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">13. Miscellaneous</h2>
                            <ul className="list-disc pl-6 mb-4 text-slate-600">
                                <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and DealerADO</li>
                                <li><strong>Severability:</strong> If any provision is found unenforceable, the remainder shall remain in effect</li>
                                <li><strong>Waiver:</strong> Failure to enforce any provision does not constitute a waiver</li>
                                <li><strong>Assignment:</strong> You may not assign these Terms without our written consent</li>
                            </ul>
                        </div>

                        <div className="bg-[#B52628] text-white p-8 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                            <p className="text-lg mb-4">
                                If you have any questions about these Terms and Conditions, please contact us:
                            </p>
                            <div className="space-y-2">
                                <p><strong>Email:</strong> legal@dealerado.com</p>
                                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                                <p><strong>Address:</strong> 123 Business Street, Suite 100, City, State 12345</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/30">
                                <p className="text-sm opacity-90">
                                    By using our services, you acknowledge that you have read and understood these Terms and Conditions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditionsPageClient