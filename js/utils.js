/**
 * ELEV8TION Utilities - Helper Functions
 * Reusable utility functions for the entire application
 */

const Utils = (function() {
    'use strict';

    // ============================================
    // ID GENERATION
    // ============================================

    /**
     * Generate UUID v4
     */
    function generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Generate short ID (8 characters)
     */
    function generateShortId() {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }

    // ============================================
    // DATE HANDLING
    // ============================================

    /**
     * Format date to user's preferred format
     */
    function formatDate(date, format = 'MM/DD/YYYY') {
        if (!date) return '';

        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        const replacements = {
            'DD': day,
            'MM': month,
            'YYYY': year,
            'YY': String(year).slice(-2)
        };

        return format.replace(/DD|MM|YYYY|YY/g, match => replacements[match]);
    }

    /**
     * Format date with time
     */
    function formatDateTime(date, format = 'MM/DD/YYYY HH:mm') {
        if (!date) return '';

        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');

        let result = formatDate(date, format);
        result = result.replace('HH', hours);
        result = result.replace('mm', minutes);
        result = result.replace('ss', seconds);

        return result;
    }

    /**
     * Format as relative time (e.g., "2 hours ago")
     */
    function formatRelativeTime(date) {
        if (!date) return '';

        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        const now = new Date();
        const diffMs = now - d;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 60) return 'just now';
        if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
        if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
        if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;

        return formatDate(date);
    }

    /**
     * Parse date string to Date object
     */
    function parseDate(dateString) {
        if (!dateString) return null;
        const d = new Date(dateString);
        return isNaN(d.getTime()) ? null : d;
    }

    /**
     * Check if date is today
     */
    function isToday(date) {
        const d = new Date(date);
        const today = new Date();
        return d.toDateString() === today.toDateString();
    }

    /**
     * Check if date is in the past
     */
    function isPast(date) {
        const d = new Date(date);
        const now = new Date();
        return d < now;
    }

    // ============================================
    // MONEY / CURRENCY FORMATTING
    // ============================================

    /**
     * Format amount as currency
     */
    function formatCurrency(amount, currency = 'USD') {
        if (amount === null || amount === undefined) return '';

        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);

        return formatted;
    }

    /**
     * Format number with commas
     */
    function formatNumber(num, decimals = 0) {
        if (num === null || num === undefined) return '';

        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    }

    /**
     * Calculate tax amount
     */
    function calculateTax(amount, taxRate) {
        return Math.round(amount * (taxRate / 100) * 100) / 100;
    }

    /**
     * Calculate discount
     */
    function calculateDiscount(amount, discountPercent) {
        return Math.round(amount * (discountPercent / 100) * 100) / 100;
    }

    /**
     * Parse currency string to number
     */
    function parseCurrency(currencyString) {
        if (!currencyString) return 0;
        return parseFloat(String(currencyString).replace(/[^0-9.-]+/g, '')) || 0;
    }

    // ============================================
    // VALIDATION
    // ============================================

    /**
     * Validate email address
     */
    function validateEmail(email) {
        if (!email) return false;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Validate required field
     */
    function validateRequired(value) {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        if (Array.isArray(value)) return value.length > 0;
        return true;
    }

    /**
     * Validate phone number (basic)
     */
    function validatePhone(phone) {
        if (!phone) return false;
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10;
    }

    /**
     * Validate URL
     */
    function validateUrl(url) {
        if (!url) return false;
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Validate number range
     */
    function validateRange(value, min, max) {
        const num = parseFloat(value);
        if (isNaN(num)) return false;
        return num >= min && num <= max;
    }

    // ============================================
    // STRING UTILITIES
    // ============================================

    /**
     * Truncate string with ellipsis
     */
    function truncate(str, maxLength = 50) {
        if (!str) return '';
        if (str.length <= maxLength) return str;
        return str.substring(0, maxLength - 3) + '...';
    }

    /**
     * Capitalize first letter
     */
    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Convert to title case
     */
    function titleCase(str) {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(capitalize).join(' ');
    }

    /**
     * Create slug from string
     */
    function slugify(str) {
        if (!str) return '';
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    /**
     * Strip HTML tags
     */
    function stripHtml(html) {
        if (!html) return '';
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    // ============================================
    // ARRAY UTILITIES
    // ============================================

    /**
     * Group array by field
     */
    function groupBy(array, field) {
        return array.reduce((groups, item) => {
            const key = item[field];
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    }

    /**
     * Sort array by field
     */
    function sortBy(array, field, direction = 'asc') {
        return [...array].sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];

            if (direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    }

    /**
     * Remove duplicates from array
     */
    function unique(array) {
        return [...new Set(array)];
    }

    /**
     * Chunk array into smaller arrays
     */
    function chunk(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }

    // ============================================
    // UI HELPERS
    // ============================================

    /**
     * Show modal by ID
     */
    function showModal(id) {
        const $modal = $('#' + id);
        if ($modal.length) {
            $modal.modal('show');
        }
    }

    /**
     * Hide modal by ID
     */
    function hideModal(id) {
        const $modal = $('#' + id);
        if ($modal.length) {
            $modal.modal('hide');
        }
    }

    /**
     * Show toast notification
     */
    function showToast(message, type = 'info', duration = 3000) {
        const colors = {
            success: '#3dd598',
            error: '#fc5a5a',
            warning: '#ffc107',
            info: '#667eea'
        };

        const $toast = $('<div>')
            .addClass('cosmic-toast')
            .html(`<i class="fas fa-${getToastIcon(type)}"></i> ${message}`)
            .css({
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '15px 25px',
                background: `linear-gradient(135deg, ${colors[type]} 0%, ${colors[type]}dd 100%)`,
                color: 'white',
                borderRadius: '10px',
                fontSize: '14px',
                zIndex: '10000',
                opacity: '0',
                transform: 'translateY(-20px)',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 15px ${colors[type]}40`,
                maxWidth: '400px'
            });

        $('body').append($toast);

        setTimeout(() => {
            $toast.css({ opacity: '1', transform: 'translateY(0)' });
        }, 10);

        setTimeout(() => {
            $toast.css({ opacity: '0', transform: 'translateY(-20px)' });
            setTimeout(() => $toast.remove(), 300);
        }, duration);
    }

    function getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    /**
     * Confirm delete with cosmic modal
     */
    function confirmDelete(message = 'Are you sure you want to delete this item?') {
        return new Promise((resolve) => {
            const $overlay = $('<div>')
                .addClass('cosmic-confirm-overlay')
                .css({
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.7)',
                    zIndex: '9999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                });

            const $modal = $('<div>')
                .addClass('modern-card')
                .css({
                    padding: '30px',
                    borderRadius: '15px',
                    maxWidth: '400px',
                    textAlign: 'center',
                    color: 'white'
                })
                .html(`
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #fc5a5a; margin-bottom: 20px;"></i>
                    <h4 style="margin-bottom: 15px;">Confirm Delete</h4>
                    <p style="margin-bottom: 25px; color: rgba(255,255,255,0.8);">${message}</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button class="btn btn-secondary cosmic-cancel">Cancel</button>
                        <button class="btn btn-danger cosmic-confirm">Delete</button>
                    </div>
                `);

            $overlay.append($modal);
            $('body').append($overlay);

            $modal.find('.cosmic-cancel').on('click', () => {
                $overlay.remove();
                resolve(false);
            });

            $modal.find('.cosmic-confirm').on('click', () => {
                $overlay.remove();
                resolve(true);
            });
        });
    }

    /**
     * Show loading spinner
     */
    function showLoader(message = 'Loading...') {
        const $loader = $('<div>')
            .attr('id', 'cosmic-loader')
            .css({
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.7)',
                zIndex: '9999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            })
            .html(`
                <div class="cosmic-spinner">
                    <div class="cosmic-ring"></div>
                    <div class="cosmic-ring"></div>
                    <div class="cosmic-ring"></div>
                    <div class="cosmic-text">${message}</div>
                </div>
            `);

        $('body').append($loader);
    }

    /**
     * Hide loading spinner
     */
    function hideLoader() {
        $('#cosmic-loader').fadeOut(300, function() {
            $(this).remove();
        });
    }

    /**
     * Debounce function (limit rapid calls)
     */
    function debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function (limit call rate)
     */
    function throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // FILE HANDLING
    // ============================================

    /**
     * Convert file to base64
     */
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * Format file size
     */
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * Download JSON as file
     */
    function downloadJson(data, filename = 'export.json') {
        const jsonStr = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ============================================
    // COLOR UTILITIES
    // ============================================

    /**
     * Generate random color
     */
    function randomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    }

    /**
     * Get status color
     */
    function getStatusColor(status) {
        const colors = {
            // Project statuses
            'active': '#3dd598',
            'completed': '#667eea',
            'on_hold': '#ffc107',
            'cancelled': '#fc5a5a',

            // Task statuses
            'todo': '#6c757d',
            'in_progress': '#50b5ff',
            'review': '#ffc107',
            'done': '#3dd598',

            // Invoice statuses
            'draft': '#6c757d',
            'sent': '#50b5ff',
            'paid': '#3dd598',
            'overdue': '#fc5a5a',

            // Lead stages
            'new': '#6c757d',
            'contacted': '#50b5ff',
            'qualified': '#ffc107',
            'proposal': '#764ba2',
            'negotiation': '#667eea'
        };

        return colors[status] || '#6c757d';
    }

    // Public API
    return {
        // ID Generation
        generateId: generateId,
        generateShortId: generateShortId,

        // Date Handling
        formatDate: formatDate,
        formatDateTime: formatDateTime,
        formatRelativeTime: formatRelativeTime,
        parseDate: parseDate,
        isToday: isToday,
        isPast: isPast,

        // Money
        formatCurrency: formatCurrency,
        formatNumber: formatNumber,
        calculateTax: calculateTax,
        calculateDiscount: calculateDiscount,
        parseCurrency: parseCurrency,

        // Validation
        validateEmail: validateEmail,
        validateRequired: validateRequired,
        validatePhone: validatePhone,
        validateUrl: validateUrl,
        validateRange: validateRange,

        // String Utilities
        truncate: truncate,
        capitalize: capitalize,
        titleCase: titleCase,
        slugify: slugify,
        stripHtml: stripHtml,

        // Array Utilities
        groupBy: groupBy,
        sortBy: sortBy,
        unique: unique,
        chunk: chunk,

        // UI Helpers
        showModal: showModal,
        hideModal: hideModal,
        showToast: showToast,
        confirmDelete: confirmDelete,
        showLoader: showLoader,
        hideLoader: hideLoader,
        debounce: debounce,
        throttle: throttle,

        // File Handling
        fileToBase64: fileToBase64,
        formatFileSize: formatFileSize,
        downloadJson: downloadJson,

        // Color Utilities
        randomColor: randomColor,
        getStatusColor: getStatusColor
    };
})();

// Make available globally
window.Utils = Utils;
