"use client"

import React, { useState } from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'
import { Eye, EyeOff } from 'lucide-react'
import { changePassword } from '@/services/settings'
import { toast } from "@/plugin/toast"
import { useRouter } from 'next/navigation'

const ChangePasswordPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (error) setError('')
    }

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const validateForm = () => {
        if (!formData.currentPassword) {
            setError('Current password is required')
            return false
        }
        if (!formData.newPassword) {
            setError('New password is required')
            return false
        }
        if (formData.newPassword.length < 8) {
            setError('New password must be at least 8 characters long')
            return false
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match')
            return false
        }
        if (formData.currentPassword === formData.newPassword) {
            setError('New password must be different from current password')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setError('')
        setSuccess('')

            const response = await changePassword(formData)
            // Show success toast
            if(response?.status === 400){
                console.log(response?.error)
                // toast.error(response?.error || 'Something went wrong', {
                //     duration: 3000
                // })
                setLoading(false)
            }else{
                toast.success(response?.message || 'Password changed successfully!', {
                    duration: 3000
                })
                setSuccess(response?.message || 'Password changed successfully!')
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
                // Redirect to login or settings after successful change
                setTimeout(() => {
                    router.push('/login')
                }, 2000)
                setLoading(false)
            }

    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title="Change Password" />

            {/* Change Password Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="max-w-md sm:max-w-lg lg:max-w-2xl mx-auto">
                    <div className="w-full mx-auto px-4 sm:px-5 lg:px-7 py-5 sm:py-6 lg:py-7 bg-white rounded-2xl sm:rounded-3xl shadow-[0px_8px_32px_3px_rgba(0,0,0,0.04)] sm:shadow-[0px_12px_40px_5px_rgba(0,0,0,0.04)] flex flex-col justify-start items-start gap-4 overflow-hidden">
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                            {/* Current Password */}
                            <div className="w-full p-3 sm:p-4 border-b border-stone-300 flex justify-between items-end gap-3">
                                <div className="flex-1 flex flex-col justify-center items-start gap-1.5 sm:gap-2">
                                    <div className="text-zinc-500 text-sm sm:text-base font-normal">
                                        Enter Old Password
                                    </div>
                                    <div className="w-full flex justify-start items-center gap-1">
                                        <input
                                            type={showPasswords.current ? "text" : "password"}
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent border-none outline-none text-slate-700 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
                                            placeholder="Enter your current password"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('current')}
                                    className="flex-shrink-0 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer p-1"
                                    aria-label="Toggle current password visibility"
                                >
                                    {showPasswords.current ? (
                                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ) : (
                                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                    )}
                                </button>
                            </div>

                            {/* New Password */}
                            <div className="w-full p-3 sm:p-4 border-b border-stone-300 flex justify-between items-end gap-3">
                                <div className="flex-1 flex flex-col justify-center items-start gap-1.5 sm:gap-2">
                                    <div className="text-zinc-500 text-sm sm:text-base font-normal">
                                        Enter New Password
                                    </div>
                                    <div className="w-full flex justify-start items-center gap-1">
                                        <input
                                            type={showPasswords.new ? "text" : "password"}
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent border-none outline-none text-slate-700 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
                                            placeholder="Enter your new password"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    className="flex-shrink-0 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer p-1"
                                    aria-label="Toggle new password visibility"
                                >
                                    {showPasswords.new ? (
                                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ) : (
                                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                    )}
                                </button>
                            </div>

                            {/* Confirm New Password */}
                            <div className="w-full p-3 sm:p-4 border-b border-stone-300 flex justify-between items-end gap-3">
                                <div className="flex-1 flex flex-col justify-center items-start gap-1.5 sm:gap-2">
                                    <div className="text-zinc-500 text-sm sm:text-base font-normal">
                                        Confirm New Password
                                    </div>
                                    <div className="w-full flex justify-start items-center gap-1">
                                        <input
                                            type={showPasswords.confirm ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent border-none outline-none text-slate-700 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
                                            placeholder="Confirm your new password"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="flex-shrink-0 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer p-1"
                                    aria-label="Toggle confirm password visibility"
                                >
                                    {showPasswords.confirm ? (
                                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ) : (
                                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                    )}
                                </button>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                                    <div className="text-red-800 text-sm sm:text-base">{error}</div>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                                    <div className="text-green-800 text-sm sm:text-base">{success}</div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="w-full h-11 sm:h-12 lg:h-14 p-2 sm:p-2.5 bg-red-700 rounded-xl sm:rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.20)] flex justify-center items-center gap-2.5 mt-2 sm:mt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full cursor-pointer h-full bg-transparent border-none text-white text-sm sm:text-base lg:text-lg font-semibold capitalize flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-sm sm:text-base">Submitting...</span>
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordPage