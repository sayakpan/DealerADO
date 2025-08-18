"use client"

import React, { useState, useEffect } from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'
import { deletePdf, generatePdf, submitServiceData } from '@/services/services'
import { validators } from '@/utils/validations'
import RenderedLogClient from '@/components/ui/RenderedLogClient'

const ServicePageClient = ({ service, slug }) => {
    const [formData, setFormData] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const [touchedFields, setTouchedFields] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [serviceResult, setServiceResult] = useState(null)
    const [submitError, setSubmitError] = useState(null)
    const [submittedData, setSubmittedData] = useState(null)

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
                setSubmitError(null)
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
                setSubmitError(err.message || 'An error occurred while fetching details.')
            } finally {
                setSubmitting(false)
            }
        }
    }

    const handleDownloadPDF = async () => {
        if (serviceResult && serviceResult.log_id) {
            try {

                const pdfData = await generatePdf(serviceResult.log_id);

                // Step 2: Open the PDF in a new tab
                window.open(pdfData.pdf_url, '_blank');

                // Step 3: Delete the PDF from the server
                await deletePdf(pdfData.pdf_filename);

            } catch (error) {
                console.error('Error downloading PDF:', error);
                // Handle error appropriately, maybe show a toast notification
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
                                        type="submit"
                                        className="w-full h-full bg-transparent border-none text-white text-base font-semibold capitalize transition-colors duration-200 disabled:cursor-not-allowed"
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
                        </form>
                    )}

                    {/* Service Details */}
                    <div className="w-full max-w-[570px] mx-auto lg:mx-0 flex flex-col gap-6">
                        <div className="text-slate-700 text-2xl font-bold text-center lg:text-left">
                            Service Details:
                        </div>

                        <div className="px-4 py-3.5 bg-white rounded-xl shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] border border-gray-200 flex flex-col justify-start items-start gap-5">
                            {/* Service Description */}
                            {service?.description && (
                                <div className="w-full pb-4 border-b border-gray-200">
                                    <div
                                        className="opacity-60 text-slate-700 text-sm font-normal leading-tight prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: service.description }}
                                    />
                                </div>
                            )}

                            {/* Submitted Data */}
                            {submittedData && (
                                <div className="w-full">
                                    <h3 className="text-base font-semibold text-slate-700 mb-2">Input Parameters</h3>
                                    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50/50">
                                        {Object.entries(submittedData).map(([key, value]) => {
                                            const field = service?.form_fields?.find(f => f.key === key);
                                            return (
                                                <div key={key} className="flex justify-between items-center py-1.5 border-b border-gray-200 last:border-b-0 text-sm">
                                                    <span className="text-gray-600">{field?.label || key}:</span>
                                                    <span className="text-gray-900 font-medium">{value}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {submitError && (
                                <div className="w-full text-center py-8 text-red-500">
                                    <div className="text-lg mb-4">Error</div>
                                    <p>{submitError}</p>
                                </div>
                            )}

                            {/* Service Result */}
                            {serviceResult && (
                                <div className="w-full">
                                    <div className="flex justify-between items-center my-4">
                                        <h3 className="text-lg font-semibold">Response</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleDownloadPDF}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Download PDF
                                            </button>
                                        </div>
                                    </div>
                                    <RenderedLogClient log={serviceResult} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicePageClient
