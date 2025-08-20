"use client"

import React, { useState, useEffect } from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'
import { deletePdf, generatePdf, submitServiceData } from '@/services/services'
import { validators } from '@/utils/validations'
import RenderedLogClient from '@/components/ui/RenderedLogClient'
import { toast } from '@/plugin/toast'

const ServicePageClient = ({ service, slug }) => {
    const [formData, setFormData] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const [touchedFields, setTouchedFields] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [serviceResult, setServiceResult] = useState(null)
    const [submittedData, setSubmittedData] = useState(null)
    const [downloadingPdf, setDownloadingPdf] = useState(false)

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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleFetchDetails();
    };

    const handleFetchDetails = async () => {
        if (validateForm()) {
            try {
                setSubmitting(true)
                setServiceResult(null)
                setSubmittedData(null)

                const submitData = {}
                Object.keys(formData).forEach(key => {
                    if (formData[key] && formData[key].toString().trim() !== '') {
                        submitData[key] = formData[key]
                    }
                })
                setSubmittedData(submitData)

                const result = await submitServiceData(slug, submitData)
                setServiceResult(result)

            } catch (err) {
                console.error('Error submitting service data:', err)
                toast.error(err.message || 'An error occurred while fetching details.')
            } finally {
                setSubmitting(false)
            }
        }
    }

    const handleDownloadPDF = async () => {
        if (serviceResult && serviceResult.log_id) {
            try {

                const pdfData = await generatePdf(serviceResult.log_id, service.name);
                if (pdfData?.success) {
                    toast.success('PDF downloaded successfully!', { title: 'Download Complete' });
                }
            } catch (error) {
                console.error('Error downloading PDF:', error);
                toast.error('Failed to download PDF', { title: 'Download Failed' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title={service?.name || "Service"} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8">
                    {/* Service Form */}
                    {service?.form_fields && service.form_fields.length > 0 && (
                        <form onSubmit={handleFormSubmit} className="w-full max-w-[570px] mx-auto lg:mx-0 px-5 py-7 bg-white rounded-[20px] shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] flex flex-col justify-start items-start gap-4">
                            <div className="w-full flex flex-col gap-4">
                                {service.form_fields.map((field, index) => (
                                    <React.Fragment key={field.key}>
                                        <div className="w-full p-3 border-b border-stone-300 flex flex-col justify-start items-start gap-2.5">
                                            <div className="text-zinc-500 text-sm md:text-sm font-normal">
                                                {field.label} {field.is_required && <span className="text-red-500">*</span>}
                                            </div>
                                            <div className="text-slate-700 text-base md:text-2xl font-medium w-full">
                                                {(() => {
                                                    switch (field.input_type) {
                                                        case 'text':
                                                        case 'number':
                                                        case 'date':
                                                            return (
                                                                <input
                                                                    type={field.input_type}
                                                                    name={field.key}
                                                                    placeholder={field.placeholder}
                                                                    value={formData[field.key] || ''}
                                                                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                                                                    onBlur={() => handleInputBlur(field.key)}
                                                                    className="w-full bg-transparent border-none outline-none text-slate-700 text-sm md:text-base font-medium placeholder:text-slate-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                                                    required={field.is_required}
                                                                />
                                                            );
                                                        case 'select':
                                                            return (
                                                                <select
                                                                    name={field.key}
                                                                    value={formData[field.key] || ''}
                                                                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                                                                    onBlur={() => handleInputBlur(field.key)}
                                                                    className="w-full bg-transparent border-none outline-none text-slate-700 text-sm md:text-base font-medium placeholder:text-slate-400"
                                                                    required={field.is_required}
                                                                >
                                                                    <option value="">{field.placeholder}</option>
                                                                    {field.options.map(option => (
                                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                                    ))}
                                                                </select>
                                                            );
                                                        case 'radio':
                                                            return (
                                                                <div className="flex flex-col gap-2">
                                                                    {field.options.map(option => (
                                                                        <label key={option.value} className="flex items-center gap-2 text-sm md:text-base font-normal">
                                                                            <input
                                                                                type="radio"
                                                                                name={field.key}
                                                                                value={option.value}
                                                                                checked={formData[field.key] === option.value}
                                                                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                                                                                onBlur={() => handleInputBlur(field.key)}
                                                                                required={field.is_required}
                                                                            />
                                                                            {option.label}
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            );
                                                        case 'checkbox':
                                                            return (
                                                                <label className="flex items-center gap-2 text-sm md:text-base font-normal">
                                                                    <input
                                                                        type="checkbox"
                                                                        name={field.key}
                                                                        checked={!!formData[field.key]}
                                                                        onChange={(e) => handleInputChange(field.key, e.target.checked)}
                                                                        onBlur={() => handleInputBlur(field.key)}
                                                                        required={field.is_required}
                                                                    />
                                                                    {field.label}
                                                                </label>
                                                            );
                                                        default:
                                                            return null;
                                                    }
                                                })()}
                                            </div>
                                            {formErrors[field.key] && (
                                                <div className="text-[#B52628] text-[10px] md:text-sm font-normal">
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
                                                    <div className="flex-1 h-0 outline outline-offset-[-0.25px] outline-gray-200"></div>
                                                    <div className="text-center text-zinc-500 text-[10px] md:text-base font-semibold">OR</div>
                                                    <div className="flex-1 h-0 outline outline-offset-[-0.25px] outline-gray-200"></div>
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
                                        type="submit"
                                        className="w-full h-full cursor-pointer bg-transparent border-none text-white text-sm md:text-base font-semibold capitalize transition-colors duration-200 disabled:cursor-not-allowed"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-[10px] md:text-base">Fetching...</span>
                                            </div>
                                        ) : (
                                            'Fetch Details'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Service Details */}
                    <div className="w-full max-w-[570px] mx-auto lg:mx-0 flex flex-col gap-6">
                        <div className="text-slate-700 text-lg md:text-2xl font-bold text-center lg:text-left">
                            Service Details:
                        </div>

                        <div className="px-4 py-3.5 bg-white rounded-xl shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] border border-gray-200 flex flex-col justify-start items-start gap-5">
                            {/* Service Description */}
                            {service?.description && (
                                <div className="w-full pb-4">
                                    <div
                                        className="opacity-60 text-slate-700 text-[10px] md:text-sm font-normal leading-tight prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: service.description }}
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 pb-8">
                {/* Service Result */}
                {serviceResult && (
                    <div className="w-full">
                        <div className="flex justify-between items-center my-4">
                            <h3 className="text-base md:text-lg font-semibold">Response</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDownloadPDF}
                                    className={`bg-[#B52628] hover:bg-[#9e1f21] cursor-pointer text-white text-[10px] md:text-base px-4 py-2 rounded-lg transition-colors ${downloadingPdf ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    disabled={downloadingPdf}
                                >
                                    {downloadingPdf ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-[10px] md:text-base">Downloading...</span>
                                        </div>
                                    ) : (
                                        'Download PDF'
                                    )}
                                </button>
                            </div>
                        </div>
                        <RenderedLogClient log={serviceResult} />
                    </div>
                )}

            </div>
        </div>
    )
}

export default ServicePageClient
