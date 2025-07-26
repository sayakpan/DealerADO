/**
 *  Validation Utility
 *  
 *  Provides reusable validation rules and a function to validate fields against a set of rules.
 *  
 *  Validators:
 *  - `required(value)`: Ensures the field has a value.
 *  - `email(value)`: Validates email format.
 *  - `minLength(length)(value)`: Ensures the value has a minimum length (numeric values are checked as "digits").
 *  - `maxLength(length)(value)`: Ensures the value does not exceed the maximum length (numeric values are checked as "digits").
 *  - `numeric(value)`: Validates that the value contains only numbers.
 *  - `integer(value)`: Validates integer numbers (positive or negative).
 *  - `decimal(value)`: Validates decimal numbers.
 *  - `alphaNum(value)`: Ensures the value contains only letters and numbers.
 *  - `requiredIf(conditionFn)(value)`: Makes the field required if `conditionFn()` returns `true`.
 *  
 *  Example Usage:
 *  
 *  const validationRules = {
 *    name: [validators.required],
 *    email: [validators.required, validators.email],
 *    phone: [validators.required, validators.numeric, validators.minLength(10), validators.maxLength(10)],
 *    age: [validators.integer],
 *  };
 *  
 *  const data = {
 *    name: "",
 *    email: "invalid-email",
 *    phone: "123",
 *    age: "25.5",
 *  };
 *  
 *  const errors = validateFields(data, validationRules);
 *  console.log(errors);
 *  Output:
 *  {
 *    name: "This field is required",
 *    email: "Invalid email address",
 *    phone: "Must be at least 10 digits",
 *    age: "Must be an integer",
 *  }
 */

export const validators = {
    required: (value) => {
        return (value === null || value === undefined || value === "" ? "This field is required" : null)
    },

    email: (value) => {
        if (value === "" || value === null) return null; 
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email address"
    },

    minLength: (length) => (value) => {
        if (value === "" || value === null) return null; 
        const isNumeric = /^\d+$/.test(value);
        const descriptor = isNumeric ? "digits" : "characters";
        const stringValue = value.toString();
        return stringValue && stringValue.length >= length
            ? null
            : `Must be at least ${length} ${descriptor}`;
    },

    maxLength: (length) => (value) => {
        if (value === "" || value === null) return null; 
        const isNumeric = /^\d+$/.test(value);
        const descriptor = isNumeric ? "digits" : "characters";
        const stringValue = value.toString();
        return stringValue && stringValue.length <= length
            ? null
            : `Must not exceed ${length} ${descriptor}`;
    },

    hasLength: (length) => (value) => {
        if (value === "" || value === null) return null; 
        const isNumeric = /^\d+$/.test(value);
        const descriptor = isNumeric ? "digits" : "characters";
        const stringValue = value.toString();
        
        return stringValue && stringValue.length === length
            ? null
            : `Must be exactly ${length} ${descriptor}`;
    },

    hasMultipleLengths: (validLengths) => (value) => {
        if (value === "" || value === null) return null;
        
        const isNumeric = /^\d+$/.test(value);
        const descriptor = isNumeric ? "digits" : "characters";
    
        const stringValue = value.toString();
        return validLengths.includes(stringValue.length)
            ? null
            : `Must be one of the following lengths: ${validLengths.join(", ")} ${descriptor}`;
    },

    numeric: (value) => {
        if (value === "" || value === null) return null; 
        return /^\d+$/.test(value) ? null : "Must contain only numbers";
    },

    integer: (value) => {
        if (value === "" || value === null) return null; 
        return /^-?\d+$/.test(value) ? null : "Cannot contain decimal points"
    },

    decimal: (value) => {
        if (value === "" || value === null) return null; 
        return /^-?\d+(\.\d+)?$/.test(value) ? null : "Must be a decimal number"
    },

    alphaNum: (value) => {
        if (value === "" || value === null) return null; 
        return /^[a-zA-Z0-9]+$/.test(value) ? null : "Must contain only letters and numbers"
    },

    requiredIf: (conditionFn) => (value) => {
        return conditionFn() && (value === null || value === undefined || value === "")
            ? "This field is required"
            : null;
    },    
};

export function validateFields(data, rules) {
    const errors = {};

    for (const [field, fieldRules] of Object.entries(rules)) {
        for (const rule of fieldRules) {
            const error = rule(data[field]);
            if (error) {
                errors[field] = error;
                break;
            }
        }
    }

    return errors;
}

/*  
    Validates a single field's value against its defined rules.
    Returns the first error message encountered, or `null` if valid.

    Arguments:
    - fieldName (string): The name of the field being validated.
    - value (*): The value of the field to validate.
    - rules (Object): An object where keys are field names and values are arrays of validation rules.
*/

export function validateSingleField(fieldName, value, rules) {
    const fieldRules = rules[fieldName];

    if (!fieldRules) return null;

    for (const rule of fieldRules) {
        const error = rule(value); 
        if (error) return error; 
    }

    return null;
}