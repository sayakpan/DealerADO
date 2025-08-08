"use client"

import React, { useState, useEffect } from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'
import { submitServiceData } from '@/services/services'
import { validators } from '@/utils/validations'
import ServiceErrorModal from '@/components/ui/service-error-modal'
import { ServiceResultSkeleton } from '@/components/skeletons/ServiceSkeleton'
import { toast } from '@/plugin/toast'

const ServicePageClient = ({ service, slug }) => {
    const [formData, setFormData] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const [touchedFields, setTouchedFields] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [serviceResult, setServiceResult] = useState(null)
    const [submitError, setSubmitError] = useState(null)
    const [showErrorModal, setShowErrorModal] = useState(false)

    useEffect(() => {
        // Initialize form data with default values from API or empty strings
        const initialFormData = {}
        service?.form_fields?.forEach(field => {
            initialFormData[field.key] = field.default_value || ''
        })
        setFormData(initialFormData)
    }, [service])

    const validateSingleFieldLogic = (fieldKey, value) => {
        const field = service?.form_fields?.find(f => f.key === fieldKey)
        if (!field) return null

        // First, check OR groups to see if at least one field in each group is filled
        const orGroupErrors = {}
        if (service?.or_groups) {
            service.or_groups.forEach(group => {
                const hasAtLeastOneField = group.fields.some(key => {
                    const fieldValue = key === fieldKey ? value : formData[key]
                    return fieldValue && fieldValue.toString().trim() !== ''
                })

                if (!hasAtLeastOneField) {
                    group.fields.forEach(key => {
                        orGroupErrors[key] = group.message || "This field is required"
                    })
                }
            })
        }

        const fieldValue = value
        const isInOrGroup = service.or_groups?.some(group => group.fields.includes(fieldKey))
        const orGroupSatisfied = isInOrGroup && !orGroupErrors[fieldKey]

        // Check required validation
        if (field.is_required && !orGroupSatisfied && isInOrGroup) {
            if (orGroupErrors[fieldKey]) {
                return orGroupErrors[fieldKey]
            }
        } else if (field.is_required && !isInOrGroup) {
            if (!fieldValue || fieldValue.toString().trim() === '') {
                return "This field is required"
            }
        }

        // Apply other validation rules only if field has a value
        if (fieldValue && fieldValue.toString().trim() !== '' && field.validation_rules) {
            for (const rule of field.validation_rules) {
                let validator = null

                switch (rule.type) {
                    case 'alphaNum':
                        validator = validators.alphaNum
                        break
                    case 'numeric':
                        validator = validators.numeric
                        break
                    case 'email':
                        validator = validators.email
                        break
                    case 'minLength':
                        validator = validators.minLength(rule.value)
                        break
                    case 'maxLength':
                        validator = validators.maxLength(rule.value)
                        break
                    case 'hasLength':
                        validator = validators.hasLength(rule.value)
                        break
                    case 'hasMultipleLengths':
                        validator = validators.hasMultipleLengths(rule.values)
                        break
                    case 'integer':
                        validator = validators.integer
                        break
                    case 'decimal':
                        validator = validators.decimal
                        break
                }

                if (validator) {
                    const validationError = validator(fieldValue)
                    if (validationError) {
                        return validationError
                    }
                }
            }
        }

        return null
    }

    const handleInputChange = (fieldKey, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldKey]: value
        }))

        // Only validate on typing if the field has been touched and has errors
        if (touchedFields[fieldKey] && formErrors[fieldKey]) {
            const error = validateSingleFieldLogic(fieldKey, value)
            setFormErrors(prev => ({
                ...prev,
                [fieldKey]: error
            }))
        }
    }

    const handleInputBlur = (fieldKey) => {
        setTouchedFields(prev => ({
            ...prev,
            [fieldKey]: true
        }))

        const error = validateSingleFieldLogic(fieldKey, formData[fieldKey])
        setFormErrors(prev => ({
            ...prev,
            [fieldKey]: error
        }))
    }

    const validateForm = () => {
        const errors = {}

        // First, check OR groups
        const orGroupErrors = {}
        if (service?.or_groups) {
            service.or_groups.forEach(group => {
                const hasAtLeastOneField = group.fields.some(fieldKey =>
                    formData[fieldKey] && formData[fieldKey].toString().trim() !== ''
                )

                if (!hasAtLeastOneField) {
                    group.fields.forEach(fieldKey => {
                        orGroupErrors[fieldKey] = group.message || "This field is required"
                    })
                }
            })
        }

        // Validate each field
        service?.form_fields?.forEach(field => {
            const fieldValue = formData[field.key]
            const isInOrGroup = service.or_groups?.some(group => group.fields.includes(field.key))
            const orGroupSatisfied = isInOrGroup && !orGroupErrors[field.key]

            if (field.is_required && !orGroupSatisfied && isInOrGroup) {
                if (orGroupErrors[field.key]) {
                    errors[field.key] = orGroupErrors[field.key]
                }
            } else if (field.is_required && !isInOrGroup) {
                if (!fieldValue || fieldValue.toString().trim() === '') {
                    errors[field.key] = "This field is required"
                }
            }

            // Apply other validation rules
            if (fieldValue && fieldValue.toString().trim() !== '' && field.validation_rules) {
                field.validation_rules.forEach(rule => {
                    let validator = null

                    switch (rule.type) {
                        case 'alphaNum':
                            validator = validators.alphaNum
                            break
                        case 'numeric':
                            validator = validators.numeric
                            break
                        case 'email':
                            validator = validators.email
                            break
                        case 'minLength':
                            validator = validators.minLength(rule.value)
                            break
                        case 'maxLength':
                            validator = validators.maxLength(rule.value)
                            break
                        case 'hasLength':
                            validator = validators.hasLength(rule.value)
                            break
                        case 'hasMultipleLengths':
                            validator = validators.hasMultipleLengths(rule.values)
                            break
                        case 'integer':
                            validator = validators.integer
                            break
                        case 'decimal':
                            validator = validators.decimal
                            break
                    }

                    if (validator) {
                        const validationError = validator(fieldValue)
                        if (validationError && !errors[field.key]) {
                            errors[field.key] = validationError
                        }
                    }
                })
            }
        })

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleFetchDetails = async () => {
        if (validateForm()) {
            try {
                setSubmitting(true)
                setSubmitError(null)
                setServiceResult(null)

                const submitData = {}
                Object.keys(formData).forEach(key => {
                    if (formData[key] && formData[key].toString().trim() !== '') {
                        submitData[key] = formData[key]
                    }
                })

                const result = await submitServiceData(slug, submitData)
                setServiceResult(result)

            } catch (err) {
                console.error('Error submitting service data:', err)

                const isClientError = err.status === 400 ||
                    err.statusCode === 400 ||
                    err.response?.status === 400 ||
                    err.message.includes('400') ||
                    err.message.includes('Bad Request');

                if (isClientError) {
                    setShowErrorModal(true)
                } else {
                    // Show error in toast instead of replacing service description
                    const errorMessage = err.message || 'An error occurred while fetching service details'
                    toast.error(errorMessage)
                    setServiceResult({ error: true, message: errorMessage })
                }
            } finally {
                setSubmitting(false)
            }
        }
    }

    const handleDownload = () => {
        console.log('Download clicked', serviceResult)
    }

    const handleRetry = () => {
        setSubmitError(null)
        setServiceResult(null)
    }

    const handleCancel = () => {
        setSubmitError(null)
        setServiceResult(null)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title={service?.name || "Service"} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8">
                    {/* Service Form */}
                    {service?.form_fields && service.form_fields.length > 0 && (
                        <div className="w-full max-w-[570px] mx-auto lg:mx-0 px-5 py-7 bg-white rounded-[20px] shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] flex flex-col justify-start items-start gap-4">
                            <div className="w-full flex flex-col gap-4">
                                {service.form_fields.map((field, index) => (
                                    <React.Fragment key={field.key}>
                                        <div className="w-full p-3 border-b border-stone-300 flex flex-col justify-start items-start gap-2.5">
                                            <div className="text-zinc-500 text-sm font-normal">
                                                {field.label}
                                            </div>
                                            <div className="text-slate-700 text-2xl font-medium w-full">
                                                {(field.input_type === 'text' || field.input_type === 'number') && (
                                                    <input
                                                        type={field.input_type === 'number' ? 'number' : 'text'}
                                                        name={field.key}
                                                        placeholder={field.placeholder}
                                                        value={formData[field.key] || ''}
                                                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                                                        onBlur={() => handleInputBlur(field.key)}
                                                        className="w-full bg-transparent border-none outline-none text-slate-700 text-2xl font-medium placeholder:text-slate-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                                        required={field.is_required}
                                                    />
                                                )}
                                            </div>
                                            {formErrors[field.key] && (
                                                <div className="text-[#B52628] text-sm font-normal">
                                                    {formErrors[field.key]}
                                                </div>
                                            )}
                                        </div>

                                        {/* OR separator */}
                                        {index < service.form_fields.length - 1 &&
                                            service.or_groups &&
                                            service.or_groups.some(group =>
                                                group.fields &&
                                                group.fields.includes(field.key) &&
                                                group.fields.includes(service.form_fields[index + 1].key)
                                            ) && (
                                                <div className="w-full inline-flex justify-center items-center gap-3">
                                                    <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-gray-200"></div>
                                                    <div className="text-center text-zinc-500 text-base font-semibold">OR</div>
                                                    <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-gray-200"></div>
                                                </div>
                                            )}
                                    </React.Fragment>
                                ))}

                                {/* Submit Button */}
                                <div className={`w-full h-12 p-2.5 rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.20)] flex justify-center items-center gap-2.5 transition-colors duration-200 ${submitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#B52628] hover:bg-[#9e1f21] cursor-pointer'
                                    }`}>
                                    <button
                                        className="w-full h-full bg-transparent border-none text-white text-base font-semibold capitalize transition-colors duration-200 disabled:cursor-not-allowed"
                                        onClick={handleFetchDetails}
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Fetching...</span>
                                            </div>
                                        ) : (
                                            'Fetch Details'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Service Details */}
                    <div className="w-full max-w-[570px] mx-auto lg:mx-0 flex flex-col gap-6">
                        <div className="text-slate-700 text-2xl font-bold text-center lg:text-left">
                            Service Details:
                        </div>

                        <div className="px-4 py-3.5 bg-white rounded-xl shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] border border-gray-200 flex flex-col justify-start items-start gap-5">
                            {/* Show service description if available */}
                            {service?.description && (
                                <div className="w-full">
                                    <div
                                        className="opacity-60 text-slate-700 text-sm font-normal leading-tight prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: service.description }}
                                    />
                                </div>
                            )}

                            {/* Show loading skeleton while submitting */}
                            {submitting && !serviceResult && (
                                <ServiceResultSkeleton />
                            )}

                            {/* Show service result (success or error) */}
                            {serviceResult && (
                                <div className="w-full">
                                    {serviceResult.error ? (
                                        // Error result
                                        <div>
                                            <div className="text-slate-700 text-lg font-semibold mb-3">
                                                Service Result:
                                            </div>
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                <div className="text-[#B52628] text-sm font-medium">
                                                    Error: {serviceResult.message}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Success result
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="text-slate-700 text-lg font-semibold">
                                                    Service Result:
                                                </div>
                                                <button
                                                    onClick={handleDownload}
                                                    className="px-4 py-2 bg-[#B52628] hover:bg-[#9e1f21] text-white text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    Download PDF
                                                </button>
                                            </div>
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                <pre className="text-slate-700 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                                                    {JSON.stringify(serviceResult, null, 2)}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Show placeholder when no description and no result */}
                            {!service?.description && !serviceResult && (
                                <div className="w-full text-center py-8">
                                    <div className="text-gray-500 text-sm mb-4">
                                        Fill out the form and click "Fetch Details" to see the service results here.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ServiceErrorModal
                open={showErrorModal}
                onOpenChange={setShowErrorModal}
                title="Unsuccessful"
                description="Please retry ! Enter your correct register number so that the data can be fetched."
                onRetry={handleRetry}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default ServicePageClient