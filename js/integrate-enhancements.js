/**
 * ELEV8TION Integration Script
 * Automatically integrates enhancements into all pages
 */

(function() {
    'use strict';

    /**
     * Add enhanced navbar to page
     */
    function addEnhancedNavbar() {
        // Check if navbar container exists
        if ($('#navbar-container').length === 0) {
            // Create navbar container at top of body
            $('body').prepend('<div id="navbar-container"></div>');
        }

        // Load navbar
        $('#navbar-container').load(getRelativePath() + 'components/enhanced-navbar.html');
    }

    /**
     * Add quick filters to list pages
     */
    function addQuickFilters(context) {
        // Check if filters container exists
        if ($('#quick-filters-container').length > 0) {
            $('#quick-filters-container').load(getRelativePath() + 'components/quick-filters.html', function() {
                QuickFilters.init(context);
            });
        }
    }

    /**
     * Get relative path based on current location
     */
    function getRelativePath() {
        const path = window.location.pathname;

        if (path.includes('/crm/') || path.includes('/projects/') ||
            path.includes('/finance/') || path.includes('/documents/') ||
            path.includes('/settings/')) {
            return '../';
        }

        return '';
    }

    /**
     * Auto-detect page type and add appropriate enhancements
     */
    function autoIntegrate() {
        const path = window.location.pathname;

        // Add navbar to all pages except login
        if (!path.includes('index-local.html') && !path.includes('signup.html')) {
            addEnhancedNavbar();
        }

        // Add quick filters based on page
        if (path.includes('contacts.html')) {
            addQuickFilters('contacts');
        } else if (path.includes('projects/list.html')) {
            addQuickFilters('projects');
        } else if (path.includes('tasks.html')) {
            addQuickFilters('tasks');
        } else if (path.includes('invoices.html')) {
            addQuickFilters('invoices');
        }

        // Add validation to all forms
        setTimeout(() => {
            Validation.autoInit();
        }, 500);
    }

    // Run on page load
    $(document).ready(function() {
        autoIntegrate();
    });

})();
