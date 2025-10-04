/**
 * ELEV8TION Form Components
 * Reusable form builders with validation and cosmic styling
 */

const Forms = (function() {
    'use strict';

    /**
     * Initialize form system
     */
    function init() {
        addFormStyles();
        enhanceExistingForms();
    }

    /**
     * Add cosmic form styles
     */
    function addFormStyles() {
        if ($('#cosmic-form-styles').length) return;

        const styles = `
            <style id="cosmic-form-styles">
                /* Cosmic Form Container */
                .cosmic-form-container {
                    background: rgba(26, 27, 38, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 30px;
                }

                /* Form Layout */
                .form-row-2 {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                }

                .form-row-3 {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }

                /* Form Group */
                .form-group {
                    margin-bottom: 25px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    color: rgba(255, 255, 255, 0.9);
                    font-weight: 500;
                    font-size: 14px;
                }

                .form-group label .required {
                    color: #fc5a5a;
                    margin-left: 3px;
                }

                .form-group .help-text {
                    display: block;
                    margin-top: 5px;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 12px;
                }

                /* Enhanced Form Controls */
                .form-control,
                .form-select {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 10px;
                    color: white;
                    padding: 12px 16px;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    width: 100%;
                }

                .form-control:focus,
                .form-select:focus {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(102, 126, 234, 0.5);
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
                }

                .form-control::placeholder {
                    color: rgba(255, 255, 255, 0.4);
                }

                .form-control:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                /* Validation States */
                .form-control.is-valid {
                    border-color: rgba(61, 213, 152, 0.5);
                }

                .form-control.is-valid:focus {
                    box-shadow: 0 0 0 3px rgba(61, 213, 152, 0.15);
                }

                .form-control.is-invalid {
                    border-color: rgba(252, 90, 90, 0.5);
                }

                .form-control.is-invalid:focus {
                    box-shadow: 0 0 0 3px rgba(252, 90, 90, 0.15);
                }

                .invalid-feedback {
                    display: none;
                    margin-top: 5px;
                    color: #fc5a5a;
                    font-size: 12px;
                }

                .form-control.is-invalid ~ .invalid-feedback {
                    display: block;
                }

                .valid-feedback {
                    display: none;
                    margin-top: 5px;
                    color: #3dd598;
                    font-size: 12px;
                }

                .form-control.is-valid ~ .valid-feedback {
                    display: block;
                }

                /* Custom Checkbox */
                .custom-checkbox {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    user-select: none;
                }

                .custom-checkbox input[type="checkbox"] {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s ease;
                }

                .custom-checkbox input[type="checkbox"]:checked {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-color: #667eea;
                }

                .custom-checkbox input[type="checkbox"]:checked::after {
                    content: '\f00c';
                    font-family: 'Font Awesome 5 Free';
                    font-weight: 900;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-size: 12px;
                }

                .custom-checkbox label {
                    margin: 0;
                    color: rgba(255, 255, 255, 0.9);
                    cursor: pointer;
                }

                /* Custom Radio */
                .custom-radio {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    user-select: none;
                }

                .custom-radio input[type="radio"] {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s ease;
                }

                .custom-radio input[type="radio"]:checked {
                    border-color: #667eea;
                }

                .custom-radio input[type="radio"]:checked::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 10px;
                    height: 10px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 50%;
                }

                .custom-radio label {
                    margin: 0;
                    color: rgba(255, 255, 255, 0.9);
                    cursor: pointer;
                }

                /* File Upload */
                .file-upload {
                    position: relative;
                }

                .file-upload input[type="file"] {
                    position: absolute;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }

                .file-upload-label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 40px 20px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 2px dashed rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .file-upload-label:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(102, 126, 234, 0.5);
                    color: white;
                }

                .file-upload-label i {
                    font-size: 32px;
                    color: #667eea;
                }

                .file-preview {
                    margin-top: 15px;
                    padding: 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .file-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .file-info i {
                    color: #667eea;
                    font-size: 20px;
                }

                .file-remove {
                    background: rgba(252, 90, 90, 0.2);
                    border: none;
                    color: #fc5a5a;
                    padding: 6px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .file-remove:hover {
                    background: rgba(252, 90, 90, 0.3);
                }

                /* Tag Input */
                .tag-input-container {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 10px;
                    padding: 8px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    cursor: text;
                }

                .tag-input-container:focus-within {
                    border-color: rgba(102, 126, 234, 0.5);
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
                }

                .tag {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 4px 10px;
                    border-radius: 12px;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .tag-remove {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0;
                    font-size: 12px;
                    opacity: 0.8;
                }

                .tag-remove:hover {
                    opacity: 1;
                }

                .tag-input {
                    background: none;
                    border: none;
                    color: white;
                    outline: none;
                    flex: 1;
                    min-width: 100px;
                    padding: 4px;
                }

                /* Form Actions */
                .form-actions {
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                    margin-top: 30px;
                    padding-top: 25px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .form-row-2,
                    .form-row-3 {
                        grid-template-columns: 1fr;
                    }

                    .form-actions {
                        flex-direction: column;
                    }

                    .form-actions button {
                        width: 100%;
                    }
                }
            </style>
        `;

        $('head').append(styles);
    }

    /**
     * Enhance existing forms with cosmic features
     */
    function enhanceExistingForms() {
        // Add floating labels
        $('.form-control').each(function() {
            const $input = $(this);
            const $label = $('label[for="' + $input.attr('id') + '"]');

            if ($label.length) {
                $input.on('focus blur', function() {
                    $label.toggleClass('focused', $(this).is(':focus') || $(this).val());
                });
            }
        });

        // Real-time validation
        $('.form-control[required]').on('blur', function() {
            validateField($(this));
        });
    }

    /**
     * Build form from config
     */
    function build(containerId, config) {
        const defaults = {
            title: null,
            fields: [],
            submitText: 'Submit',
            cancelText: 'Cancel',
            onSubmit: null,
            onCancel: null,
            submitClass: 'btn-primary',
            cancelClass: 'btn-secondary'
        };

        const options = { ...defaults, ...config };
        const formId = 'form-' + Utils.generateShortId();

        let html = '<div class="cosmic-form-container">';

        if (options.title) {
            html += `<h3 style="margin-bottom: 25px; color: white;">${options.title}</h3>`;
        }

        html += `<form id="${formId}" class="cosmic-form">`;

        options.fields.forEach(field => {
            html += renderField(field);
        });

        html += '<div class="form-actions">';
        if (options.onCancel) {
            html += `<button type="button" class="btn ${options.cancelClass} form-cancel">${options.cancelText}</button>`;
        }
        html += `<button type="submit" class="btn ${options.submitClass}">${options.submitText}</button>`;
        html += '</div>';

        html += '</form></div>';

        $(`#${containerId}`).html(html);

        // Bind events
        $(`#${formId}`).on('submit', function(e) {
            e.preventDefault();

            if (validateForm(formId, options.fields)) {
                const data = getFormData(formId);
                if (options.onSubmit) {
                    options.onSubmit(data);
                }
            }
        });

        $(`#${formId} .form-cancel`).on('click', function() {
            if (options.onCancel) {
                options.onCancel();
            }
        });

        // Initialize tag inputs
        initializeTagInputs(formId);

        // Initialize file uploads
        initializeFileUploads(formId);

        return formId;
    }

    /**
     * Render form field
     */
    function renderField(field) {
        const id = 'field-' + Utils.generateShortId();
        let html = `<div class="form-group ${field.fullWidth ? '' : field.col || ''}">`;

        // Label
        if (field.label) {
            html += `<label for="${id}">
                ${field.label}
                ${field.required ? '<span class="required">*</span>' : ''}
            </label>`;
        }

        // Field based on type
        switch (field.type) {
            case 'textarea':
                html += `<textarea id="${id}" name="${field.name}" class="form-control"
                    rows="${field.rows || 4}" placeholder="${field.placeholder || ''}"
                    ${field.required ? 'required' : ''} ${field.disabled ? 'disabled' : ''}>${field.value || ''}</textarea>`;
                break;

            case 'select':
                html += `<select id="${id}" name="${field.name}" class="form-control"
                    ${field.required ? 'required' : ''} ${field.disabled ? 'disabled' : ''}>`;
                html += `<option value="">Select ${field.label || 'option'}</option>`;
                (field.options || []).forEach(opt => {
                    const value = typeof opt === 'object' ? opt.value : opt;
                    const label = typeof opt === 'object' ? opt.label : opt;
                    const selected = value === field.value ? 'selected' : '';
                    html += `<option value="${value}" ${selected}>${label}</option>`;
                });
                html += '</select>';
                break;

            case 'checkbox':
                html += `<div class="custom-checkbox">
                    <input type="checkbox" id="${id}" name="${field.name}" value="true"
                        ${field.value ? 'checked' : ''} ${field.disabled ? 'disabled' : ''}>
                    <label for="${id}">${field.checkboxLabel || field.label}</label>
                </div>`;
                break;

            case 'radio':
                (field.options || []).forEach((opt, i) => {
                    const optId = `${id}-${i}`;
                    const value = typeof opt === 'object' ? opt.value : opt;
                    const label = typeof opt === 'object' ? opt.label : opt;
                    html += `<div class="custom-radio">
                        <input type="radio" id="${optId}" name="${field.name}" value="${value}"
                            ${value === field.value ? 'checked' : ''} ${field.disabled ? 'disabled' : ''}>
                        <label for="${optId}">${label}</label>
                    </div>`;
                });
                break;

            case 'file':
                html += `<div class="file-upload" data-field="${field.name}">
                    <input type="file" id="${id}" name="${field.name}"
                        ${field.accept ? 'accept="' + field.accept + '"' : ''}
                        ${field.multiple ? 'multiple' : ''}>
                    <div class="file-upload-label">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <span>Click to upload or drag and drop</span>
                    </div>
                </div>`;
                break;

            case 'tags':
                html += `<div class="tag-input-container" data-field="${field.name}">
                    <input type="text" class="tag-input" placeholder="Type and press Enter...">
                    <input type="hidden" name="${field.name}" value="${JSON.stringify(field.value || [])}">
                </div>`;
                break;

            case 'date':
                html += `<input type="date" id="${id}" name="${field.name}" class="form-control"
                    value="${field.value || ''}" ${field.required ? 'required' : ''} ${field.disabled ? 'disabled' : ''}>`;
                break;

            case 'number':
                html += `<input type="number" id="${id}" name="${field.name}" class="form-control"
                    value="${field.value || ''}" placeholder="${field.placeholder || ''}"
                    ${field.min !== undefined ? 'min="' + field.min + '"' : ''}
                    ${field.max !== undefined ? 'max="' + field.max + '"' : ''}
                    ${field.step !== undefined ? 'step="' + field.step + '"' : ''}
                    ${field.required ? 'required' : ''} ${field.disabled ? 'disabled' : ''}>`;
                break;

            default:
                html += `<input type="${field.type || 'text'}" id="${id}" name="${field.name}"
                    class="form-control" value="${field.value || ''}"
                    placeholder="${field.placeholder || ''}"
                    ${field.required ? 'required' : ''} ${field.disabled ? 'disabled' : ''}>`;
        }

        // Help text
        if (field.help) {
            html += `<small class="help-text">${field.help}</small>`;
        }

        html += '</div>';
        return html;
    }

    /**
     * Initialize tag inputs
     */
    function initializeTagInputs(formId) {
        $(`#${formId} .tag-input-container`).each(function() {
            const $container = $(this);
            const $input = $container.find('.tag-input');
            const $hidden = $container.find('input[type="hidden"]');
            const tags = JSON.parse($hidden.val() || '[]');

            // Render existing tags
            tags.forEach(tag => addTag($container, tag));

            // Add tag on Enter
            $input.on('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = $(this).val().trim();
                    if (value) {
                        addTag($container, value);
                        $(this).val('');
                        updateTagsHidden($container);
                    }
                }
            });

            // Click container to focus input
            $container.on('click', function() {
                $input.focus();
            });
        });
    }

    function addTag($container, value) {
        const $tag = $(`
            <div class="tag">
                <span>${value}</span>
                <button type="button" class="tag-remove"><i class="fas fa-times"></i></button>
            </div>
        `);

        $tag.find('.tag-remove').on('click', function() {
            $tag.remove();
            updateTagsHidden($container);
        });

        $container.find('.tag-input').before($tag);
    }

    function updateTagsHidden($container) {
        const tags = [];
        $container.find('.tag span').each(function() {
            tags.push($(this).text());
        });
        $container.find('input[type="hidden"]').val(JSON.stringify(tags));
    }

    /**
     * Initialize file uploads
     */
    function initializeFileUploads(formId) {
        $(`#${formId} .file-upload input[type="file"]`).on('change', function() {
            const $container = $(this).closest('.file-upload');
            const files = this.files;

            if (files.length > 0) {
                $container.find('.file-upload-label').hide();

                Array.from(files).forEach(file => {
                    const $preview = $(`
                        <div class="file-preview">
                            <div class="file-info">
                                <i class="fas fa-file"></i>
                                <div>
                                    <div style="color: white; font-weight: 500;">${file.name}</div>
                                    <div style="color: rgba(255,255,255,0.5); font-size: 12px;">${Utils.formatFileSize(file.size)}</div>
                                </div>
                            </div>
                            <button type="button" class="file-remove"><i class="fas fa-times"></i></button>
                        </div>
                    `);

                    $preview.find('.file-remove').on('click', function() {
                        $preview.remove();
                        $container.find('input[type="file"]').val('');
                        $container.find('.file-upload-label').show();
                    });

                    $container.append($preview);
                });
            }
        });
    }

    /**
     * Get form data
     */
    function getFormData(formId) {
        const data = {};
        $(`#${formId}`).find('input, select, textarea').each(function() {
            const $field = $(this);
            const name = $field.attr('name');

            if (!name || $field.attr('type') === 'file') return;

            if ($field.attr('type') === 'checkbox') {
                data[name] = $field.is(':checked');
            } else if ($field.attr('type') === 'radio') {
                if ($field.is(':checked')) {
                    data[name] = $field.val();
                }
            } else if ($field.attr('type') === 'hidden' && $field.closest('.tag-input-container').length) {
                data[name] = JSON.parse($field.val() || '[]');
            } else {
                data[name] = $field.val();
            }
        });

        return data;
    }

    /**
     * Validate form
     */
    function validateForm(formId, fields) {
        let isValid = true;

        fields.forEach(field => {
            const $field = $(`#${formId} [name="${field.name}"]`);
            if ($field.length && !validateField($field, field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Validate single field
     */
    function validateField($field, config = {}) {
        $field.removeClass('is-invalid is-valid');
        $field.siblings('.invalid-feedback').remove();

        const value = $field.val();
        const required = config.required || $field.attr('required');

        // Required check
        if (required && (!value || value.trim() === '')) {
            showError($field, `${config.label || 'This field'} is required`);
            return false;
        }

        // Email validation
        if ($field.attr('type') === 'email' && value && !Utils.validateEmail(value)) {
            showError($field, 'Please enter a valid email address');
            return false;
        }

        // Number range validation
        if ($field.attr('type') === 'number' && value) {
            const min = parseFloat($field.attr('min'));
            const max = parseFloat($field.attr('max'));
            const num = parseFloat(value);

            if (!isNaN(min) && num < min) {
                showError($field, `Value must be at least ${min}`);
                return false;
            }

            if (!isNaN(max) && num > max) {
                showError($field, `Value must be at most ${max}`);
                return false;
            }
        }

        // Show valid state
        if (value && value.trim() !== '') {
            $field.addClass('is-valid');
        }

        return true;
    }

    function showError($field, message) {
        $field.addClass('is-invalid');
        $field.after(`<div class="invalid-feedback">${message}</div>`);
    }

    // Public API
    return {
        init: init,
        build: build,
        getFormData: getFormData,
        validateField: validateField,
        validateForm: validateForm
    };
})();

// Make available globally
window.Forms = Forms;

// Auto-initialize
$(document).ready(function() {
    Forms.init();
});
