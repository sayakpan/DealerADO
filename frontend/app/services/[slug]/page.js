"use client"

import React, { useState, useEffect, use } from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'
import { getServiceBySlug, submitServiceData } from '@/services/services'
import { validators, validateSingleField } from '@/utils/validations'
import ServiceSuccessModal from '@/components/ui/service-success-modal'
import ServiceErrorModal from '@/components/ui/service-error-modal'

const ServicePage = ({ params }) => {
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const [validationRules, setValidationRules] = useState({})
    const [touchedFields, setTouchedFields] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [serviceResult, setServiceResult] = useState(null)
    const [submitError, setSubmitError] = useState(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)

    // Unwrap params using React.use()
    const resolvedParams = use(params)
    const { slug } = resolvedParams

    // Build validation rules from API response
    const buildValidationRules = (formFields, orGroups) => {
        const rules = {}

        formFields.forEach(field => {
            const fieldRules = []

            // Add required validation if field is required
            if (field.is_required) {
                // Check if field is part of OR group
                const isInOrGroup = orGroups.some(group => group.fields && group.fields.includes(field.key))

                if (isInOrGroup) {
                    // For OR groups, make field required only if all other fields in group are empty
                    const orGroup = orGroups.find(group => group.fields && group.fields.includes(field.key))
                    fieldRules.push(validators.requiredIf(() => {
                        return orGroup.fields.every(key => key === field.key || !formData[key])
                    }))
                } else {
                    fieldRules.push(validators.required)
                }
            }

            // Add validation rules from API
            if (field.validation_rules) {
                field.validation_rules.forEach(rule => {
                    switch (rule.type) {
                        case 'alphaNum':
                            fieldRules.push(validators.alphaNum)
                            break
                        case 'numeric':
                            fieldRules.push(validators.numeric)
                            break
                        case 'email':
                            fieldRules.push(validators.email)
                            break
                        case 'minLength':
                            fieldRules.push(validators.minLength(rule.value))
                            break
                        case 'maxLength':
                            fieldRules.push(validators.maxLength(rule.value))
                            break
                        case 'hasLength':
                            fieldRules.push(validators.hasLength(rule.value))
                            break
                        case 'hasMultipleLengths':
                            fieldRules.push(validators.hasMultipleLengths(rule.values))
                            break
                        case 'integer':
                            fieldRules.push(validators.integer)
                            break
                        case 'decimal':
                            fieldRules.push(validators.decimal)
                            break
                    }
                })
            }

            rules[field.key] = fieldRules
        })

        return rules
    }

    useEffect(() => {
        const fetchService = async () => {
            try {
                setLoading(true)
                const serviceData = await getServiceBySlug(slug)
                setService(serviceData)

                // Initialize form data with default values from API or empty strings
                const initialFormData = {}
                serviceData.form_fields?.forEach(field => {
                    // Use default_value from API if available, otherwise empty string
                    initialFormData[field.key] = field.default_value || ''
                })
                setFormData(initialFormData)

                // Build validation rules
                const rules = buildValidationRules(serviceData.form_fields || [], serviceData.or_groups || [])
                setValidationRules(rules)

            } catch (err) {
                setError(err.message)
                console.error("Error fetching service:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchService()
    }, [slug])

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
                    // If no field in the OR group is filled, mark all fields in the group as required
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
            // OR group validation
            if (orGroupErrors[fieldKey]) {
                return orGroupErrors[fieldKey]
            }
        } else if (field.is_required && !isInOrGroup) {
            // Regular required field validation
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
        // Mark field as touched
        setTouchedFields(prev => ({
            ...prev,
            [fieldKey]: true
        }))

        // Validate the field on blur
        const error = validateSingleFieldLogic(fieldKey, formData[fieldKey])
        setFormErrors(prev => ({
            ...prev,
            [fieldKey]: error
        }))
    }

    const validateForm = () => {
        const errors = {}

        // First, check OR groups to see if at least one field in each group is filled
        const orGroupErrors = {}
        if (service?.or_groups) {
            service.or_groups.forEach(group => {
                const hasAtLeastOneField = group.fields.some(fieldKey =>
                    formData[fieldKey] && formData[fieldKey].toString().trim() !== ''
                )

                if (!hasAtLeastOneField) {
                    // If no field in the OR group is filled, mark all fields in the group as required
                    group.fields.forEach(fieldKey => {
                        orGroupErrors[fieldKey] = group.message || "This field is required"
                    })
                }
            })
        }

        // Validate each field
        service?.form_fields?.forEach(field => {
            const fieldValue = formData[field.key]

            // Check if field is in an OR group and if the OR group requirement is satisfied
            const isInOrGroup = service.or_groups?.some(group => group.fields.includes(field.key))
            const orGroupSatisfied = isInOrGroup && !orGroupErrors[field.key]

            // Skip required validation for OR group fields if the group requirement is satisfied
            if (field.is_required && !orGroupSatisfied && isInOrGroup) {
                // OR group validation already handled above
                if (orGroupErrors[field.key]) {
                    errors[field.key] = orGroupErrors[field.key]
                }
            } else if (field.is_required && !isInOrGroup) {
                // Regular required field validation
                if (!fieldValue || fieldValue.toString().trim() === '') {
                    errors[field.key] = "This field is required"
                }
            }

            // Apply other validation rules only if field has a value
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

                // Prepare form data - only send non-empty values
                const submitData = {}
                Object.keys(formData).forEach(key => {
                    if (formData[key] && formData[key].toString().trim() !== '') {
                        submitData[key] = formData[key]
                    }
                })

                console.log('Submitting form data:', submitData)

                const result = await submitServiceData(slug, submitData)
                setServiceResult(result)
                console.log('Service result:', result)

                // Show success modal
                setShowSuccessModal(true)

            } catch (err) {
                console.error('Error submitting service data:', err)

                // Check if it's a 400 status code error
                // The error might have different structures depending on how fetchWithAuth handles it
                const isClientError = err.status === 400 || 
                                    err.statusCode === 400 || 
                                    err.response?.status === 400 ||
                                    err.message.includes('400') ||
                                    err.message.includes('Bad Request');

                if (isClientError) {
                    setShowErrorModal(true)
                } else {
                    setSubmitError(err.message || 'An error occurred while fetching service details')
                }
            } finally {
                setSubmitting(false)
            }
        }
    }

    // Modal handlers
    const handleDownload = () => {
        // TODO: Implement download functionality
        console.log('Download clicked', serviceResult)
    }

    const handleViewDetail = () => {
        // Keep the result displayed in the service details section
        console.log('View Detail clicked', serviceResult)
    }

    const handleRetry = () => {
        // Clear any previous errors and allow user to retry
        setSubmitError(null)
        setServiceResult(null)
    }

    const handleCancel = () => {
        // Clear any errors and reset form if needed
        setSubmitError(null)
        setServiceResult(null)
    }

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
                        <div className="text-[#B52628]">Error loading service: {error}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title={service?.name || "Service"} />

            {/* Service Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Single Responsive Layout */}
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

                                        {/* Add OR separator between fields if they are in OR groups */}
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
                        {/* Service Details Title */}
                        <div className="text-slate-700 text-2xl font-bold text-center lg:text-left">
                            Service Details:
                        </div>

                        {/* Service Details Results */}
                        <div className="px-4 py-3.5 bg-white rounded-xl shadow-[0px_4px_40px_5px_rgba(0,0,0,0.08)] border border-gray-200 flex flex-col justify-start items-start gap-5">
                            {/* Submit Error */}
                            {submitError && (
                                <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="text-[#B52628] text-sm font-medium">
                                        Error: {submitError}
                                    </div>
                                </div>
                            )}

                            {/* Service Result */}
                            {serviceResult && (
                                <div className="w-full">
                                    <div className="text-slate-700 text-lg font-semibold mb-3">
                                        Service Result:
                                    </div>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <pre className="text-slate-700 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                                            {JSON.stringify(serviceResult, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}

                            {/* Service Description */}
                            {service?.description && !serviceResult && !submitError && (
                                <div className="w-full">
                                    <div
                                        className="opacity-60 text-slate-700 text-sm font-normal leading-tight prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: service.description }}
                                    />
                                </div>
                            )}

                            {/* Default message when no result */}
                            {!service?.description && !serviceResult && !submitError && (
                                <div className="w-full text-center py-8">
                                    <div className="text-gray-500 text-sm">
                                        Fill out the form and click "Fetch Details" to see the service results here.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <ServiceSuccessModal
                open={showSuccessModal}
                onOpenChange={setShowSuccessModal}
                title="Vehicle Basic Detail Fetched Successfully"
                description="You can check that we have found the data of your vehicle from your register number."
                onDownload={handleDownload}
                onViewDetail={handleViewDetail}
            />

            {/* Error Modal */}
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

export default ServicePage