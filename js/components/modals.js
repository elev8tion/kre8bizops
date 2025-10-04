/**
 * ELEV8TION Modal Components
 * Reusable modal dialogs with cosmic styling
 */

const Modals = (function() {
    'use strict';

    /**
     * Initialize modal system
     */
    function init() {
        addModalStyles();
        bindGlobalEvents();
    }

    /**
     * Add cosmic modal styles
     */
    function addModalStyles() {
        if ($('#cosmic-modal-styles').length) return;

        const styles = `
            <style id="cosmic-modal-styles">
                /* Cosmic Modal Overlay */
                .cosmic-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .cosmic-modal-overlay.show {
                    opacity: 1;
                }

                /* Modal Container */
                .cosmic-modal {
                    background: linear-gradient(180deg, rgba(26, 27, 38, 0.98) 0%, rgba(15, 14, 23, 0.98) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    max-width: 600px;
                    width: 90%;
                    max-height: 90vh;
                    overflow: hidden;
                    transform: scale(0.9) translateY(-20px);
                    transition: transform 0.3s ease;
                }

                .cosmic-modal-overlay.show .cosmic-modal {
                    transform: scale(1) translateY(0);
                }

                /* Modal Header */
                .cosmic-modal-header {
                    padding: 25px 30px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .cosmic-modal-title {
                    margin: 0;
                    font-size: 24px;
                    font-weight: 700;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .cosmic-modal-title i {
                    color: var(--glow-purple-primary, #667eea);
                }

                .cosmic-modal-close {
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                }

                .cosmic-modal-close:hover {
                    background: rgba(252, 90, 90, 0.2);
                    color: #fc5a5a;
                    transform: rotate(90deg);
                }

                /* Modal Body */
                .cosmic-modal-body {
                    padding: 30px;
                    max-height: calc(90vh - 200px);
                    overflow-y: auto;
                    color: rgba(255, 255, 255, 0.9);
                }

                .cosmic-modal-body::-webkit-scrollbar {
                    width: 6px;
                }

                .cosmic-modal-body::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }

                .cosmic-modal-body::-webkit-scrollbar-thumb {
                    background: rgba(102, 126, 234, 0.5);
                    border-radius: 3px;
                }

                /* Modal Footer */
                .cosmic-modal-footer {
                    padding: 20px 30px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                }

                /* Size Variants */
                .cosmic-modal.modal-sm {
                    max-width: 400px;
                }

                .cosmic-modal.modal-lg {
                    max-width: 900px;
                }

                .cosmic-modal.modal-xl {
                    max-width: 1200px;
                }

                .cosmic-modal.modal-full {
                    max-width: 95vw;
                    max-height: 95vh;
                }

                /* Animation */
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            </style>
        `;

        $('head').append(styles);
    }

    /**
     * Bind global modal events
     */
    function bindGlobalEvents() {
        // Close on overlay click
        $(document).on('click', '.cosmic-modal-overlay', function(e) {
            if ($(e.target).hasClass('cosmic-modal-overlay')) {
                closeTopModal();
            }
        });

        // Close on X button
        $(document).on('click', '.cosmic-modal-close', function() {
            closeTopModal();
        });

        // Close on ESC key
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                closeTopModal();
            }
        });
    }

    /**
     * Show a modal
     */
    function show(options) {
        const defaults = {
            title: 'Modal',
            icon: null,
            body: '',
            footer: null,
            size: 'md', // sm, md, lg, xl, full
            closeButton: true,
            closeOnOverlay: true,
            onShow: null,
            onHide: null
        };

        const config = { ...defaults, ...options };

        // Generate modal ID
        const modalId = 'modal-' + Utils.generateShortId();

        // Build modal HTML
        const modalHtml = `
            <div class="cosmic-modal-overlay" id="${modalId}">
                <div class="cosmic-modal modal-${config.size}">
                    <div class="cosmic-modal-header">
                        <h3 class="cosmic-modal-title">
                            ${config.icon ? `<i class="${config.icon}"></i>` : ''}
                            ${config.title}
                        </h3>
                        ${config.closeButton ? '<button class="cosmic-modal-close"><i class="fas fa-times"></i></button>' : ''}
                    </div>
                    <div class="cosmic-modal-body">
                        ${config.body}
                    </div>
                    ${config.footer ? `
                        <div class="cosmic-modal-footer">
                            ${config.footer}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        // Add to DOM
        $('body').append(modalHtml);

        // Show with animation
        setTimeout(() => {
            $(`#${modalId}`).addClass('show');
            if (config.onShow) config.onShow(modalId);
        }, 10);

        // Store config for later use
        $(`#${modalId}`).data('config', config);

        return modalId;
    }

    /**
     * Hide specific modal
     */
    function hide(modalId) {
        const $modal = $(`#${modalId}`);
        if (!$modal.length) return;

        const config = $modal.data('config');

        $modal.removeClass('show');

        setTimeout(() => {
            $modal.remove();
            if (config?.onHide) config.onHide(modalId);
        }, 300);
    }

    /**
     * Close top-most modal
     */
    function closeTopModal() {
        const $topModal = $('.cosmic-modal-overlay').last();
        if ($topModal.length) {
            hide($topModal.attr('id'));
        }
    }

    /**
     * Confirm dialog
     */
    function confirm(options) {
        return new Promise((resolve) => {
            const defaults = {
                title: 'Confirm',
                icon: 'fas fa-question-circle',
                message: 'Are you sure?',
                confirmText: 'Confirm',
                cancelText: 'Cancel',
                confirmClass: 'btn-primary',
                cancelClass: 'btn-secondary'
            };

            const config = { ...defaults, ...options };

            const modalId = show({
                title: config.title,
                icon: config.icon,
                size: 'sm',
                body: `<p style="font-size: 16px; margin: 0;">${config.message}</p>`,
                footer: `
                    <button class="btn ${config.cancelClass} modal-cancel">${config.cancelText}</button>
                    <button class="btn ${config.confirmClass} modal-confirm">${config.confirmText}</button>
                `
            });

            // Bind buttons
            $(`#${modalId} .modal-cancel`).on('click', function() {
                hide(modalId);
                resolve(false);
            });

            $(`#${modalId} .modal-confirm`).on('click', function() {
                hide(modalId);
                resolve(true);
            });
        });
    }

    /**
     * Alert dialog
     */
    function alert(options) {
        return new Promise((resolve) => {
            const defaults = {
                title: 'Alert',
                icon: 'fas fa-info-circle',
                message: '',
                buttonText: 'OK',
                buttonClass: 'btn-primary'
            };

            const config = { ...defaults, ...options };

            const modalId = show({
                title: config.title,
                icon: config.icon,
                size: 'sm',
                body: `<p style="font-size: 16px; margin: 0;">${config.message}</p>`,
                footer: `
                    <button class="btn ${config.buttonClass} modal-ok">${config.buttonText}</button>
                `
            });

            $(`#${modalId} .modal-ok`).on('click', function() {
                hide(modalId);
                resolve(true);
            });
        });
    }

    /**
     * Form modal
     */
    function form(options) {
        return new Promise((resolve, reject) => {
            const defaults = {
                title: 'Form',
                icon: 'fas fa-edit',
                fields: [],
                submitText: 'Submit',
                cancelText: 'Cancel',
                submitClass: 'btn-primary',
                cancelClass: 'btn-secondary'
            };

            const config = { ...defaults, ...options };

            // Build form HTML
            let formHtml = '<form class="cosmic-form">';

            config.fields.forEach(field => {
                formHtml += renderFormField(field);
            });

            formHtml += '</form>';

            const modalId = show({
                title: config.title,
                icon: config.icon,
                size: config.size || 'md',
                body: formHtml,
                footer: `
                    <button class="btn ${config.cancelClass} modal-cancel">${config.cancelText}</button>
                    <button class="btn ${config.submitClass} modal-submit">${config.submitText}</button>
                `
            });

            // Bind buttons
            $(`#${modalId} .modal-cancel`).on('click', function() {
                hide(modalId);
                reject('cancelled');
            });

            $(`#${modalId} .modal-submit`).on('click', function() {
                const formData = getFormData(modalId);

                // Validate
                if (validateForm(modalId, config.fields)) {
                    hide(modalId);
                    resolve(formData);
                }
            });
        });
    }

    /**
     * Render form field
     */
    function renderFormField(field) {
        const id = 'field-' + Utils.generateShortId();
        let html = '<div class="form-group" style="margin-bottom: 20px;">';

        // Label
        if (field.label) {
            html += `<label for="${id}" style="display: block; margin-bottom: 8px; color: rgba(255,255,255,0.9); font-weight: 500;">
                ${field.label}
                ${field.required ? '<span style="color: #fc5a5a;">*</span>' : ''}
            </label>`;
        }

        // Input field
        switch (field.type) {
            case 'textarea':
                html += `<textarea id="${id}" name="${field.name}" class="form-control" rows="${field.rows || 4}"
                    placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>${field.value || ''}</textarea>`;
                break;

            case 'select':
                html += `<select id="${id}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}>`;
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
                html += `<div class="custom-control custom-checkbox">
                    <input type="checkbox" id="${id}" name="${field.name}" class="custom-control-input"
                        value="true" ${field.value ? 'checked' : ''}>
                    <label class="custom-control-label" for="${id}">${field.checkboxLabel || ''}</label>
                </div>`;
                break;

            default:
                html += `<input type="${field.type || 'text'}" id="${id}" name="${field.name}"
                    class="form-control" value="${field.value || ''}"
                    placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>`;
        }

        // Help text
        if (field.help) {
            html += `<small style="display: block; margin-top: 5px; color: rgba(255,255,255,0.5);">${field.help}</small>`;
        }

        html += '</div>';
        return html;
    }

    /**
     * Get form data from modal
     */
    function getFormData(modalId) {
        const formData = {};
        $(`#${modalId} .cosmic-form`).find('input, select, textarea').each(function() {
            const $field = $(this);
            const name = $field.attr('name');

            if (!name) return;

            if ($field.attr('type') === 'checkbox') {
                formData[name] = $field.is(':checked');
            } else {
                formData[name] = $field.val();
            }
        });

        return formData;
    }

    /**
     * Validate form
     */
    function validateForm(modalId, fields) {
        let isValid = true;

        // Clear previous errors
        $(`#${modalId} .form-control`).removeClass('is-invalid');
        $(`#${modalId} .invalid-feedback`).remove();

        fields.forEach(field => {
            if (field.required) {
                const $input = $(`#${modalId} [name="${field.name}"]`);
                const value = $input.val();

                if (!value || value.trim() === '') {
                    $input.addClass('is-invalid');
                    $input.after(`<div class="invalid-feedback" style="display: block; color: #fc5a5a; font-size: 12px; margin-top: 5px;">
                        ${field.label || 'This field'} is required
                    </div>`);
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    /**
     * Loading modal
     */
    function loading(message = 'Loading...') {
        const modalId = show({
            title: message,
            icon: 'fas fa-spinner fa-spin',
            size: 'sm',
            body: '<div style="text-align: center; padding: 20px;"><div class="cosmic-spinner"><div class="cosmic-ring"></div><div class="cosmic-ring"></div><div class="cosmic-ring"></div></div></div>',
            closeButton: false,
            closeOnOverlay: false
        });

        return modalId;
    }

    // Public API
    return {
        init: init,
        show: show,
        hide: hide,
        confirm: confirm,
        alert: alert,
        form: form,
        loading: loading,
        closeTopModal: closeTopModal
    };
})();

// Make available globally
window.Modals = Modals;

// Auto-initialize
$(document).ready(function() {
    Modals.init();
});
