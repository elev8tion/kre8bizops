/**
 * ELEV8TION Form Validation Module
 * Enhanced form validation with visual feedback
 */

const Validation = (function() {
    'use strict';

    // Validation rules
    const rules = {
        required: {
            validate: (value) => {
                if (value === null || value === undefined) return false;
                if (typeof value === 'string') return value.trim().length > 0;
                if (Array.isArray(value)) return value.length > 0;
                return true;
            },
            message: 'This field is required'
        },

        email: {
            validate: (value) => {
                if (!value) return true; // Empty is valid unless required
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
            message: 'Please enter a valid email address'
        },

        phone: {
            validate: (value) => {
                if (!value) return true;
                const cleaned = value.replace(/\D/g, '');
                return cleaned.length >= 10;
            },
            message: 'Please enter a valid phone number (at least 10 digits)'
        },

        url: {
            validate: (value) => {
                if (!value) return true;
                try {
                    new URL(value);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            message: 'Please enter a valid URL'
        },

        min: {
            validate: (value, min) => {
                const num = parseFloat(value);
                return !isNaN(num) && num >= min;
            },
            message: (min) => `Value must be at least ${min}`
        },

        max: {
            validate: (value, max) => {
                const num = parseFloat(value);
                return !isNaN(num) && num <= max;
            },
            message: (max) => `Value must be no more than ${max}`
        },

        minLength: {
            validate: (value, length) => {
                if (!value) return true;
                return value.length >= length;
            },
            message: (length) => `Must be at least ${length} characters`
        },

        maxLength: {
            validate: (value, length) => {
                if (!value) return true;
                return value.length <= length;
            },
            message: (length) => `Must be no more than ${length} characters`
        },

        pattern: {
            validate: (value, pattern) => {
                if (!value) return true;
                const regex = new RegExp(pattern);
                return regex.test(value);
            },
            message: 'Invalid format'
        },

        match: {
            validate: (value, matchValue) => {
                return value === matchValue;
            },
            message: 'Values do not match'
        },

        numeric: {
            validate: (value) => {
                if (!value) return true;
                return !isNaN(parseFloat(value)) && isFinite(value);
            },
            message: 'Please enter a valid number'
        },

        integer: {
            validate: (value) => {
                if (!value) return true;
                return Number.isInteger(parseFloat(value));
            },
            message: 'Please enter a whole number'
        },

        date: {
            validate: (value) => {
                if (!value) return true;
                const date = new Date(value);
                return !isNaN(date.getTime());
            },
            message: 'Please enter a valid date'
        },

        futureDate: {
            validate: (value) => {
                if (!value) return true;
                const date = new Date(value);
                const now = new Date();
                return date > now;
            },
            message: 'Date must be in the future'
        },

        pastDate: {
            validate: (value) => {
                if (!value) return true;
                const date = new Date(value);
                const now = new Date();
                return date < now;
            },
            message: 'Date must be in the past'
        }
    };

    /**
     * Validate a single field
     */
    function validateField($field) {
        const value = $field.val();
        const fieldRules = getFieldRules($field);
        const errors = [];

        for (const [ruleName, ruleValue] of Object.entries(fieldRules)) {
            const rule = rules[ruleName];

            if (!rule) continue;

            let isValid;
            if (typeof ruleValue === 'boolean') {
                isValid = rule.validate(value);
            } else {
                isValid = rule.validate(value, ruleValue);
            }

            if (!isValid) {
                const message = typeof rule.message === 'function'
                    ? rule.message(ruleValue)
                    : rule.message;
                errors.push(message);
            }
        }

        return errors;
    }

    /**
     * Get validation rules from field attributes
     */
    function getFieldRules($field) {
        const fieldRules = {};

        // Required
        if ($field.prop('required') || $field.data('required')) {
            fieldRules.required = true;
        }

        // Type-based validation
        const type = $field.attr('type');
        if (type === 'email') fieldRules.email = true;
        if (type === 'tel') fieldRules.phone = true;
        if (type === 'url') fieldRules.url = true;
        if (type === 'number') fieldRules.numeric = true;
        if (type === 'date') fieldRules.date = true;

        // Min/Max
        const min = $field.attr('min');
        if (min !== undefined) fieldRules.min = parseFloat(min);

        const max = $field.attr('max');
        if (max !== undefined) fieldRules.max = parseFloat(max);

        // Length
        const minLength = $field.attr('minlength') || $field.data('minlength');
        if (minLength) fieldRules.minLength = parseInt(minLength);

        const maxLength = $field.attr('maxlength') || $field.data('maxlength');
        if (maxLength) fieldRules.maxLength = parseInt(maxLength);

        // Pattern
        const pattern = $field.attr('pattern') || $field.data('pattern');
        if (pattern) fieldRules.pattern = pattern;

        // Custom validation rules
        const customRules = $field.data('validate');
        if (customRules) {
            const rulesList = customRules.split('|');
            rulesList.forEach(ruleStr => {
                const [ruleName, ruleValue] = ruleStr.split(':');
                fieldRules[ruleName] = ruleValue || true;
            });
        }

        // Match field
        const matchField = $field.data('match');
        if (matchField) {
            const $matchField = $(`[name="${matchField}"]`);
            if ($matchField.length) {
                fieldRules.match = $matchField.val();
            }
        }

        return fieldRules;
    }

    /**
     * Show field error
     */
    function showFieldError($field, errors) {
        removeFieldError($field);

        // Add error class
        $field.addClass('is-invalid');

        // Create error message element
        const $error = $('<div>')
            .addClass('invalid-feedback')
            .css({
                display: 'block',
                color: '#fc5a5a',
                fontSize: '13px',
                marginTop: '5px'
            })
            .html(`<i class="fas fa-exclamation-circle mr-1"></i>${errors[0]}`);

        // Insert after field or form-group
        const $formGroup = $field.closest('.form-group');
        if ($formGroup.length) {
            $formGroup.append($error);
        } else {
            $field.after($error);
        }

        // Add shake animation
        $field.addClass('shake-animation');
        setTimeout(() => $field.removeClass('shake-animation'), 500);
    }

    /**
     * Remove field error
     */
    function removeFieldError($field) {
        $field.removeClass('is-invalid');
        $field.closest('.form-group').find('.invalid-feedback').remove();
        $field.next('.invalid-feedback').remove();
    }

    /**
     * Show field success
     */
    function showFieldSuccess($field) {
        removeFieldError($field);
        $field.addClass('is-valid');
    }

    /**
     * Remove field success
     */
    function removeFieldSuccess($field) {
        $field.removeClass('is-valid');
    }

    /**
     * Validate entire form
     */
    function validateForm($form) {
        let isValid = true;
        const errors = {};

        $form.find('input, textarea, select').each(function() {
            const $field = $(this);

            // Skip disabled fields
            if ($field.is(':disabled')) return;

            const fieldErrors = validateField($field);

            if (fieldErrors.length > 0) {
                isValid = false;
                errors[$field.attr('name')] = fieldErrors;
                showFieldError($field, fieldErrors);
            } else {
                showFieldSuccess($field);
            }
        });

        return { isValid, errors };
    }

    /**
     * Initialize form validation
     */
    function initForm($form) {
        // Validate on blur
        $form.on('blur', 'input, textarea, select', function() {
            const $field = $(this);
            const errors = validateField($field);

            if (errors.length > 0) {
                showFieldError($field, errors);
            } else {
                if ($field.val()) {
                    showFieldSuccess($field);
                } else {
                    removeFieldError($field);
                    removeFieldSuccess($field);
                }
            }
        });

        // Clear error on focus
        $form.on('focus', 'input, textarea, select', function() {
            const $field = $(this);
            removeFieldError($field);
        });

        // Validate on submit
        $form.on('submit', function(e) {
            const result = validateForm($form);

            if (!result.isValid) {
                e.preventDefault();
                e.stopPropagation();

                // Scroll to first error
                const $firstError = $form.find('.is-invalid').first();
                if ($firstError.length) {
                    $('html, body').animate({
                        scrollTop: $firstError.offset().top - 100
                    }, 300);
                }

                Utils.showToast('Please fix the errors in the form', 'error');
            }
        });

        // Real-time validation for password match
        $form.on('input', '[data-match]', function() {
            const $field = $(this);
            const matchField = $field.data('match');
            const $matchField = $(`[name="${matchField}"]`);

            if ($matchField.length && $matchField.val()) {
                const errors = validateField($field);
                if (errors.length > 0) {
                    showFieldError($field, errors);
                } else {
                    showFieldSuccess($field);
                }
            }
        });
    }

    /**
     * Add custom validation rule
     */
    function addRule(name, validateFn, message) {
        rules[name] = {
            validate: validateFn,
            message: message
        };
    }

    /**
     * Auto-initialize all forms with validation
     */
    function autoInit() {
        $('form[data-validate="true"]').each(function() {
            initForm($(this));
        });
    }

    // Public API
    return {
        validateField: validateField,
        validateForm: validateForm,
        initForm: initForm,
        showFieldError: showFieldError,
        removeFieldError: removeFieldError,
        showFieldSuccess: showFieldSuccess,
        addRule: addRule,
        autoInit: autoInit,
        rules: rules
    };
})();

// Make available globally
window.Validation = Validation;

// Auto-initialize on page load
$(document).ready(function() {
    Validation.autoInit();

    // Add CSS for validation animations
    if (!$('#validation-styles').length) {
        $('<style>')
            .attr('id', 'validation-styles')
            .text(`
                .is-invalid {
                    border-color: #fc5a5a !important;
                    box-shadow: 0 0 0 3px rgba(252, 90, 90, 0.1) !important;
                }

                .is-valid {
                    border-color: #3dd598 !important;
                    box-shadow: 0 0 0 3px rgba(61, 213, 152, 0.1) !important;
                }

                .shake-animation {
                    animation: shake 0.5s;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }

                .invalid-feedback {
                    animation: fadeInDown 0.3s;
                }

                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `)
            .appendTo('head');
    }
});
